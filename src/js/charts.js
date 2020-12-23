const ctx = document.getElementById('myChart').getContext('2d');
let ylabel = [];
let xlabel = [];
let data;

async function getData(country) {
	const url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`;
  const response = await fetch(url);
	data = await response.json();
  return data;
}

async function sortData(country) {
  await getData(country);
  if (country === 'all') {
		for (let i in data.cases) {
			ylabel.push([data.cases[i]]);
			xlabel.push(i);
		}
	} else {
		for (let i in data.timeline.cases) {
			ylabel.push([data.timeline.cases[i]]);
			xlabel.push(i);
		}
	}
}
async function drawChart(country = 'all') {
  await sortData(country);
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

export { drawChart };
