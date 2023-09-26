// Create the table
function createTable() {
    var tableData = 
        [{"Attrib":"population_count","Year":151.0,"Japan":151.0,"China":151.0},{"Attrib":"population_mean","Year":2025.0,"Japan":105279.5585364239,"China":1100453.0504569535},{"Attrib":"population_std","Year":43.7340447097,"Japan":17333.8903876381,"China":258957.4247522522},{"Attrib":"population_min","Year":1950.0,"Japan":73644.064,"China":543979.233},{"Attrib":"population_25%","Year":1987.5,"Japan":90345.8875,"China":897163.946},{"Attrib":"population_50%","Year":2025.0,"Japan":106674.353,"China":1144050.9169999999},{"Attrib":"population_75%","Year":2062.5,"Japan":122114.6465,"China":1337694.2515},{"Attrib":"population_max","Year":2100.0,"Japan":128117.042,"China":1425893.4650000001},{"Attrib":"gdp_count","Year":52.0,"Japan":52.0,"China":52.0},{"Attrib":"gdp_mean","Year":1995.5,"Japan":413399545733801.9375,"China":22394941923076.921875},{"Attrib":"gdp_std","Year":15.1547572289,"Japan":155536388068634.03125,"China":32029974234146.58984375},{"Attrib":"gdp_min","Year":1970.0,"Japan":76539307651500.0,"China":227970000000.0},{"Attrib":"gdp_25%","Year":1982.75,"Japan":292123425000000.0,"China":585902500000.0},{"Attrib":"gdp_50%","Year":1995.5,"Japan":498961800000000.0,"China":6657675000000.0},{"Attrib":"gdp_75%","Year":2008.25,"Japan":533179250000000.0,"China":32656325000000.0},{"Attrib":"gdp_max","Year":2021.0,"Japan":558491200000000.0,"China":114366970000000.0}];

    // Select the table container
    var tableContainer = d3.select("#table-container");

    // Create the table structure
    var table = tableContainer.append("table").attr("class", "table table-striped table-custom");
    var thead = table.append("thead");
    var tbody = table.append("tbody");

    // Append table header
    thead.append("tr")
        .selectAll("th")
        .data(["Attrib", "Year", "Japan", "China"])
        .enter()
        .append("th")
        .text(function (column) { return column; });

    // Append table rows with data
    var rows = tbody.selectAll("tr")
        .data(tableData)
        .enter()
        .append("tr");

    // Append data cells within rows
    var cells = rows.selectAll("td")
        .data(function (row) {
            return ["Attrib", "Year", "Japan", "China"].map(function (column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append("td")
        .text(function (d) { return d.value; });
}
