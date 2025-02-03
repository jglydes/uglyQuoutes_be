const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate Quote Controller
const generateQuote = async (req, res) => {
  console.log("generate quotes body: ", req.body)
  const { keyword, number, language } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    const prompt = `Generate ${number} humorous quotes about ${keyword} in a naughty, witty, funny and hilarious tone in ${language}. Each quote should be 1 sentence long.`;


    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        {
          role: "system",
          content: "You are a humorous assistant who creates funny quotes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract and return the response
    const quotes = response.choices[0].message.content;

    const parsedQuotes = quotes
      .split("\n") // Split by new lines
      .map((quote) => quote.replace(/^\d+[\).\s"]*/, "").replace(/["]+$/, "").trim()) // Remove numbering, dots, spaces, and leading quotes
      .filter((quote) => quote.length > 0); // Remove empty entries
    

    console.log(parsedQuotes);
    res.json({ success: true, parsedQuotes });
  } catch (error) {
    console.error("Error generating quotes:", error.message);
    res.status(500).json({ error: "Failed to generate quotes. Please try again later." });
  }
};

module.exports = { generateQuote };
