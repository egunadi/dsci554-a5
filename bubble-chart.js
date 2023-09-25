// Sample data for the bubble chart
var bubbleChartData = [
    { x: 10, y: 20, r: 10 },
    { x: 30, y: 15, r: 15 },
    { x: 50, y: 25, r: 20 },
    { x: 70, y: 10, r: 25 },
];

// Create the bubble chart
function createBubbleChart() {
    var marginBubble = { top: 20, right: 20, bottom: 40, left: 40 };
    var widthBubble = document.getElementById("bubble-chart").offsetWidth - marginBubble.left - marginBubble.right;
    var heightBubble = 200 - marginBubble.top - marginBubble.bottom;

    var svgBubble = d3.select("#bubble-chart")
        .html("") // Clear the existing chart
        .append("svg")
        .attr("width", widthBubble + marginBubble.left + marginBubble.right)
        .attr("height", heightBubble + marginBubble.top + marginBubble.bottom)
        .append("g")
        .attr("transform", "translate(" + marginBubble.left + "," + marginBubble.top + ")");

    var xScaleBubble = d3.scaleLinear()
        .domain([0, d3.max(bubbleChartData, function (d) { return d.x; })])
        .range([0, widthBubble]);

    var yScaleBubble = d3.scaleLinear()
        .domain([0, d3.max(bubbleChartData, function (d) { return d.y; })])
        .range([heightBubble, 0]);

    // Add X and Y axes
    svgBubble.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + heightBubble + ")")
        .call(d3.axisBottom(xScaleBubble));

    svgBubble.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScaleBubble));

    var circles = svgBubble.selectAll("circle")
        .data(bubbleChartData)
        .enter()
        .append("circle");

    circles.attr("cx", function (d) { return xScaleBubble(d.x); })
        .attr("cy", function (d) { return yScaleBubble(d.y); })
        .attr("r", function (d) { return d.r; })
        .style("fill", "#007bff");
}
