var profit = 0;

window.onload=function() {

    if (localStorage.getItem("totalProfit") == null){
        localStorage.setItem("totalProfit", 0);
    }

    this.storeData();


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
    
    
    
    
    
    profit = profit + calculate();
    localStorage.setItem("totalProfit", parseInt(localStorage.getItem("totalProfit")) + sProfit);
    storeData();
    inventoryUpdate();

}

function storeData(){
    console.log("storeData function working" );
    
    let gettotalProfit = localStorage.getItem("totalProfit");
    console.log(localStorage.getItem("totalProfit"));
    document.getElementById("savedProfit").innerHTML = "Total Profit: " + parseInt(gettotalProfit).toFixed(2);
}

function reset(){
    profit = 0;
    localStorage.setItem("totalProfit", profit);
    storeData();
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

    addRow(category, brand, name, size, color, pPrice, sPrice, parseInt(profit).toFixed(2), platform, origin, condition);
}