import {initMap, removeMap} from "./map";

let populationCoefficient;
const mainTableContainer = document.querySelector('#mainTable');
const countryTableContainer = document.querySelector('#countryTable');
const mapContainer = document.querySelector('#mapid');
let activeCategoryId = 0;
const categories = {
	TotalConfirmed: 'Total cases',
	TotalDeaths: 'Total deaths',
	TotalRecovered: 'Total Recovered',
	NewConfirmed: 'New cases',
	NewDeaths: 'New deaths',
	NewRecovered: 'New Recovered',
}
const catArr = Object.entries(categories);
let activeCountry = null;

//Generate main table
function generateMainTable(data) {
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
  const table = document.createElement('table');
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
	cardBody.appendChild(table);
	mainTableContainer.appendChild(cardBody);
}

//Generate country table
function generateCountryTable(data, parameter = "TotalConfirmed") {
	countryTableContainer.innerHTML = '';
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	const cardHeader = document.createElement('div');
	cardHeader.classList.add('card-body');
	generateDropdowns(cardHeader, data);
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const sortedData = sortData(data, parameter);
  for(let i = 0; i < sortedData.length; i++) {
    tbody.innerHTML += `<tr><th  scope="row">${sortedData[i][0]}</th><td>${sortedData[i][1].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>`
	}
	table.appendChild(tbody);
	cardBody.appendChild(table);
	countryTableContainer.appendChild(cardHeader);
  countryTableContainer.appendChild(cardBody);
}
//Add dropdowns to countries block
function generateDropdowns(block, data) {	
	console.log(catArr);
	const dropdownContainer = document.createElement('div');
	dropdownContainer.classList.add('dropdown');
	const ddButton = document.createElement('button');
	ddButton.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
	ddButton.id = 'categoryDropdown';
	ddButton.setAttribute('data-bs-toggle', 'dropdown');
	ddButton.setAttribute('aria-expanded', 'false');
	ddButton.innerText = catArr[activeCategoryId][1];
	const ddList = document.createElement('ul');
	ddList.classList.add('dropdown-menu');
	ddList.setAttribute('aria-labelledby', 'categoryDropdown');
	for (let i = 0; i < catArr.length; i += 1) {
		const ddItem = document.createElement('li');
		const ddItemButton = document.createElement('button');
		ddItemButton.id = i;
		ddItemButton.classList.add('dropdown-item');
		ddItemButton.setAttribute('type', 'button');
		ddItemButton.innerText = catArr[i][1];
		ddItemButton.addEventListener('click', function() {
			chooseCategory(i, data);
		});
		ddItem.appendChild(ddItemButton);
		ddList.appendChild(ddItem);
	}
	dropdownContainer.appendChild(ddButton);
	dropdownContainer.appendChild(ddList);
	block.appendChild(dropdownContainer);
}

//Choose category
function chooseCategory(categoryId, data) {
	console.log(catArr[categoryId][0]);
	activeCategoryId = categoryId;
	generateCountryTable(data, catArr[categoryId][0]);
	removeMap();
	initMap(data, catArr[categoryId][0]);
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