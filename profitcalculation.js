var profit = 0;
var gettotalProfit = localStorage.getItem("totalProfit");



window.onload=function() {

    if (localStorage.getItem("totalProfit") == null){
        localStorage.setItem("totalProfit", 0);
    }

    if (this.document.getElementById("savedProfit") != null){
        document.getElementById("savedProfit").innerHTML = "Total Profit: $" + parseFloat(gettotalProfit);
    }
    
    
    this.tableUpdate();
}

function platformChange(){
    var e = document.getElementById("platform");
    var selectedPlatform = e.options[e.selectedIndex].value;
    
    var shippingcostinput = document.getElementById("shippingCost");

    if (selectedPlatform == "goat" || selectedPlatform  == "stockx" || selectedPlatform =="local"){
        shippingcostinput.style.display="none";
        
    }
    else{
        shippingcostinput.style.display="block";
    }

}


function calculate(){

    let cProfit = 0;
    

    
    pPrice = document.getElementById("purchasePrice").value;
    sPrice = document.getElementById("sellingPrice").value;
    platform = document.getElementById("platform").value;
    sCost = document.getElementById("shippingCost").value;
    

    

    if (platform == "paypalinvoice"){
        cProfit = (sPrice * 0.971) - pPrice - sCost;
    }
    else if (platform =="paypalfnf"){
        cProfit = sPrice - pPrice - sCost;
    }
    else if (platform == "ebay"){
        if (sPrice >= 200){
            cProfit = (sPrice * 0.971 - 0.30) - pPrice - sCost;
        }
        else{
            cProfit = (sPrice * 0.90 * 0.971 - 0.30) - pPrice -sCost;
        }
        
    }
    else if (platform =="grailed"){
        cProfit = (sPrice * 0.94 * 0.971 - 0.30) - pPrice - sCost;
    }
    else if (platform == "stockx"){
        cProfit = (sPrice * 0.90 * 0.971 - 0.30) -pPrice;
    }

    else if (platform == "goat"){
        cProfit = ((sPrice * 0.905 - 5) * 0.971 - 0.30) - pPrice;
    }
    else if (platform =="local"){
        cProfit = sPrice-pPrice;
    }
    else{
        alert("Please pick a Selling platform");
        return;
    }
    
    return parseFloat(cProfit.toFixed(2));
    
}

function submit(){
    

    let sProfit = calculate();
    
    document.getElementById("profit").innerHTML = "Profit after fees: " + sProfit;
    document.getElementById("profitmargin").innerHTML = "Profit Margin: " + ((sProfit / document.getElementById("sellingPrice").value) * 100).toFixed(2) + "%";
    
    return sProfit;

}



function reset(){
    profit = 0.00;
    localStorage.setItem("totalProfit", profit);
    document.getElementById("savedProfit").innerHTML = "Total Profit: $" + localStorage.getItem("totalProfit");
}

function inventoryUpdate(){



    


    var entry = {

        id : Math.floor(Math.random() * 1000000),
        category : document.getElementById("itemCategory").value,
        brand : document.getElementById("itemBrand").value,
        name : document.getElementById("itemName").value,
        size : document.getElementById("itemSize").value,
        color : document.getElementById("itemColor").value,
        origin : document.getElementById("itemOrigin").value,
        pPrice : document.getElementById("purchasePrice").value,
        sPrice : document.getElementById("sellingPrice").value,
        platform : document.getElementById("platform").value,
        condition : document.getElementById("itemCondition").value,
        profit : calculate()
    
    }
    

    localStorage.setItem(entry.id, JSON.stringify(entry));
    console.log(localStorage.getItem(entry.id));
    var jsonString = localStorage.getItem(entry.id);
    //console.log(jsonString);
    //console.log(entry.id);
    //console.log(JSON.stringify(entry));
    addRow(entry.category, entry.brand, entry.name, entry.size, entry.color, entry.pPrice, entry.sPrice, parseFloat(entry.profit), entry.platform, entry.origin, entry.condition);


}

function addEntry(){

    inventoryUpdate();
    localStorage.setItem("totalProfit", parseInt(localStorage.getItem("totalProfit")) + calculate());
    
    
}


function tableUpdate(){
    for (let i = 0 ; i < localStorage.length; i++){

        
            if (!isNaN(localStorage.key(i))){


                var s = (JSON.parse(localStorage.getItem(localStorage.key(i))));
                console.log(s);

                addRow(s.category, s.brand, s.name, s.size, s.color, s.pPrice, s.sPrice, parseFloat(s.profit), s.platform, s.origin, s.condition);
            
        }
        
    }
}

function resetTable(){
    console.log("resetTable function localStorage.length: " + localStorage.length);
    
    for (let i = localStorage.length ; i >= 0; i--){ 

        
        if (!isNaN(localStorage.key(i))){


            var s = (JSON.parse(localStorage.getItem(localStorage.key(i))));
            localStorage.removeItem(localStorage.key(i));
            
            //resetTable();
        }

        
    }
    location.reload();
    console.log("done");
}
/*
Local Storage Keys and Values:
totalProfit : Total Profit Accrued
idNumber : idNumber assigned to item entry
entry : item properties
*/