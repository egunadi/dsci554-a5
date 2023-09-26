// Create the table
function createTable() {
    // Sample data for the table
    var tableData = [
        { Name: "Item 1", Value: 10 },
        { Name: "Item 2", Value: 20 },
        { Name: "Item 3", Value: 15 },
        { Name: "Item 4", Value: 25 },
        { Name: "Item 5", Value: 30 }
    ];

    // Select the table container
    var tableContainer = d3.select("#table-container");

    // Create the table structure
    var table = tableContainer.append("table").attr("class", "table table-striped table-custom");
    var thead = table.append("thead");
    var tbody = table.append("tbody");

    // Append table header
    thead.append("tr")
        .selectAll("th")
        .data(["Name", "Value"])
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
            return ["Name", "Value"].map(function (column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append("td")
        .text(function (d) { return d.value; });
}
