import {initMap, removeMap} from "./map";
import countries from "./countries";
console.log(countries)
console.log(countries[0]['population'])
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
console.log(catArr);
let activeCountry = null;

//Generate main table
function generateMainTable(data, parameter = "TotalConfirmed") {
	countryTableContainer.innerHTML = '';
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	const cardHeader = document.createElement('div');
	cardHeader.classList.add('card-header');
	const per100K = document.createElement('span');
	per100K.innerText = 'per 100K';
	generateDropdowns(cardHeader, data);
	cardHeader.appendChild(per100K);
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
//   console.log(data);
  const sortedData = sortData(data, parameter, countries);
   console.log(sortedData);
  for(let i = 0; i < sortedData.length; i++) {

	// if(countries[i]["name"] === sortedData[i][0]) {
	// 	let population = countries[i]["population"];
	// 	console.log(population);
	// }

    tbody.innerHTML += `<tr><th  scope="row">${sortedData[i][0]}</th><td>${sortedData[i][1].toLocaleString('en', { maximumFractionDigits: 0 })}</td></tr>`
	}
	table.appendChild(tbody);
	cardBody.appendChild(table);
	mainTableContainer.appendChild(cardHeader);
  mainTableContainer.appendChild(cardBody);
}

// Generate country table
function generateCountryTable(data, parameter = "TotalConfirmed") {
	countryTableContainer.innerHTML = '';
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	const cardHeader = document.createElement('div');
	cardHeader.classList.add('card-body');
	generateDropdowns(cardHeader, data);
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  // console.log(data);
  const sortedData = sortData(data, parameter);
  populationPush(sortedData, countries);
   console.log(sortedData);
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
		console.log(ddItemButton)
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
function sortData(data, parameter, countries) {
  let sortedData = [];
  for (let i = 0; i < data.length; i++) {
    sortedData.push([ data[i].Country, data[i].[parameter]])
  }
  sortedData.sort(function(a,b) {
    return b[1] - a[1];
  })



  return sortedData;
}

function populationPush(sortedData, countries) {
	console.log(countries)
	for (let i = 0; i < countries.length; i++) {
		
		for (let j = 0; j < sortedData.length; j++) {
			if(countries[j]["name"] === sortedData[j][2]) {
				sortedData[j].push[countries[j]["population"]]
			}
			
		}
	}
	console.log(sortedData);
}


//Calculating the coefficient that shows cases per 100.000 people
function calcPopulationCoefficient(population = 7700000000) { //7700000000 is the population of Earth
  populationCoefficient = population / 100000;
}


calcPopulationCoefficient();

export {generateMainTable, generateCountryTable, sortData}