var userDatabase = {

    username : "username",
    password : "password"
}

function login(){
    console.log("login");
    var uname = document.getElementById("uname").value;
    var password  = document.getElementById("psw").value;
    if (uname == userDatabase.username && password == userDatabase.password){
        window.alert("Login Successful!");
        window.location.href = "index.html";
        loginStatus = true;
        localStorage.setItem("loginStatus", loginStatus);
    }
    else{
        window.alert("Username and Password Combination does not exist!");
    }
}

function logOut(){
    loginStatus = false;
    localStorage.setItem("loginStatus", loginStatus);
    window.location.href = "index.html";
    document.getElementById("loginNav").value = "Log Out";
}