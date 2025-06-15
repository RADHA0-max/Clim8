function calculateFootprint() {
    
    const electricity = parseFloat(document.getElementById("electricity").value) || 0;
    const water = parseFloat(document.getElementById("water").value) || 0;
    const waste = parseFloat(document.getElementById("waste").value) || 0;
    const transport = parseFloat(document.getElementById("transport").value) || 0;
    const diet = document.getElementById("diet").value;

    
    const electricityFactor = 0.92; 
    const waterFactor = 0.001; 
    const wasteFactor = 0.5; 
    const transportFactor = 0.21; 
    const dietFactors = {
        vegan: 1.5, 
        vegetarian: 2.0, 
        "non-vegetarian": 3.5, 
    };

    // Calculate individual footprints
    const electricityFootprint = electricity * electricityFactor;
    const waterFootprint = water * waterFactor;
    const wasteFootprint = waste * wasteFactor;
    const transportFootprint = transport * transportFactor;
    const dietFootprint =  dietFactors[diet]?dietFactors[diet] * 30:0;

    // Calculate total footprint
    const totalFootprint =
        electricityFootprint +
        waterFootprint +
        wasteFootprint +
        transportFootprint +
        dietFootprint;

    // World's average carbon footprint (example value in kg CO2 per year)
    const worldAverageFootprint = 4000 / 12; // Monthly average in kg CO2

    // Generate actionable tips
    const tips = {
        Electricity: [
            "Switch to energy-efficient appliances.",
            "Use LED bulbs instead of incandescent ones.",
            "Turn off lights and devices when not in use.",
        ],
        Water: [
            "Fix leaks and dripping faucets.",
            "Install water-saving showerheads.",
            "Use a bucket instead of a hose for washing vehicles.",
        ],
        Waste: [
            "Recycle and compost waste whenever possible.",
            "Avoid single-use plastics.",
            "Buy products with minimal packaging.",
        ],
        Transport: [
            "Carpool or use public transportation.",
            "Switch to a fuel-efficient or electric vehicle.",
            "Walk or bike for short distances.",
        ],
        Diet: {
            vegan: [
                "Continue your vegan diet! It's already the most sustainable option.",
            ],
            vegetarian: [
                "Reduce dairy consumption.",
                "Incorporate more plant-based meals into your diet.",
            ],
            "non-vegetarian": [
                "Reduce meat consumption, especially red meat.",
                "Incorporate more plant-based meals into your diet.",
            ],
        },
    };

    // Determine the main contributor
    const contributors = [
        { name: "Electricity", value: electricityFootprint },
        { name: "Water", value: waterFootprint },
        { name: "Waste", value: wasteFootprint },
        { name: "Transport", value: transportFootprint },
        { name: "Diet", value: dietFootprint },
    ];
    contributors.sort((a, b) => b.value - a.value); // Sort contributors by value
    const mainContributor = contributors[0]; // The largest contributor

    // Get actionable tips for the main contributor
    const actionableTips =
        mainContributor.name === "Diet"
            ? tips.Diet[diet] || ["Adopt sustainable habits."]
            : tips[mainContributor.name] || ["Adopt sustainable habits."];

    // Display results
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <h2>Your Carbon Footprint</h2>
        <p class="total-footprint">Total Footprint: <strong>${totalFootprint.toFixed(2)} kg CO2</strong></p>
        <p class="world-average">World's Average Footprint (Monthly): <strong>${worldAverageFootprint.toFixed(2)} kg CO2</strong></p>
        <h3>Breakdown:</h3>
        <ul class="breakdown">
            <li>Electricity: ${electricityFootprint.toFixed(2)} kg CO2</li>
            <li>Water: ${waterFootprint.toFixed(2)} kg CO2</li>
            <li>Waste: ${wasteFootprint.toFixed(2)} kg CO2</li>
            <li>Transport: ${transportFootprint.toFixed(2)} kg CO2</li>
            <li>Diet: ${dietFootprint.toFixed(2)} kg CO2</li>
        </ul>
        <h3>Comparison with World Average</h3>
        <p class="comparison">${totalFootprint > worldAverageFootprint
            ? "Your footprint is above the world average. Consider adopting more sustainable practices."
            : "Your footprint is below the world average. Great job! Keep it up."}</p>
        <h3>Actionable Tips to Reduce Your Footprint</h3>
        <ul class="tips">
            ${actionableTips.map((tip) => `<li>${tip}</li>`).join("")}
        </ul>
    `;

    // Create pie chart for breakdown
    const breakdownData = [
        electricityFootprint,
        waterFootprint,
        wasteFootprint,
        transportFootprint,
        dietFootprint,
    ];
    const breakdownLabels = ["Electricity", "Water", "Waste", "Transport", "Diet"];
    createPieChart("breakdownChart", "Carbon Footprint Breakdown", breakdownLabels, breakdownData);

    // Create pie chart for comparison
    const comparisonData = [totalFootprint, worldAverageFootprint];
    const comparisonLabels = ["Your Footprint", "World Average"];
    createPieChart("comparisonChart", "Your Footprint vs World Average", comparisonLabels, comparisonData);
}

// Function to create a pie chart
function createPieChart(canvasId, title, labels, data) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                    hoverOffset: 4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: title,
                },
            },
        },
    });
}