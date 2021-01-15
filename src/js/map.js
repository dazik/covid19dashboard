import coordinates from './coordinates'
import {sortData} from './blocks';
let mymap;
function createMap() {
	mymap = L.map('mapid').setView([30, 0], 2);
	L.tileLayer('https://api.mapbox.com/styles/v1/dazik/ckj1t1omz9yk219qt11cp3s09/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGF6aWsiLCJhIjoiY2tpbG41bjhhMDR0azJ6bzU4ODVvMWQycyJ9.vKLXfdMaasuqRtFGx8HuLw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGF6aWsiLCJhIjoiY2tpbG41bjhhMDR0azJ6bzU4ODVvMWQycyJ9.vKLXfdMaasuqRtFGx8HuLw'
}).addTo(mymap);
}

//Creating circles with info for every country
function createCircles(data, parameter) {
	//console.log(data);
	const sortedData = sortData(data, parameter);
	//console.log(coordinates[`${sortedData[0][0]}`]);
	for(let i = 0; i < sortedData.length; i++) {
		const coordArr = [];
		coordArr.push(coordinates[`${sortedData[i][0]}`][1]);
		coordArr.push(coordinates[`${sortedData[i][0]}`][0]);
		var circle = L.circle(coordArr, {
			color: '#f66',
			fillColor: '#f55',
			fillOpacity: 0.7,
			radius: 10000 + sortedData[i][1]*300000/10000000
	}).addTo(mymap);
	circle.bindPopup(`<b>${sortedData[i][0]}</b><br>${sortedData[i][1].toLocaleString('en')}`);
	circle.addEventListener('mouseenter', circle.openPopup);
	}
}
function removeMap() {
	mymap.remove();
}

function initMap(data, parameter = 'TotalConfirmed') {
	createMap();
	createCircles(data, parameter);
}

export {initMap, removeMap};