//INIZIA CODICE PER MAPPE/
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('You are HERE!!')
    .openPopup();




//ELEMENTI INFORMAZIONE IP//
const Address = document.getElementById("address");
let Location = document.getElementById("location");
const timeZone = document.getElementById("timezone");
const ISP = document.getElementById("isp");
let Input = document.getElementById("input");


//PULSANTE RICERCA IP//
const button = document.getElementById("button");



//MOSTRA L'INDIRIZZO IP DELL'UTENTE CHE ACCEDE//
function getIP() {
    let CurrentApi = 'https://api.ipify.org?format=json';
    fetch(CurrentApi)
        .then(response => response.json())
        .then(data => {
            Input.value = data.ip;
            console.log(data);
            RunIp();
        });
}
getIP();

//TI PERMETTE DI CERCARE UN INDIRIZZO IP SCRIVENDOLO NELLA BARRA DI RICERCA//
function RunIp() {
    let Api = `https://geo.ipify.org/api/v2/country,city?apiKey=at_qT6MiqNooGzdQTMbp5iDqTP7sefha&ipAddress=${Input.value}`;
    fetch(Api)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            Address.innerHTML = data.ip;
            Location.innerHTML = data.location.city;
            timeZone.innerHTML = "UTC" + " " + data.location.timezone;
            ISP.innerHTML = data.isp;
            L.marker([data.location.lat, data.location.lng]).addTo(map)
                .bindPopup('You are in' + " " + `${data.as.name}`)
                .openPopup();;
            map.setView([data.location.lat, data.location.lng]);
        });
}



//SEMPLICE PULSANTE CHE AVVIA LA RICERCA DELLE INFORMAZIONI DELL'IP INSERITO//
button.addEventListener("click", () => {
    RunIp();
})


