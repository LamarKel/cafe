let map;

async function initMap() {
    // Cargar las bibliotecas necesarias
    const { Map } = await google.maps.importLibrary("maps");

    // Definir coordenadas
    const coords = { lat: 20.5866641, lng: -100.3863976 };

    // Crear el mapa centrado en esas coordenadas
    map = new Map(document.getElementById("map"), {
        center: coords,
        zoom: 15,
    });
}

// Llamar a la función cuando cargue la página
initMap();

const marker = new google.maps.Marker({
    position: coords, // Usa el mismo objeto { lat: ..., lng: ... }
    map: map,
    title: "Ubicación deseada"
});   