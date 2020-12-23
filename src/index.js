// import script for bootstrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { drawChart } from './js/charts';
import './styles/styles.scss';
import {initMap} from './js/map';
import {generateMainTable, generateCountryTable} from './js/blocks';
import {tabsFunction} from './js/tabs';
const url = 'https://api.covid19api.com/summary'
let data = undefined;

tabsFunction();

//Load data from API
async function loadData(url) {
    let response = await fetch(url);
    if (response.ok) {
				data = await response.json();
				console.log(data.Countries);
				generateIndexPage(data);
				setTimeout(hideLoader, 1000);
    } else {
        alert('error');
    }
}

function generateIndexPage(data) {
	if(data.Global.TotalConfirmed === 0 || data.Global.TotalConfirmed === undefined) {
		document.body.innerHTML = '<div class="loader"><div class="caching-message">Caching in progress</div></div>';
	}
  generateMainTable(data);
	generateCountryTable(data);
	initMap(data.Countries);
}

//Hide loading animation
function hideLoader() {
	document.body.classList.remove('loading');
	document.querySelector('.loader').classList.add('hiding')
	setTimeout(function() {
		document.querySelector('.loader').classList.add('hidden')
	}, 1000)
}

//Initialization function
function init() {
	loadData(url);
	//console.log(countries);
  drawChart();
}
//Initialize the app when all loaded
window.addEventListener('DOMContentLoaded', function () {
  init();
});
console.log('it works!');





