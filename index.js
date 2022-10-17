// scripts to display the map
var world_street_map =
    L.tileLayer('http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri'
    });

// Initialize the map
var map = L.map('map', {
    layers: [world_street_map]
}).setView([43.6532, -79.3832], 13);
L.control.zoom({
    position: 'bottomright'
}).addTo(map);


// icon for markers
var greenIcon = L.icon({
    iconUrl: 'icons/green.png',

    iconSize: [18, 18], // size of the icon
    iconAnchor: [8, 5], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
});

var yellowIcon = L.icon({
    iconUrl: 'icons/yellow.png',

    iconSize: [18, 18], // size of the icon
    iconAnchor: [8, 5], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
});

var orangeIcon = L.icon({
    iconUrl: 'icons/orange.png',

    iconSize: [18, 18], // size of the icon
    iconAnchor: [8, 5], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
});

var redIcon = L.icon({
    iconUrl: 'icons/red.png',

    iconSize: [18, 18], // size of the icon
    iconAnchor: [8, 5], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
});

// showing the latLng where the user clicked
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

// Initialize the routing maching
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(43.648640, -79.380252),
        L.latLng(43.649111, -79.390785),
    ],
    routeWhileDragging: true
}).addTo(map);


//################################################################################################
const Interdata = new Map();

// function that read the information from local json file
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("json_data.json", function(text) {
    var data = JSON.parse(text);
    var data = data.features.map(function(feature) {
        return feature.properties;
    });

    var num=0;
    for (var e in data) {
        tempArr=[];
        console.log(data[e]);
        for (var value in data[e]) {
            tempArr.push(data[e][value]);
        }
        Interdata.set(e,tempArr);
    }
});

//##############################################################################
// displaying the database data on map
var displayOn=false;
const dataPointMaker=new Map();
var color;

function displayData(){
    if (displayOn == false){
        displayOn = true;
        for (const key of Interdata.keys()) {
            switch (Interdata.get(key)[8]) {
                case 0:
                    color=greenIcon;
                    break;
                case 1:
                    color=yellowIcon;
                    break;
                case 2:
                    color=orangeIcon;
                    break;
                case 3:
                    color=redIcon;
                    break;
                default:
                    color=greenIcon;
            }
        Maker = new L.marker([Interdata.get(key)[2], Interdata.get(key)[3]], { icon: color })
            .addTo(map).bindPopup("8 Peak Hr Pedestrian Volume: "+Interdata.get(key)[0]+"<br>"+
                                "8 Peak Hr Vehicle Volume: "+Interdata.get(key)[1]+'<br>'+
                                'Main Street: '+Interdata.get(key)[4]+'<br>'+
                                'Side Street 1: '+Interdata.get(key)[5]+'<br>'+
                                'Side Street 2: '+Interdata.get(key)[6]+'<br>'+
                                'Risk Level: None'
        );
            dataPointMaker.set(key,Maker);
    }
    } else {
        displayOn = false;
        for (const key of dataPointMaker.keys()) {
            map.removeLayer(dataPointMaker.get(key));
        }
    }
}

setTimeout(function(){
    displayData();
}, 1000);
