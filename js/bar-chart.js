// Sample data for the bar chart
var barChartData = [10, 20, 15, 25, 30];

// Create the bar chart
function createBarChart() {
    var marginBar = { top: 20, right: 20, bottom: 40, left: 40 };
    var widthBar = document.getElementById("bar-chart").offsetWidth - marginBar.left - marginBar.right;
    var heightBar = 350 - marginBar.top - marginBar.bottom;

    var svgBar = d3.select("#bar-chart")
        .html("") // Clear the existing chart
        .append("svg")
        .attr("width", widthBar + marginBar.left + marginBar.right)
        .attr("height", heightBar + marginBar.top + marginBar.bottom)
        .append("g")
        .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");

    var xScaleBar = d3.scaleBand()
        .domain(barChartData.map(function (d, i) { return i; }))
        .range([0, widthBar])
        .padding(0.1);

    var yScaleBar = d3.scaleLinear()
        .domain([0, d3.max(barChartData, function (d) { return d; })])
        .nice()
        .range([heightBar, 0]);

    var xAxisBar = d3.axisBottom(xScaleBar)
        .tickValues(xScaleBar.domain())
        .tickFormat(function (d) { return barChartData[d]; });

    var yAxisBar = d3.axisLeft(yScaleBar)
        .ticks(5);

    svgBar.append("g")
        .attr("transform", "translate(0," + heightBar + ")")
        .call(xAxisBar);

    svgBar.append("g")
        .call(yAxisBar);

    svgBar.selectAll(".bar")
        .data(barChartData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) { return xScaleBar(i); })
        .attr("y", function (d) { return yScaleBar(d); })
        .attr("width", xScaleBar.bandwidth())
        .attr("height", function (d) { return heightBar - yScaleBar(d); })
        .attr("fill", "#ff5722");
}
