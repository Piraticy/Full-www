function getRecommendation() {
    let soilType = document.getElementById("soil-type").value.trim();

    if (!soilType) {
        document.getElementById("recommendation-result").innerText = "Please enter a soil type!";
        return;
    }

    fetch(`http://127.0.0.1:5000/recommend?soil=${soilType}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("recommendation-result").innerText = data.recommendation;
        })
        .catch(error => {
            console.error("Error fetching recommendation:", error);
            document.getElementById("recommendation-result").innerText = "Error fetching data.";
        });
}

function fetchWeather() {
    fetch("http://127.0.0.1:5000/weather")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("weather-result").innerText = "Weather: " + data.weather;
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            document.getElementById("weather-result").innerText = "Error fetching weather.";
        });
}
