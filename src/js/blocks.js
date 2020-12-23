import {initMap, removeMap} from "./map";
import countries from './countries';
let populationCoefficient;
const mainTableContainer = document.querySelector('#mainTable');
const countryTableContainer = document.querySelector('#countryTable');
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
function generateMainTable(data, country = 'Global') {
	mainTableContainer.innerHTML = '';
	let opData;
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	const cardHeader = document.createElement('span');
	cardHeader.classList.add('maintable-header');
  const table = document.createElement('table');
	const tbody = document.createElement('tbody');
	if (country !== 'Global') {
		data.Countries.forEach(element => {
			if (country.toLowerCase() == element.Slug) {
				console.log(data);
				opData = element;
				cardHeader.innerText = element.Country;
				countries.forEach(element => {
					if ((element.name.toLowerCase() === opData.Slug) || (element.name === opData.Country)) {
						calcPopulationCoefficient(element.population);
						console.log(populationCoefficient);
					}
				})
			}
		})
	} else {
		cardHeader.innerText = 'Global';
		opData = data.Global;
	}
		tbody.innerHTML = `<tr><th  scope="row">Total infected:</th><td>${opData['TotalConfirmed'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
		<tr><th  scope="row">Total deaths:</th><td>${opData['TotalDeaths'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
		<tr><th  scope="row">Total recovered:</th><td>${opData['TotalRecovered'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
		<tr><th  scope="row">New infected:</th><td>${opData['NewConfirmed'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
		<tr><th  scope="row">New deaths:</th><td>${opData['NewDeaths'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
		<tr><th  scope="row">New recovered:</th><td>${opData['NewRecovered'].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>
		<tr><th  scope="row">Total infected per 100 000:</th><td>${parseInt(opData['TotalConfirmed']/populationCoefficient)}</td></tr>
		<tr><th  scope="row">Total deaths per 100 000:</th><td>${parseInt(opData['TotalDeaths']/populationCoefficient)}</td></tr>
		<tr><th  scope="row">Total recovered per 100 000:</th><td>${parseInt(opData['TotalRecovered']/populationCoefficient)}</td></tr>
		<tr><th  scope="row">New infected per 100 000:</th><td>${parseInt(opData['NewConfirmed']/populationCoefficient)}</td></tr>
		<tr><th  scope="row">New deaths per 100 000:</th><td>${parseInt(opData['NewDeaths']/populationCoefficient)}</td></tr>
		<tr><th  scope="row">New recovered per 100 000:</th><td>${parseInt(opData['NewRecovered']/populationCoefficient)}</td></tr>`;
	table.appendChild(tbody);
	cardBody.appendChild(addSearch(data));
	cardBody.appendChild(cardHeader);
	cardBody.appendChild(table);
	mainTableContainer.appendChild(cardBody);
}

//add search in main block
function addSearch(data) {
	const form = document.createElement('form');
	form.classList.add('form-inline', 'search-block');
	const input = document.createElement('input');
	input.classList.add('form-control', 'mr-sm-2');
	input.setAttribute('type', 'search');
	input.setAttribute('placeholder', 'Search country');
	const button = document.createElement('button');
	button.classList.add('btn', 'btn-outline-success', 'my-2', 'my-sm-0');
	button.innerText = 'Search';
	form.appendChild(input);
	form.appendChild(button);
	form.addEventListener('change', function() {
		searchCountry(data, input);
	});
	form.addEventListener('input', function() {
		searchComplementation(data, input);
	});
	return form;
}

function searchCountry(data, e) {
	generateMainTable(data, e.value);
}

//Complementing the search string
function searchComplementation(data, e) {
	console.log(e.value);
	const searchString = e.value[0].toUpperCase() + e.value.substring(1);
	data.Countries.forEach(element => {
		if (element.Country.startsWith(searchString)) {
			console.log(element);
		}
	})
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
	addFlagsToArray(sortedData);
	console.log(sortedData);
  for(let i = 0; i < sortedData.length; i++) {
    tbody.innerHTML += `<tr><td><img src=${sortedData[i][2]} class="flag"></td><th  scope="row">${sortedData[i][0]}</th><td>${sortedData[i][1].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>`
	}
	table.appendChild(tbody);
	cardBody.appendChild(table);
	countryTableContainer.appendChild(cardHeader);
  countryTableContainer.appendChild(cardBody);
}

//Add flags to array of countries
function addFlagsToArray(array) {
	array.forEach(element => {
		countries.forEach(felement => {
			if (element[0] === felement.name) {
				element.push(felement.flag);
			}
		})
	})
	return array;
}


//Add dropdowns to countries block
function generateDropdowns(block, data) {	
	//console.log(catArr);
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
	//console.log(catArr[categoryId][0]);
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