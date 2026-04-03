// Vercel Serverless Function (api/chat.js)
// SocioDash™ Pro v2.8.0 - AI Proxy Layer
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, response: 'Method Not Allowed' });
  }

  const { message, model } = req.body;
  // A Vercel injeta esta var de ambiente automaticamente do painel de configurações
  const apiKey = process.env.APIFREELLM_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      success: false, 
      response: 'Erro: API Key não configurada na Vercel (APIFREELLM_KEY).' 
    });
  }

  try {
    // Chamada segura do servidor Vercel para a APIFreeLLM
    const response = await fetch("https://apifreellm.com/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || "llama-3",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('SocioDash IA Proxy Error:', error);
    return res.status(500).json({ 
      success: false, 
      response: 'Falha na conexão interna com os servidores da SocioDash™ IA.' 
    });
  }
}
