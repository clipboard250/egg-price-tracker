document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year");
  const quarterSelect = document.getElementById("quarter");
  const stateSelect = document.getElementById("state");
  const getDataBtn = document.getElementById("getData");
  const chartCanvas = document.getElementById("eggChart");
  const priceOutput = document.getElementById("price-output");

  if (!yearSelect || !quarterSelect || !stateSelect || !getDataBtn || !chartCanvas || !priceOutput) {
    console.warn("One or more DOM elements not found.");
    return;
  }

  const years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const states = ["US Average", "California", "Florida", "Texas"];

  years.forEach(year => {
    const opt = document.createElement("option");
document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year");
  const quarterSelect = document.getElementById("quarter");
  const stateSelect = document.getElementById("state");
  const getDataBtn = document.getElementById("getData");
  const chartCanvas = document.getElementById("eggChart");
  const priceOutput = document.getElementById("price-output");

  if (!yearSelect || !quarterSelect || !stateSelect || !getDataBtn || !chartCanvas || !priceOutput) {
    console.warn("One or more DOM elements not found.");
    return;
  }

  const years = [
    "2016", "2017", "2018", "2019", "2020",
    "2021", "2022", "2023", "2024", "2025"
  ];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const states = ["US Average", "California", "Florida", "Texas", "New York", "Illinois"];

  years.forEach(year => {
    const opt = document.createElement("option");
    opt.value = year;
    opt.textContent = year;
    yearSelect.appendChild(opt);
  });

  quarters.forEach(q => {
    const opt = document.createElement("option");
    opt.value = q;
    opt.textContent = q;
    quarterSelect.appendChild(opt);
  });

  states.forEach(state => {
    const opt = document.createElement("option");
    opt.value = state;
    opt.textContent = state;
    stateSelect.appendChild(opt);
  });

  let chart;

  function drawChart(data, selectedState) {
    const labels = data.map(row => row.Quarter);
    const prices = data.map(row => parseFloat(row[selectedState]));

    if (chart) chart.destroy();

    chart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Egg price $ (per dozen)",
          data: prices,
          borderColor: "goldenrod",
          backgroundColor: "gold",
          tension: 0.3,
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: "goldenrod"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "$ per dozen"
            }
          },
          x: {
            title: {
              display: true,
              text: "Quarter"
            }
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  getDataBtn.addEventListener("click", () => {
    const year = yearSelect.value;
    const quarter = quarterSelect.value;
    const state = stateSelect.value;

    fetch("egg_prices_2016_2025.csv")
      .then(res => res.text())
      .then(csv => {
        const rows = csv.trim().split("\n");
        const headers = rows[0].split(",");
        const data = rows.slice(1).map(row => {
          const values = row.split(",");
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        });

        const quarterKey = `${year}-${quarter}`;
        const row = data.find(r => r.Quarter === quarterKey);

        if (row && row[state]) {
          priceOutput.textContent = `Egg prices for ${state}, ${quarterKey}: $${parseFloat(row[state]).toFixed(2)} per dozen.`;
        } else {
          priceOutput.textContent = `No data available for ${state}, ${quarterKey}.`;
        }

        drawChart(data, state);
      })
      .catch(err => {
        console.error("Error loading CSV:", err);
        priceOutput.textContent = "Failed to load price data.";
      });
  });

  // ✅ Auto-load with latest (2025 Q2, US Average)
  yearSelect.value = "2025";
  quarterSelect.value = "Q2";
  stateSelect.value = "US Average";
  getDataBtn.click();
});

