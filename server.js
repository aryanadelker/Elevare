//generate an API Key and use it 

async function analyzeWithAI() {

  goToPage("aiInsights");

  let sleep = Number(document.getElementById("sleepVal").innerText);
  let water = Number(document.getElementById("waterVal").innerText);
  let activity = Number(document.getElementById("activityVal").innerText);
  let stress = Number(document.getElementById("stressVal").innerText);

  // Basic score logic (keep this)
  let score = 100;
  if (sleep < 6) score -= 20;
  if (water < 6) score -= 15;
  if (activity < 30) score -= 15;
  if (stress >= 4) score -= 20;

  // Prompt for AI
  const prompt = `
Analyze this lifestyle data and give short health advice:

Sleep: ${sleep} hours
Water: ${water} glasses
Activity: ${activity} minutes
Stress Level: ${stress} out of 5

Give:
- 3 bullet point suggestions
- Friendly tone
`;

  let aiText = "Analyzing your health data...";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    aiText = data.candidates[0].content.parts[0].text;

  } catch (error) {
    aiText = "AI analysis failed. Please try again later.";
    console.error(error);
  }

  // Final report
  let report = `
Health Score: ${score}/100

Sleep: ${sleep} hrs
Water: ${water} glasses
Activity: ${activity} mins
Stress: ${stress}/5

AI Suggestions:
${aiText}
`;

  document.getElementById("aiOutput").innerText = report;

  // Dashboard update
  document.getElementById("dashScore").innerText = score + "/100";
  document.getElementById("dashSleep").innerText = sleep < 6 ? "Low" : "Good";
  document.getElementById("dashWater").innerText = water < 6 ? "Low" : "Normal";
  document.getElementById("dashStress").innerText = stress >= 4 ? "High" : "Normal";

  // Save history
  reports.unshift(report);
  if (reports.length > 5) reports.pop();
  updateReports();

  setTimeout(() => {
    goToPage("dashboard");
  }, 2000);
}
