// Sample data for the bubble chart with different circle areas
var bubbleChartData = [{"Year":2020,"Country":"Japan","Population":125244.761,"GDP":538155400000000.0},{"Year":2010,"Country":"Japan","Population":128105.431,"GDP":505530600000000.0},{"Year":2000,"Country":"Japan","Population":126803.861,"GDP":535417700000000.0},{"Year":1990,"Country":"Japan","Population":123686.321,"GDP":453608500000000.0},{"Year":1980,"Country":"Japan","Population":117624.196,"GDP":250636100000000.0},{"Year":1970,"Country":"Japan","Population":105416.839,"GDP":76539307651500.0},{"Year":2020,"Country":"Korea","Population":51844.69,"GDP":1940726200000000.0},{"Year":2010,"Country":"Korea","Population":48813.042,"GDP":1322611200000000.0},{"Year":2000,"Country":"Korea","Population":46788.591,"GDP":651634400000000.0},{"Year":1990,"Country":"Korea","Population":44120.039,"GDP":200556200000000.0},{"Year":1980,"Country":"Korea","Population":38170.501,"GDP":39725100000000.0},{"Year":1970,"Country":"Korea","Population":32601.143,"GDP":2796600000000.0}];

// Create the bubble chart
function createBubbleChart() {
    var marginBubble = { top: 20, right: 20, bottom: 40, left: 60 };
    var widthBubble = document.getElementById("bubble-chart").offsetWidth - marginBubble.left - marginBubble.right;
    var heightBubble = 350 - marginBubble.top - marginBubble.bottom;

    var svgBubble = d3.select("#bubble-chart")
        .html("") // Clear the existing chart
        .append("svg")
        .attr("width", widthBubble + marginBubble.left + marginBubble.right)
        .attr("height", heightBubble + marginBubble.top + marginBubble.bottom)
        .append("g")
        .attr("transform", "translate(" + marginBubble.left + "," + marginBubble.top + ")");

    // Add padding to the X-axis scale
    var xScaleBubble = d3.scaleLinear()
        .domain([1960, 2030]) // Set the year range with padding
        .range([0, widthBubble]);

    var yScaleBubble = d3.scaleLinear()
        .domain([0, d3.max(bubbleChartData, function (d) { return d.Population; }) * 1.5])
        .range([heightBubble, 0]);

    // Define the tick values for the X-axis
    var xAxisTicks = [1970, 1980, 1990, 2000, 2010, 2020];

    // Add X and Y axes
    svgBubble.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + heightBubble + ")")
        .call(d3.axisBottom(xScaleBubble).tickValues(xAxisTicks).tickFormat(d3.format("d"))); // Format X-axis as years

    svgBubble.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScaleBubble).tickFormat(d3.format(".2s")));

    var circles = svgBubble.selectAll("circle")
        .data(bubbleChartData)
        .enter()
        .append("circle");

    circles.attr("cx", function (d) { return xScaleBubble(d.Year); })
        .attr("cy", function (d) { return yScaleBubble(d.Population); })
        .attr("r", function (d) { return Math.sqrt(d.GDP) / 10**6.5 }) // Use different radii for circles
        .style("fill", function (d) { return (d.Country === "Japan") ? "steelblue" : "orange"; }); // Circle color based on data

    // Add X-axis title
    svgBubble.append("text")
        .attr("class", "x-axis-title")
        .attr("x", widthBubble / 2)
        .attr("y", heightBubble + marginBubble.bottom - 5) // Adjust the y-position
        .style("text-anchor", "middle")
        .text("Year");

    // Add Y-axis title with padding
    svgBubble.append("text")
        .attr("class", "y-axis-title")
        .attr("x", -heightBubble / 2)
        .attr("y", -marginBubble.left + 15) // Adjust the y-position for padding
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("Population");

    // Add legend (you can customize this)
    const legend = svgBubble.append("g")
        .attr("transform", `translate(10, 10)`); // Adjust the translation values

    legend.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "steelblue");

    legend.append("text")
        .attr("x", 30)
        .attr("y", 10)
        .text("Japan");

    legend.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", 90)
        .attr("fill", "orange");

    legend.append("text")
        .attr("x", 120)
        .attr("y", 10)
        .text("Korea");
}
