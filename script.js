document.addEventListener("DOMContentLoaded", () => {
  const years = ["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"];
  const quarters = ["Q1","Q2","Q3","Q4"];
  const states = ["US Average","California","Florida","Texas","New York","Illinois","Colorado"];

  // Populate dropdowns
  years.forEach(y => {
    let opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    document.getElementById("year").appendChild(opt);
  });

  quarters.forEach(q => {
    let opt = document.createElement("option");
    opt.value = q;
    opt.textContent = q;
    document.getElementById("quarter").appendChild(opt);
  });

  states.forEach(s => {
    let opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    document.getElementById("state").appendChild(opt);
  });

  // Set default to most recent
  document.getElementById("year").value = "2025";
  document.getElementById("quarter").value = "Q2";
  document.getElementById("state").value = "US Average";

  fetch("egg_prices_2016_2025.csv")
    .then(response => response.text())
    .then(csv => {
      const rows = csv.trim().split("\n").map(r => r.split(","));
      const headers = rows[0];
      const data = rows.slice(1).map(r => {
        let obj = {};
        headers.forEach((h, i) => {
          obj[h] = i === 0 ? r[i] : parseFloat(r[i]);
        });
        return obj;
      });

      drawChart(data);
      updatePrice(data);

      document.getElementById("getData").addEventListener("click", () => {
        updatePrice(data);
      });
    });

  function updatePrice(data) {
    const year = document.getElementById("year").value;
    const quarter = document.getElementById("quarter").value;
    const state = document.getElementById("state").value;
    const selected = `${year}-${quarter}`;

    const found = data.find(row => row.Quarter === selected);
    const output = document.getElementById("priceOutput");

    if (found) {
      output.innerText = `Egg prices for ${state}, ${selected}: $${found[state].toFixed(2)} per dozen.`;
    } else {
      output.innerText = `No data available for ${state}, ${selected}.`;
    }
  }

  function drawChart(data) {
    const ctx = document.getElementById("priceChart").getContext("2d");
    const quarters = data.map(row => row.Quarter);
    const prices = data.map(row => row["US Average"]);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: quarters,
        datasets: [{
          label: "Egg price $ (per dozen)",
          data: prices,
          fill: false,
          borderColor: "#facc15", // yellow
          tension: 0.3,
          pointBackgroundColor: "#facc15"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            min: 1,
            max: 6,
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
            labels: {
              color: "#444"
            }
          }
        }
      }
    });
  }
});

