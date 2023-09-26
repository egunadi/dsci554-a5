// Create the world map with bubbles
function createWorldMap() {
    var widthMap = document.getElementById("world-map").offsetWidth;
    var heightMap = 400;

    var svgMap = d3.select("#world-map")
        .html("") // Clear the existing map
        .append("svg")
        .attr("width", widthMap)
        .attr("height", heightMap);

    // Define a projection (equirectangular) for the world map
    var projection = d3.geoEquirectangular()
        .scale(100)
        .translate([widthMap / 2, heightMap / 2]);

    var path = d3.geoPath().projection(projection);

    // Draw the world map with a class for styling
    d3.json("https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json").then(function (world) {
        svgMap.selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "country")
            .style("fill", "rgba(0, 0, 0, 0.1)"); // Adjust the opacity as needed
    });

    // Add bubbles to the map
    var bubbleData = [
        { name: "City A", lat: 40, lon: -74, radius: 10 },
        { name: "City B", lat: 51, lon: 0, radius: 15 },
        { name: "City C", lat: -25, lon: 133, radius: 20 },
    ];

    var bubbleGroup = svgMap.append("g");

    bubbleGroup.selectAll("circle")
        .data(bubbleData)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return projection([d.lon, d.lat])[0]; })
        .attr("cy", function (d) { return projection([d.lon, d.lat])[1]; })
        .attr("r", function (d) { return d.radius; })
        .attr("fill", "#ff5722")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);
}
