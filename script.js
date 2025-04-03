
document.addEventListener("DOMContentLoaded", () => {
  const years = ["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"];
  const quarters = ["Q1","Q2","Q3","Q4"];
  const states = ["US Average","California","Florida","Texas"];

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

  // Graph logic
  window.getData = function () {
    const year = document.getElementById("year").value;
    const quarter = document.getElementById("quarter").value;
    const state = document.getElementById("state").value;
    const ctx = document.getElementById("priceChart").getContext("2d");
    const label = document.getElementById("graph-label");

    label.textContent = `Egg prices for ${state}, ${quarter}-${year}`;

    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    window.chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2016-Q1","2017-Q1","2018-Q1","2019-Q1","2020-Q1","2021-Q1","2022-Q1","2023-Q1","2024-Q1","2025-Q1"],
        datasets: [{
          label: "Egg price $ (per dozen)",
          data: [2.3,1.4,1.9,1.6,2.2,2.6,3.0,4.2,3.3,5.0],
          borderColor: "#ffcc00",
          borderWidth: 2,
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  };

  // Toggle FAQ
  document.querySelectorAll(".accordion-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});
