
//Hide Password
const maskPassword = (pass)=>{
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str+="*"
    }
    return str;
}
//Delete Password
const deletePass = (web) =>{
    let data = localStorage.getItem("passwords");
    let pass = JSON.parse(data);
    pass = pass.filter((e)=>{
        return e.website != web
    })
    localStorage.setItem("passwords",JSON.stringify(pass));
    showPassword();
}
//Logic to add elements in html
const showPassword = () =>{
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords"); 
    if(data==null || JSON.parse(data).length==0){
        tb.innerHTML = "No Data To Show";
    }
    else{
        tb.innerHTML = `<tr>
        <th>App</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
      </tr>`
        let str = "";
        let pass = JSON.parse(data);
        for (let i = 0; i < pass.length; i++) {
            const element = pass[i];
            str+= `<tr>
            <td>${element.website}</td>
            <td>${element.username}</td>
            <td><span class="password-cell">${maskPassword(element.password)}</span> <img class="view-password" data-index="${i}" src="copy.svg"></td>
            <td><button class='btnsm' onclick=deletePass('${element.website}')>Delete</button></td>
            </tr>`
        }
        tb.innerHTML+=str;
        document.querySelectorAll(".view-password").forEach((img) => {
            img.addEventListener("click", (e) => {
                const index = e.currentTarget.getAttribute("data-index");
                const password = pass[index].password;
                const passwordCell = e.currentTarget.parentElement.querySelector(".password-cell");
                passwordCell.textContent = password;
                setTimeout(() => {
                    passwordCell.textContent = maskPassword(password);
                }, 2000);
            });
        });
    }
    website.value = "";
    username.value = "";
    password.value = "";
}
showPassword();
document.querySelector(".btn").addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("clicked");
    let passwords = localStorage.getItem("passwords");
    if(passwords==null){
        let json = [];
        json.push({
            website:website.value,
            username:username.value,
            password:password.value
        });
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    else{
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({
            website:website.value,
            username:username.value,
            password:password.value
        });
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    showPassword();
});


