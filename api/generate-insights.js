export default async function handler(req, res) {
  const { says, thinks, feels, does } = req.body;

  const prompt = `
You are a stakeholder engagement coach. Analyze the stakeholder behavior.

SAYS: ${says}
THINKS: ${thinks}
FEELS: ${feels}
DOES: ${does}

Give me:
- Belief: ...
- Fear: ...
- Motivation: ...
`;

  const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  const data = await geminiRes.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights found.";
  const insights = text.split("\n").filter(line => line.startsWith("-"));
  res.status(200).json({ insights });
}
