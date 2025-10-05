export default async function handler(req, res) {
  try {
    const { mobile } = req.query;

    // Validate mobile number
    if (!mobile || mobile.length < 10) {
      return res.status(400).json({
        error: "Mobile number must be at least 10 digits",
        provided: mobile || null,
      });
    }

    // Original API URL
    const apiURL = `https://random-remove-batch-tea.trycloudflare.com/search?mobile=${encodeURIComponent(mobile)}`;

    // Fetch from the original API
    const response = await fetch(apiURL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    // Return same response with CORS enabled
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}