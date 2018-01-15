$.ajax({
    url: 'http://localhost:8080/api/bears',
    type: "get",
    dataType: "json",

    success: function(data) {
        drawTable(data);
    }
});

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    var row = $("<article class='col-lg-offset-3 col-lg-6 news''>")
    $("#personDataTable").append(row);
    row.append($("<img src='images/new_1.jpg' style='width:100%'>"));
    row.append($("<h2>" + rowData.name + "</h2>"));
    row.append($("<p>" + rowData.text + "</p>"));
    row.append($("<p><a class='btn btn-primary' href='#' role='button'>View details &raquo;</a></p></div>"));
}