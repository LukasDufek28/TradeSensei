// Test REST API to list models

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Available models in v1 API:\n');
    
    if (data.models) {
      data.models.forEach(model => {
        console.log('Name:', model.name);
        console.log('Display Name:', model.displayName);
        console.log('Supported Methods:', model.supportedGenerationMethods?.join(', '));
        console.log('---');
      });
    } else {
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listModels();
