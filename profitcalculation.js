var profit = 0;
var gettotalProfit = localStorage.getItem("totalProfit");
var loginStatus;


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
    
    if (document.getElementById("fee") == null){
        sFee = 0;
    }
    else{
        sFee = document.getElementById("fee").value;
    }
    
    
    cProfit = (sPrice * (100-sFee)/100 ) - pPrice - sCost;
    
    
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



    if (window.location.href.indexOf("inventory") > -1){

        var entry = {
        
            id : "i" + Math.floor(Math.random() * 1000000),
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

    }
    else{

        var entry = {
        
            id : "s" + Math.floor(Math.random() * 1000000),
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

    }

    console.log(entry.id);
    
    

    localStorage.setItem(entry.id, JSON.stringify(entry));
    console.log(localStorage.getItem(entry.id));
    var jsonString = localStorage.getItem(entry.id);
    //console.log(jsonString);
    //console.log(entry.id);
    //console.log(JSON.stringify(entry));
    var s = entry;
    if(entry.id.charAt(0) == "i"){
        addRow("inventory", s.category, s.brand, s.name, s.size, s.color, s.pPrice, s.sPrice, parseFloat(s.profit), s.platform, s.origin, s.condition);
    }
    else{
        addRow("sales", s.category, s.brand, s.name, s.size, s.color, s.pPrice, s.sPrice, parseFloat(s.profit), s.platform, s.origin, s.condition);
    }

}

function addEntry(){
    if(window.location.href.indexOf("sales") > -1){
        var page = "sales";
    }
    

    console.log(page);
    console.log("sales not working");
    
    inventoryUpdate();

    if (page == "sales"){
        console.log("Working");
        localStorage.setItem("totalProfit", parseInt(localStorage.getItem("totalProfit")) + calculate());
    }
    
    
    
}


function tableUpdate(){
    for (let i = 0 ; i < localStorage.length; i++){

            
            if (!isNaN(localStorage.key(i).substring(1))){

                var s = (JSON.parse(localStorage.getItem(localStorage.key(i))));
                console.log(s);

                if(localStorage.key(i).charAt(0) == "i"){
                    addRow("inventory", s.category, s.brand, s.name, s.size, s.color, s.pPrice, s.sPrice, parseFloat(s.profit), s.platform, s.origin, s.condition);
                }
                else{
                    addRow("sales", s.category, s.brand, s.name, s.size, s.color, s.pPrice, s.sPrice, parseFloat(s.profit), s.platform, s.origin, s.condition);
                }

                
            
        }
        
    }
}

function resetTable(){

    var page;

    console.log("resetTable function localStorage.length: " + localStorage.length);
    if(window.location.href.indexOf("sales") > -1){
        page = "sales";
    }
    else{
        page = "inventory";
    }
    
    for (let i = localStorage.length -1 ; i >= 0; i--){ 

        
        
        if (!isNaN(localStorage.key(i).substring(1))){

            if (page == "inventory" && localStorage.key(i).charAt(0) == "i"){
                var s = (JSON.parse(localStorage.getItem(localStorage.key(i))));
                localStorage.removeItem(localStorage.key(i));
            }
            else if (page == "sales" && localStorage.key(i).charAt(0) == "s"){
                var s = (JSON.parse(localStorage.getItem(localStorage.key(i))));
                localStorage.removeItem(localStorage.key(i));
            }
            
            
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