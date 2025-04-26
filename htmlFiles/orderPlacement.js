console.log("Shivam")
// const token = localStorage.getItem("token");
const BASE_URL="http://127.0.0.1:8000";
const orderForm = document.getElementById("orderForm");
const username =document.getElementById("username");
if(username){
    username.textContent = localStorage.getItem("username");
}
if(orderForm){
orderForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("It is here");
    try{
    const formData = {
        productName: document.getElementById("productName").value,
        productQuantity: document.getElementById("productQuantity").value,
        SenderCompany_Name : document.getElementById("senderCompanyName").value,
        SenderCompany_Address : document.getElementById("senderAddress").value,
        SenderCompany_City: document.getElementById("senderCity").value,
        SenderCompany_Email:document.getElementById("senderEmail").value,
        Expected_date : document.getElementById("expectedDate").value

    }

    const response = await fetch(`${BASE_URL}/inbound/orderForm`,{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
    })

    if(response.ok){
        const result = await response.json()
        console.log(result)

        if(result.message == "Data saved Successfully"){
            window.location.href='./tableforInv.html';
        }

    }}
    catch(error){
        console.log(error)
    }


});
}

const logout = document.getElementById('logout');
logout.addEventListener('click',function(){
  localStorage.removeItem('token');
  window.location.href="./Login.html"
})