// Karte erstellen und auf Braunschweig zentrieren
const map = L.map("map").setView([52.26, 10.52], 10);

// OpenStreetMap als Hintergrundkarte einbinden
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const elephantIcon = L.icon({iconUrl:"./icons/elephant.png", iconSize: [40,40], iconAnchor:[10, -5]});
const desertIcon = L.icon({iconUrl:"./icons/desert.png", iconSize: [40,40], iconAnchor:[10, -5]});
const icebergIcon = L.icon({iconUrl:"./icons/iceberg.png", iconSize: [40,40], iconAnchor:[10, -5]});
const mountainIcon = L.icon({iconUrl:"./icons/mountain.png", iconSize: [40,40], iconAnchor:[10, -5]});

/* Die avengers Variable enthaelte das GeoJson Objekt und dieses wird jetzt verwendet, um einen 
 * neuen Layer zu erstellen und zur Karte hinzuzufuegen
 */
const nationalparksLayer = L.geoJSON(nationalparks, {
    pointToLayer: function(feature, latLng) {
        console.log(latLng)
        const icon = feature.properties.icon;
        return L.marker(latLng, {icon: getIcon(icon)})
    }
}).addTo(map);

// Die gesamte Ausdehnung des avengersLayers wird in der Karte angezeiegt
map.fitBounds(nationalparksLayer.getBounds());

// Ein Popup an den avengersLayer binden
nationalparksLayer.bindPopup(function(layer) {

    // Alle properties auslesen
    const name = layer.feature.properties.name;
    const country = layer.feature.properties.country;
    const established = layer.feature.properties.established;
    const visitors = layer.feature.properties.visitors_per_year;
    const img = layer.feature.properties.img;
    

    // Popup erstellen, welches die oben ausgelesenen Properties enthaelt
    let popup = "<h3>" + name + "</h3>" +
                  "<center><img src='./img/" + img + "' style='width:200px'></center>"+
                  "<p>Land: " + country + "<br>" + 
                  "Gegründet: " + established + "<br>" +
                  "jährliche Besucher: " + visitors + "</p>";

     // Das Popup zurueckgegeben
    return popup;
});

function getIcon(icon) {
    switch(icon) {
        case "elephant": 
            return elephantIcon;
        case "desert":
            return desertIcon;
        case "iceberg":
            return icebergIcon;
        case "mountain":
        default:
            return mountainIcon;
    }
}