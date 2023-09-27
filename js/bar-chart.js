// Sample data for the bar chart
var barChartData = [10, 20, 15, 25, 30];

// Create the bar chart
function createBarChart() {
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = document.getElementById("bar-chart").offsetWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    // Select the chart container div
    const svg = d3.select("#bar-chart")
        .html("") // Clear the existing chart
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Your data (you can replace this with your actual data)
    const data = [{"Year":2020,"Country":"Japan","GDP_per_Capita":4296829629.4645013809},{"Year":2010,"Country":"Japan","GDP_per_Capita":3946207401.6206231117},{"Year":2000,"Country":"Japan","GDP_per_Capita":4222408495.9053416252},{"Year":1990,"Country":"Japan","GDP_per_Capita":3667410400.2171754837},{"Year":1980,"Country":"Japan","GDP_per_Capita":2130820940.9567399025},{"Year":1970,"Country":"Japan","GDP_per_Capita":726063391.5564476252},{"Year":2020,"Country":"Korea","GDP_per_Capita":37433461363.1598510742},{"Year":2010,"Country":"Korea","GDP_per_Capita":27095447155.2909965515},{"Year":2000,"Country":"Korea","GDP_per_Capita":13927207168.9442405701},{"Year":1990,"Country":"Korea","GDP_per_Capita":4545694077.9222793579},{"Year":1980,"Country":"Korea","GDP_per_Capita":1040727759.9002435207},{"Year":1970,"Country":"Korea","GDP_per_Capita":85782268.4315086752}];

    // Sort data by Year in ascending order
    data.sort((a, b) => a.Year - b.Year);

    // Create scales for X and Y axes
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Year))
        .range([0, width])
        .padding(0.1); // Adjust the padding to control the gap between bars in a group

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.GDP_per_Capita)])
        .nice()
        .range([height, 0]);

    // Create X and Y axes
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".2s")));

    // Add X-axis title
    svg.append("text")
        .attr("class", "x-axis-title")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10) // Adjust the y-position
        .style("text-anchor", "middle")
        .text("Year");

    // Add Y-axis title with padding
    svg.append("text")
        .attr("class", "y-axis-title")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15) // Adjust the y-position for padding
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("GDP per Capita");

    // Create grouped bars
    const groups = svg.selectAll(".group")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "group")
        .attr("transform", d => `translate(${xScale(d.Year)},0)`);

    const barWidth = xScale.bandwidth() / 2; // Adjust bar width

    groups.append("rect")
        .attr("x", d => barWidth * (d.Country === "Japan" ? 0 : 1)) // Adjust x-position
        .attr("y", d => yScale(d.GDP_per_Capita))
        .attr("width", barWidth)
        .attr("height", d => height - yScale(d.GDP_per_Capita))
        .attr("fill", d => (d.Country === "Japan") ? "steelblue" : "orange");

    // Add legend (you can customize this)
    const legend = svg.append("g")
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
