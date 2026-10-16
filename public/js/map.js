
        mapboxgl.accessToken = mapToken;
        const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });


    const marker = new mapboxgl.Marker({color: "red"})
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: 10})
        .setHTML("<h4>Welcome! your dream airbnb</h4>"))
        .addTo(map);