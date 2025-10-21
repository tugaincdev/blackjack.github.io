// Blackjack OOP ADVANCED

function newAdvancedGame() {
  console.log("✅ newAdvancedGame() called");

  newGame();

  const extrasMenu = document.getElementById("extras-menu");
  extrasMenu.style.display = "block"; // make the whole thing visible

  console.log("✅ extrasMenu display set to block");
}

const sparkleEl = document.getElementById("sparkle");
const extrasToggleBtn = document.getElementById("extras-toggle");
const extrasPanel = document.getElementById("extras-panel");

extrasToggleBtn.addEventListener("click", () => {
  console.log("🎯 extras toggle clicked!");

  sparkleEl.style.display = "none";

  // Hide settings panel if open
  if (settingsPanel) settingsPanel.style.display = "none";

  // Toggle the extras panel visibility
  const visible = extrasPanel.style.display === "block";
  extrasPanel.style.display = visible ? "none" : "block";
});
