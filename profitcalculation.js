var profit = 0;
let gettotalProfit = localStorage.getItem("totalProfit");


window.onload=function() {

    if (localStorage.getItem("totalProfit") == null){
        localStorage.setItem("totalProfit", 0);
    }

    if (this.document.getElementById("savedProfit") != null){
        document.getElementById("savedProfit").innerHTML = "Total Profit: $" + parseFloat(gettotalProfit).toFixed(2);
    }
    
}

function platformChange(){
    var e = document.getElementById("platform");
    var selectedPlatform = e.options[e.selectedIndex].value;
    
    var shippingcostinput = document.getElementById("shippingCost");

    if (selectedPlatform == "goat" || selectedPlatform  == "stockx" || selectedPlatform =="local"){
        shippingcostinput.style.display="none";
        console.log(true);
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
    return cProfit;
}

function submit(){
    console.log("button worked");

    

    let sProfit = calculate();
    console.log(calculate);
    
    document.getElementById("profit").innerHTML = "Profit after fees: " + sProfit.toFixed(2);
    document.getElementById("profitmargin").innerHTML = "Profit Margin: " + ((sProfit / document.getElementById("sellingPrice").value) * 100).toFixed(2) + "%";
    
    
    
    
    console.log("profit variable= " + profit);
    profit = calculate();
    
    return profit;

}



function reset(){
    profit = 0.00;
    localStorage.setItem("totalProfit", profit);
    document.getElementById("savedProfit").innerHTML = "Total Profit: $" + localStorage.getItem("totalProfit");
}

function inventoryUpdate(){
    let category = document.getElementById("itemCategory").value;
    let brand = document.getElementById("itemBrand").value;
    let name = document.getElementById("itemName").value;
    let size = document.getElementById("itemSize").value;
    let color = document.getElementById("itemColor").value;
    let origin = document.getElementById("itemOrigin").value;
    let pPrice = document.getElementById("purchasePrice").value;
    let sPrice = document.getElementById("sellingPrice").value;
    let platform = document.getElementById("platform").value;
    let condition = document.getElementById("itemCondition").value;
    let profit = calculate();

    addRow(category, brand, name, size, color, pPrice, sPrice, parseFloat(profit).toFixed(2), platform, origin, condition);
}

function addEntry(){
    inventoryUpdate();
    
    localStorage.setItem("totalProfit", parseFloat(localStorage.getItem("totalProfit")) + calculate());
    
}