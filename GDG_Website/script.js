// ===== CONFIGURATION =====
// Replace this with your deployed Google Apps Script URL
// Get it from: Extensions → Apps Script → Deploy → New deployment → Web app
const CONFIG = {
  GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/macros/d/{YOUR_DEPLOYMENT_ID}/usercontent/exec",
  OWNER_EMAIL: "email ID "
};

const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    college: document.getElementById("college").value,
    year: document.getElementById("year").value,
    branch: document.getElementById("branch").value,
    event: document.getElementById("event").value,
    submittedAt: new Date().toISOString(),
    registrationId: `GDG-${Date.now()}`
  };

  try {
    const res = await fetch(CONFIG.GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.ok) {
      successMessage.innerText = "✅ " + result.message;
      successMessage.style.color = "green";
    } else {
      successMessage.innerText = "❌ " + result.message;
      successMessage.style.color = "red";
    }
    
    form.reset();

  } catch (error) {
    successMessage.innerText = "❌ Server Error: " + error.message;
    successMessage.style.color = "red";
  }

});
