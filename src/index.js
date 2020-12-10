import './styles/styles.scss';
import data from './js/loadcoviddata';
//let data;
const url = 'https://api.covid19api.com/summary';
const mainTable = document.querySelector('.table');


//Generate table
function generateMainTable(data) {
    const tbody = document.createElement('tbody');
    tbody.innerHTML = `<tr><th  scope="row">Total infected:</th><td>${data['TotalConfirmed']}</td></tr>
    <tr><th  scope="row">Total deaths:</th><td>${data['TotalDeaths']}</td></tr>
    <tr><th  scope="row">Total recovered:</th><td>${data['TotalRecovered']}</td></tr>
    <tr><th  scope="row">New infected:</th><td>${data['NewConfirmed']}</td></tr>
    <tr><th  scope="row">New deaths:</th><td>${data['NewDeaths']}</td></tr>
    <tr><th  scope="row">New recovered:</th><td>${data['NewRecovered']}</td></tr>
    <tr><th  scope="row">Total infected per 100 000:</th><td>${parseInt(data['TotalConfirmed']/100000)}</td></tr>
    <tr><th  scope="row">Total deaths per 100 000:</th><td>${parseInt(data['TotalDeaths']/100000)}</td></tr>
    <tr><th  scope="row">Total recovered per 100 000:</th><td>${parseInt(data['TotalRecovered']/100000)}</td></tr>
    <tr><th  scope="row">New infected per 100 000:</th><td>${parseInt(data['NewConfirmed']/100000)}</td></tr>
    <tr><th  scope="row">New deaths per 100 000:</th><td>${parseInt(data['NewDeaths']/100000)}</td></tr>
    <tr><th  scope="row">New recovered per 100 000:</th><td>${parseInt(data['NewRecovered']/100000)}</td></tr>`
    mainTable.appendChild(tbody);
}

//Initialization function
function init() {}

//Initialize the app when all loaded
window.addEventListener('DOMContentLoaded', function() {
    init();
})