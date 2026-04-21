const { GoogleGenerativeAI } = require('@google/generative-ai');
const Business = require('../models/Business');

const chatWithBot = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: 'Please provide userId and message' });
    }

    const business = await Business.findOne({ userId });

    if (!business) {
      return res.status(404).json({ message: 'Business configuration not found' });
    }

    const systemPrompt = `
      You are an AI assistant for a business named "${business.businessName}".
      Description of the business: ${business.description}
      Website: ${business.websiteURL || 'Not provided'}
      
      Here are some Frequently Asked Questions and their answers for the business:
      ${business.faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n')}

      Your instructions:
      Answer the user's questions ONLY using the provided business data above. 
      If the user asks something that is unknown or not covered by the information above, say 'I don’t know' or 'I don't have information on that'. Be concise, helpful, and polite.
    `;

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'API Key is missing from server configuration' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: message }] }
      ],
      generationConfig: {
        temperature: 0.2, // Low temperature to stick to facts
        maxOutputTokens: 300,
      }
    });

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  chatWithBot,
};
