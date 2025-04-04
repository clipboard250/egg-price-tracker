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

  // Default values
  yearSelect.value = "2025";
  quarterSelect.value = "Q2";
  stateSelect.value = "US Average";

  const csvFile = "egg_prices_2016_2025.csv";

  async function fetchDataAndPlot() {
    const year = yearSelect.value;
    const quarter = quarterSelect.value;
    const state = stateSelect.value;

    const response = await fetch(csvFile);
    const text = await response.text();
    const rows = text.trim().split("\n").slice(1);
    const labels = [];
    const prices = [];

    let selectedPrice = null;

    rows.forEach(row => {
      const [qtr, us, ca, fl, tx] = row.split(",");
      labels.push(qtr);
      let value = null;

      switch (state) {
        case "California": value = parseFloat(ca); break;
        case "Florida": value = parseFloat(fl); break;
        case "Texas": value = parseFloat(tx); break;
        default: value = parseFloat(us); break;
      }

      prices.push(value);

      if (qtr === `${year}-${quarter}`) {
        selectedPrice = value;
      }
    });

    priceOutput.textContent = `Egg prices for ${state}, ${quarter}-${year}: $${selectedPrice?.toFixed(2) || "N/A"} per dozen`;

    drawChart(labels, prices);
  }

  function drawChart(labels, data) {
    if (window.eggChartInstance) {
      window.eggChartInstance.destroy();
    }

    const ctx = chartCanvas.getContext("2d");
    window.eggChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Egg price $ (per dozen)",
          data,
          fill: false,
          borderColor: "#facc15",
          tension: 0.2,
          pointRadius: 4,
          pointBackgroundColor: "#facc15",
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "$ per dozen"
            },
            beginAtZero: false
          },
          x: {
            title: {
              display: true,
              text: "Quarter"
            }
          }
        }
      }
    });
  }

  getDataBtn.addEventListener("click", fetchDataAndPlot);

  // Auto-load on page open
  fetchDataAndPlot();
});

