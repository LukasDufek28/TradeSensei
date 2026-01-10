// Quick script to test available Gemini models
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function testModels() {
  const modelsToTest = [
    'models/gemini-pro',
    'models/gemini-pro-vision', 
    'models/gemini-1.5-pro',
    'models/gemini-1.5-flash',
    'models/gemini-1.5-pro-latest',
    'models/gemini-1.5-flash-latest',
  ];

  console.log('Testing available Gemini models with full path...\n');
  
  for (const modelName of modelsToTest) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Hello');
      console.log(`✓ ${modelName} - WORKS`);
    } catch (error) {
      console.log(`✗ ${modelName} - ${error.message.split('\n')[0]}`);
    }
  }
}

testModels();
