document.addEventListener("DOMContentLoaded", () => {
    const scoreboard = document.getElementById("scoreboard");
    const sportFilter = document.getElementById("sport");
    const leagueFilter = document.getElementById("league");
    const countryFilter = document.getElementById("country");

    async function fetchScores() {
        try {
            const response = await fetch("https://api.sportsdata.io/v3/soccer/scores/json/GamesByDate/TODAY", {
                headers: { "Ocp-Apim-Subscription-Key": "YOUR_API_KEY" }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch scores");
            }

            const data = await response.json();
            displayScores(data);
        } catch (error) {
            console.error("Error fetching scores:", error);
            scoreboard.innerHTML = "<p>⚠️ Error loading scores. Please try again later.</p>";
        }
    }

    function displayScores(scores) {
        scoreboard.innerHTML = "";

        if (scores.length === 0) {
            scoreboard.innerHTML = "<p>No matches found.</p>";
            return;
        }

        scores.forEach(game => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h2>${game.League ? game.League : "Unknown League"}</h2>
                <p>${game.HomeTeam.Name} vs ${game.AwayTeam.Name}</p>
                <p><strong>${game.HomeTeamScore} - ${game.AwayTeamScore}</strong></p>
            `;
            scoreboard.appendChild(card);
        });
    }

    function applyFilters() {
        const selectedSport = sportFilter.value;
        const selectedLeague = leagueFilter.value;
        const selectedCountry = countryFilter.value;

        fetchScores();
    }

    sportFilter.addEventListener("change", applyFilters);
    leagueFilter.addEventListener("change", applyFilters);
    countryFilter.addEventListener("change", applyFilters);

    fetchScores();
    setInterval(fetchScores, 60000); // Refresh scores every minute
});
