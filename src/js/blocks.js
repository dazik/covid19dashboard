let populationCoefficient;
const mainTableContainer = document.querySelector('#mainTable');
const countryTableContainer = document.querySelector('#countryTable');
import coordinates from './coordinates'
//Generate main table
function generateMainTable(data) {
  const table = document.createElement('table')
  const tbody = document.createElement('tbody');
  tbody.innerHTML = `<tr><th  scope="row">Total infected:</th><td>${data['TotalConfirmed'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
  <tr><th  scope="row">Total deaths:</th><td>${data['TotalDeaths'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
  <tr><th  scope="row">Total recovered:</th><td>${data['TotalRecovered'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
  <tr><th  scope="row">New infected:</th><td>${data['NewConfirmed'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
  <tr><th  scope="row">New deaths:</th><td>${data['NewDeaths'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
  <tr><th  scope="row">New recovered:</th><td>${data['NewRecovered'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
  <tr><th  scope="row">Total infected per 100 000:</th><td>${parseInt(data['TotalConfirmed']/populationCoefficient)}</td></tr>
  <tr><th  scope="row">Total deaths per 100 000:</th><td>${parseInt(data['TotalDeaths']/populationCoefficient)}</td></tr>
  <tr><th  scope="row">Total recovered per 100 000:</th><td>${parseInt(data['TotalRecovered']/populationCoefficient)}</td></tr>
  <tr><th  scope="row">New infected per 100 000:</th><td>${parseInt(data['NewConfirmed']/populationCoefficient)}</td></tr>
  <tr><th  scope="row">New deaths per 100 000:</th><td>${parseInt(data['NewDeaths']/populationCoefficient)}</td></tr>
  <tr><th  scope="row">New recovered per 100 000:</th><td>${parseInt(data['NewRecovered']/populationCoefficient)}</td></tr>`;
  table.appendChild(tbody);
  mainTableContainer.appendChild(table);
}

//Generate country table
function generateCountryTable(data) {
  const table = document.createElement('table')
  const tbody = document.createElement('tbody');
  const sortedData = sortData(data, 'TotalConfirmed');
  for(let i = 0; i < sortedData.length; i++) {
    tbody.innerHTML += `<tr><th  scope="row">${sortedData[i][0]}</th><td>${sortedData[i][1].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>`
	}
  table.appendChild(tbody);
  countryTableContainer.appendChild(table);
}

//Sort by parameter function
function sortData(data, parameter) {
  let sortedData = [];
  for (let i = 0; i < data.length; i++) {
    sortedData.push([data[i].Country, data[i].[parameter]])
  }
  sortedData.sort(function(a,b) {
    return b[1] - a[1];
  })
  return sortedData;
}


//Calculating the coefficient that shows cases per 100.000 people
function calcPopulationCoefficient(population = 7700000000) { //7700000000 is the population of Earth
  populationCoefficient = population / 100000;
}


calcPopulationCoefficient();

export {generateMainTable, generateCountryTable, sortData}