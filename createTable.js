


function addRow(category, brand, name, size, colorway, pPrice, sPrice, profit, platform, origin, condition){

    var table = document.getElementById("table");
    var row = table.insertRow(-1);


    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);
    var cell11 = row.insertCell(10);
    
    
    cell1.innerHTML = category;
    cell2.innerHTML = brand;
    cell3.innerHTML = name;
    cell4.innerHTML = size;
    cell5.innerHTML = colorway;
    cell6.innerHTML = condition;
    cell7.innerHTML = pPrice;
    cell8.innerHTML = sPrice;
    cell9.innerHTML = profit;
    cell10.innerHTML = platform;
    cell11.innerHTML = origin;
    
    
}




