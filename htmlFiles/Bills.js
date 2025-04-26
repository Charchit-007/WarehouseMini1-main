const table = document.getElementById("table");
const BASE_URL="http://127.0.0.1:8000";

if(table){

    try{
        
        (async()=>{
    const tableBody = document.getElementById("tablebody");
    const response =  await fetch(`${BASE_URL}/invoice/getDetails`,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
      
    })

    if(response.ok){
        const result =  await response.json()
        console.log(result)
        displaytablefunction(result.data)
    }
        else{
            console.log("Failed to fetch data")
        }
    }) ();
}catch(error){
    console.error(error)
}


const displaytablefunction = function(data){
    const tableBody = document.getElementById("tablebody");
    tableBody.innerHTML = "";
    data.forEach((item) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${item.Invoice_number}</td>
            <td><button onclick="viewBill('${item.Bill_pdf}')">View Bill</button></td>
        `;
        
        tableBody.appendChild(row);
    });
};

window.viewBill = function (pdfUrl) {
    window.open(pdfUrl, "_blank");
};
} 

