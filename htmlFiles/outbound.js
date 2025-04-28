/*const token = localStorage.getItem("token");
if (token) {
    console.log("✅ Token exists:", token);
} else {
    console.log("❌ Token does not exist in localStorage.");
}*/

const tranDriv = document.getElementById("transporterDriverForm");
// const token = localStorage.getItem("token");
//const BASE_URL='https://backenddjango-main-final.onrender.com';

if(tranDriv){ 
    tranDriv.addEventListener("submit", async function(event){
        event.preventDefault();
        try{
        const formData = {
            Receiver_Email: document.getElementById("Receiver_Email").value,
            TransporterName: document.getElementById("TransporterName").value,
            TransporterAddress: document.getElementById("TransporterAddress").value,
            TransporterEmail: document.getElementById("Transporter_Email").value,
            TransporterContact: document.getElementById("Transporter_Contact").value,
            DriverName: document.getElementById("Driver_Name").value,
            DriverContact: document.getElementById("Driver_Contact").value,
            VehicleNumber: document.getElementById("Vehicle_Number").value,
            DriverEmail: document.getElementById("Driver_Email").value,
    }

    const response = await fetch(`${window.BASE_URL}/transport/saveDetails`,{
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
        if(result.message === "Saved Successfully"){
            window.location.href='./OrderOut2Page.html';
        }
        else{
            alert("Submission Failed")
        }
    }
    else{
        alert("Server side issue")
    }

    }catch(err){
        console.log(err)
 }
    });
}




const receiveForm = document.getElementById("receiverForm");
if(receiveForm){ 
    receiveForm.addEventListener("submit", async function(event){
        event.preventDefault();
        try{
        const formData = {
            ReceiverCompany_Name : document.getElementById("ReceiverCompany_Name").value,
            ReceiverCompany_Address : document.getElementById("Receiver_Address").value,
            ReceiverCompany_City: document.getElementById("Receiver_City").value,
            ReceiverCompany_Email:document.getElementById("Receiver_Email").value,
            ReceiverCompany_Contact:document.getElementById("Receiver_Contact").value,
            ReceiverCompany_State:document.getElementById("Receiver_State").value,
            ReceiverCompany_GSTIN:document.getElementById("Receiver_GSTIN").value,
            ModeOfTransport:document.getElementById("ModeOfTransport").value,
        }
        const response = await fetch(`${window.BASE_URL}/outbound/saveDetails`,{
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
            if(result.message === "Data fetched Successully"){
                window.location.href='./orderOut2Page.html';
            }
            else{
                alert("Submission Failed")  
            }
            }
            else{
                alert("Server side issue")
            }
    }
        catch(error){
            console.log(error)
        }
    });
}

const invoice= document.getElementById("InvoiceBillForm")

if(invoice){
    invoice.addEventListener("submit",
        async function(event){
            event.preventDefault();

            try{
            const formData ={
                Receiver_Email: document.getElementById("Receiver_Email").value,
                Invoice_number:document.getElementById("Invoice_number").value,
                ValueOfGoods:document.getElementById("ValueOfGoods").value,
                ReasonForTransport:document.getElementById("ReasonForTransport").value,
                CEWBno:document.getElementById("CEWBno").value,
                MultiVehInfo:document.getElementById("MultiVehInfo").value,
                Bill_validity:document.getElementById("Bill_validity").value
            }

            const response = await fetch('https://backenddjango-main-final.onrender.com/invoice/getBillDetails',{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })

            if(response.ok){
            const result = await response.json()
            console.log(result)
            if(result.message === "Data fetched Successully"){
                window.location.href='./orderOut2Page.html';    

            }else{
                console.log(result.message)
            }
        }
            else{
                alert("Failed to post ")
            }}
            catch(error){
                console.log(error)
            }
        }
    )
}

const viewLayout = document.getElementById("viewLayout");

if (viewLayout) {
    try {
        (async () => {
            const response = await fetch(`${window.BASE_URL}/registration/getDetails`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                // Assuming the result contains a URL or path for the document
                const documentUrl = result.data.document; // Example, replace with actual field
                setupViewButton(documentUrl);  // Pass the document URL to the setup function
            } else {
                window.location.href = "./error.html";
            }
        })();
    } catch (error) {
        console.log(error);
    }

    function setupViewButton(urlToOpen) {
        const viewButton = document.getElementById("viewButton");
        if (viewButton) {
            viewButton.addEventListener("click", function () {
                if (urlToOpen) {
                    window.open(urlToOpen, "_blank");
                } else {
                    console.log("No document URL provided.");
                }
            });
        }
    }
}

