// Jeopardy Game JavaScript - Web Version (fetch-based data loading)
// Requires game-core.js to be loaded first

$(document).ready(() => {
  loadGameData();
  loadTeamDropdown();
});

// Function to load game data via fetch
function loadGameData() {
  fetch("data/game-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Game data loaded successfully:", data);
      game.gameData = data;
      populateGameBoard(data);
    })
    .catch((error) => {
      console.error("Error loading game data:", error);
      console.log(
        "Trying to load from file:// protocol may be blocked by browser security. Try using a local HTTP server.",
      );
      alert(
        "Could not load game data. If opening from file://, try using a local web server instead. Error: " +
          error.message,
      );
    });
}

// Function to load team names and populate dropdown
function loadTeamDropdown() {
  fetch("data/team-names.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Team names loaded successfully:", data);
      game.teamNames = data;
      populateTeamDropdown(data);
    })
    .catch((error) => {
      console.error("Error loading team names:", error);
      console.log("Using fallback team names");
      // Create fallback dropdown
      populateTeamDropdown({
        patrols: [
          "Patrol 1",
          "Patrol 2",
          "Patrol 3",
          "Patrol 4",
          "Patrol 5",
          "Patrol 6",
          "Patrol 7",
          "Patrol 8",
          "Patrol 9",
        ],
      });
    });
}
