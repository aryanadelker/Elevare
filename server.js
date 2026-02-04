function analyzeWithAI() {

  goToPage("aiInsights");

  let sleep = Number(document.getElementById("sleepVal").innerText);
  let water = Number(document.getElementById("waterVal").innerText);
  let activity = Number(document.getElementById("activityVal").innerText);
  let stress = Number(document.getElementById("stressVal").innerText);

  let score = 100;
  let tips = [];

  if (sleep < 6) { score -= 20; tips.push("Improve sleep (7–8 hrs)."); }
  if (water < 6) { score -= 15; tips.push("Drink more water."); }
  if (activity < 30) { score -= 15; tips.push("Increase physical activity."); }
  if (stress >= 4) { score -= 20; tips.push("Reduce stress with meditation."); }

  if (tips.length === 0) tips.push("Excellent lifestyle habits!");

  let report =
`Health Score: ${score}/100

Sleep: ${sleep} hrs
Water: ${water} glasses
Activity: ${activity} mins
Stress: ${stress}/5

Suggestions:
- ${tips.join("\n- ")}`;

  document.getElementById("aiOutput").innerText = report;


  document.getElementById("dashScore").innerText = score + "/100";
  document.getElementById("dashSleep").innerText = sleep < 6 ? "Low" : "Good";
  document.getElementById("dashWater").innerText = water < 6 ? "Low" : "Normal";
  document.getElementById("dashStress").innerText = stress >= 4 ? "High" : "Normal";

  // Save report history
  reports.unshift(report);
  if (reports.length > 5) reports.pop();
  updateReports();

  // Optional: Auto back to dashboard
  setTimeout(() => {
    goToPage("dashboard");
  }, 2000);
}
