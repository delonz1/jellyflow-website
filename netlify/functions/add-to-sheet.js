// This is the Netlify Function that acts as the secure bridge.
exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Get the Google Apps Script URL from your Netlify environment variables
    const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

    if (!GOOGLE_SHEET_URL) {
      throw new Error("Google Sheet URL is not configured.");
    }

    // Send the data to your Google Sheet web app
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to send data to Google Sheet.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Lead captured successfully" })
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to capture lead." })
    };
  }
};
