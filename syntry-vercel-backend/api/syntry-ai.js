const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configuration (Note: It is recommended to use process.env.GEMINI_API_KEY for security)
const API_KEY = "AIzaSyBFTIAKdvSsgAtzB_qNOxw_G-lZleOfOHM";
const genAI = new GoogleGenerativeAI(API_KEY);

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  const allowedOrigins = ["https://www.syntry.co", "https://syntry.co"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://www.syntry.co"); // Fallback
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are the Syntry AI Assistant, an elite real estate forensic expert for Ghana. 
      Your tone is professional, technical, extremely fast, and trustworthy.
      You help users understand 8-layer verification results, land certificate technicalities, and next steps for mortgage qualification.
      Focus on Ghanaian land laws (Land Act 2020), Stool Land boundaries, and statutory documentation requirements (Indentures, Site Plans, Lands Commission stamps).
      If you cannot answer precisely, recommend contacting a Syntry Verification Expert via WhatsApp at 053 110 2292.`
    });

    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      reply: "Oracle Handshake Error. I encountered a latency spike or security block. Please contact oversight via WhatsApp: 053 110 2292."
    });
  }
};
