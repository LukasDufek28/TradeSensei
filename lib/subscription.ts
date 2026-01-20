import { prisma } from './prisma';

export async function getUserSubscription(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    return null;
  }

  const isActive =
    subscription.status === 'active' &&
    subscription.stripeCurrentPeriodEnd &&
    subscription.stripeCurrentPeriodEnd.getTime() > Date.now();

  return {
    ...subscription,
    isActive,
    isPremium: isActive,
  };
}

export async function checkUserAccess(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return subscription?.isActive ?? false;
}
