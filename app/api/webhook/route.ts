import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string;
          const customerId = session.customer as string;
          const userId = session.metadata?.userId;

          if (userId && subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            
            await prisma.subscription.upsert({
              where: { userId },
              create: {
                userId,
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscriptionId,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: isValidStripeDate(subscription.current_period_end) ? new Date(subscription.current_period_end * 1000) : null,
                status: subscription.status,
                plan: subscription.items.data[0].price.recurring?.interval || 'monthly',
              },
              update: {
                stripeSubscriptionId: subscriptionId,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: isValidStripeDate(subscription.current_period_end) ? new Date(subscription.current_period_end * 1000) : null,
                status: subscription.status,
                plan: subscription.items.data[0].price.recurring?.interval || 'monthly',
              },
            });
          }
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            stripeCurrentPeriodEnd: isValidStripeDate(subscription.current_period_end) ? new Date(subscription.current_period_end * 1000) : null,
          },
        });
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as any).subscription as string;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: {
              status: subscription.status,
              stripeCurrentPeriodEnd: isValidStripeDate(subscription.current_period_end) ? new Date(subscription.current_period_end * 1000) : null,
            // Helper to validate Stripe timestamp
            function isValidStripeDate(ts: any) {
              return typeof ts === 'number' && !isNaN(ts) && ts > 0;
            }
            },
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as any).subscription as string;

        if (subscriptionId) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: {
              status: 'past_due',
            },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
