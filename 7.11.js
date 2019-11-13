let title = document.createElement("h1");
document.body.appendChild(title);

let timeline = document.createElement('div');
timeline.className = "timeline";
document.body.appendChild(timeline);

let draw = function(){
let request = fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');

request.then(function(response) {
    response.json().then(function(json) {
        console.log(json);
        title.innerHTML = json.metadata.title;
        timeline.innerHTML = "";

        for (let feature of json.features) {
            let magnitude = document.createElement('div');
            magnitude.innerHTML = feature.properties.mag;
            magnitude.className = "magnitude";
            magnitude.style.height = (20 * feature.properties.mag) + "px";
            magnitude.style.left = (100 - 100 * (new Date().getTime() - new Date(feature.properties.time).getTime()) / (1000 * 60 * 60)) + "%";
            timeline.appendChild(magnitude);
        }
    });
});
};

draw();

setInterval(draw, 1000);