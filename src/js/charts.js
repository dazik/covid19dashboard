const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';
const ctx = document.getElementById('myChart').getContext('2d');
let ylabel = [];
let xlabel = [];
let data;

async function getData() {
  const response = await fetch(url);
  data = await response.json();
  return data;
}

async function sortData() {
  await getData();
  for (let i in data.cases) {
    ylabel.push([data.cases[i]]);
    xlabel.push(i);
  }
  console.log(ylabel);
  console.log(xlabel);
}
async function drawChart() {
  await sortData();
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xlabel,
      datasets: [
        {
          label: 'Cases',
          data: ylabel,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month',
              tooltipFormat: 'D MMM YYYY',
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

drawChart();

export { drawChart };
