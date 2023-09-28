// Sample data for the bubble chart with different circle areas
var bubbleChartData = [
    { year: 2010, value: 20, color: "blue", radius: 10 },
    { year: 2011, value: 15, color: "orange", radius: 15 },
    { year: 2012, value: 25, color: "blue", radius: 20 },
    { year: 2013, value: 10, color: "orange", radius: 25 },
];

// Create the bubble chart
function createBubbleChart() {
    var marginBubble = { top: 20, right: 20, bottom: 40, left: 40 };
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
        .domain([2009, 2014]) // Set the year range with padding
        .range([0, widthBubble]);

    var yScaleBubble = d3.scaleLinear()
        .domain([0, d3.max(bubbleChartData, function (d) { return d.value; })])
        .range([heightBubble, 0]);

    // Define the tick values for the X-axis
    var xAxisTicks = [2010, 2011, 2012, 2013];

    // Add X and Y axes
    svgBubble.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + heightBubble + ")")
        .call(d3.axisBottom(xScaleBubble).tickValues(xAxisTicks).tickFormat(d3.format("d"))); // Format X-axis as years

    svgBubble.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScaleBubble));

    var circles = svgBubble.selectAll("circle")
        .data(bubbleChartData)
        .enter()
        .append("circle");

    circles.attr("cx", function (d) { return xScaleBubble(d.year); })
        .attr("cy", function (d) { return yScaleBubble(d.value); })
        .attr("r", function (d) { return d.radius; }) // Use different radii for circles
        .style("fill", function (d) { return (d.color === "blue") ? "steelblue" : "orange"; }); // Circle color based on data

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
