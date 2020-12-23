// import script for bootstrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { drawChart } from './js/charts';
import './styles/styles.scss';
import { initMap } from './js/map';
import { generateMainTable, generateCountryTable } from './js/blocks';
const url = 'https://api.covid19api.com/summary';
let data;

//Load data from API
async function loadData(url) {
  let response = await fetch(url);
  if (response.ok) {
    data = await response.json();
    //console.log(data);
    generateIndexPage(data);
  } else {
    alert('error');
  }
}

function generateIndexPage(data) {
  generateMainTable(data.Global);
  generateCountryTable(data.Countries);
  initMap(data.Countries);
}

//Initialization function
function init() {
  loadData(url);
  drawChart();
}
//Initialize the app when all loaded
window.addEventListener('DOMContentLoaded', function () {
  init();
});
console.log('it works!');
