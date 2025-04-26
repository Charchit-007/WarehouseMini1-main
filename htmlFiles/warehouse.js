
console.log("Shivam it is working");
// const token = localStorage.getItem("token");
const warehouseForm = document.getElementById("warehouseForm")
const BASE_URL="http://127.0.0.1:8000";
if(warehouseForm){  
    warehouseForm.addEventListener("submit", async function(event){
    event.preventDefault();
    try{

        const formData = new FormData();

        formData.append("warehouseName", document.getElementById("WarehouseCompany_Name").value);
        formData.append("warehouseCity", document.getElementById("WarehouseCompany_City").value);
        formData.append("warehouseEmail", document.getElementById("WarehouseCompany_Email").value);
        formData.append("warehouseContact", document.getElementById("WarehouseCompany_Contact").value);
        formData.append("warehouseAddress", document.getElementById("WarehouseCompany_Address").value);
        formData.append("warehouseState", document.getElementById("WarehouseCompany_State").value);
        formData.append("warehouseGSTIN", document.getElementById("WarehouseCompany_GSTIN").value);
        formData.append("TypeOfWarehouse", document.getElementById("WarehouseCompany_Type").value);
        formData.append("warehousePincode", document.getElementById("WarehouseCompany_Pincode").value);
        formData.append("document", document.getElementById("WarehouseCompany_Layout").files[0]); // File object

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
          
       
            const response = await fetch(`${BASE_URL}/registration/warehouse`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData, // Send FormData directly
            });

    if(response.ok){
        const result = await response.json();
        if(result.message === "Data saved Successfully"){
            console.log(result)
            window.location.href='./Dashboard.html';
        }
        else{
            alert("Registration Failed")
            window.location.href='setwarehouse.html';
        }
    }else{
        alert("Registration Failed")
        window.location.href='setwarehouse.html';
    }
}
catch(err){
    console.log(err)
}
  
})


}
