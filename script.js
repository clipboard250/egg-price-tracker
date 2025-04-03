document.addEventListener("DOMContentLoaded", () => {
  const years = ["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"];
  const quarters = ["Q1","Q2","Q3","Q4"];
  const states = ["US Average","California","Florida","Colorado","Texas","New York","Illinois"];

  years.forEach(y => {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    document.getElementById("year").appendChild(opt);
  });

  quarters.forEach(q => {
    const opt = document.createElement("option");
    opt.value = q;
    opt.textContent = q;
    document.getElementById("quarter").appendChild(opt);
  });

  states.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    document.getElementById("state").appendChild(opt);
  });

  function getData() {
    const year = document.getElementById("year").value;
    const quarter = document.getElementById("quarter").value;
    const state = document.getElementById("state").value;
    const ctx = document.getElementById("priceChart").getContext("2d");
    const label = document.getElementById("graph-label");

    label.textContent = `Egg prices for ${state}, ${quarter} ${year}`;

    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    const quarters = [
      "2016-Q1", "2016-Q2", "2016-Q3", "2016-Q4",
      "2017-Q1", "2017-Q2", "2017-Q3", "2017-Q4",
      "2018-Q1", "2018-Q2", "2018-Q3", "2018-Q4",
      "2019-Q1", "2019-Q2", "2019-Q3", "2019-Q4",
      "2020-Q1", "2020-Q2", "2020-Q3", "2020-Q4",
      "2021-Q1", "2021-Q2", "2021-Q3", "2021-Q4",
      "2022-Q1", "2022-Q2", "2022-Q3", "2022-Q4",
      "2023-Q1", "2023-Q2", "2023-Q3", "2023-Q4",
      "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4",
      "2025-Q1", "2025-Q2"
    ];

    const usPrices = [
      2.23, 1.66, 1.49, 1.36,
      1.49, 1.39, 1.37, 1.62,
      1.79, 1.9, 1.67, 1.59,
      1.49, 1.34, 1.28, 1.4,
      1.48, 1.74, 1.36, 1.45,
      1.56, 1.56, 1.66, 1.74,
      1.99, 2.53, 2.99, 3.75,
      4.16, 2.72, 2.24, 2.24,
      2.84, 2.76, 3.37, 3.72,
      4.95, 3.00
    ];

    window.chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: quarters,
        datasets: [{
          label: "US Average Price (per dozen)",
          data: usPrices,
          borderColor: "#ffcc00",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              autoSkip: false
            }
          },
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

  // Auto-load 2025 Q2 data
  document.getElementById("year").value = "2025";
  document.getElementById("quarter").value = "Q2";
  document.getElementById("state").value = "US Average";
  getData();
});

