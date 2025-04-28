const signUp = document.getElementById("signupForm");
const BASE_URL ='https://backenddjango-main-final.onrender.com';
  
// const token = localStorage.getItem("token");
console.log("Index.js")
if(signUp){
signUp.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    try{
      const password1 = document.getElementById("password1").value;
const password2 = document.getElementById("password2").value;

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const usernameRegex = /^[a-zA-Z\s]{3,20}$/;

  if (!usernameRegex.test(username)) {
    alert("Username must be 3-20 characters long and contain only letters (no numbers or symbols).");
    return;
  }

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

if (password1 !== password2) {
  alert("Passwords do not match");
  return;
  }
    const formData = {
        username : document.getElementById("username").value,
        email : document.getElementById("email").value,
        password1 : password1,
        password2: password2
    }

    
   console.log(formData)
    const response = await fetch(`${BASE_URL}/SignUpview`,{
        method:"POST",
        headers:{

            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });

    if(response.ok){
        const result = await response.json();

        console.log(result);
      
       
        window.location.href = "./verifySignUp.html";
        try{
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("username", document.getElementById("username").value);
        }
        catch(err){
            console.log(err)
         }

}
else{
    console.error("Failed to sign up");
   alert("Please make sure you have given 8 character password and not similar to username")
}
}
catch(err){
    console.log(err)
}
});
}

const submitbtn = document.getElementById('submitbtn')
if(submitbtn){
    
submitbtn.addEventListener('click',async function(event){
                event.preventDefault();
                const otp = document.getElementById('otp').value.trim(); // Trim whitespace

  if (!otp || otp.length !== 6) {
    alert("Please enter a valid 6-digit OTP.");
    return;
  }
                const email = localStorage.getItem("email")
                console.log(email)
                const response = await fetch(`${BASE_URL}/verify_otp`,{
                        method:"POST",
                        headers:{
                        "Content-Type": "application/json",
                             },
                          body: JSON.stringify({otp : otp, email: email}),
                })

                if(response.ok){
                const result = await response.json()

                console.log(result)

                if(result.message === 'Verification successful'){
                
                
                if (result.token) {
                  localStorage.setItem("token", result.token); // ✅ Store token
                  
              }
              console.log("Shivam it is working uptil here")
                window.location.href = "./setwarehouse.html";
                console.log("it is not now")
                }else{
                    alert("Verification Failed")
                }}
                else{
                    
                    alert("Failed to sign up");
                    
                }

            })}



const loginform = document.getElementById("loginForm")

if(loginform){
    loginform.addEventListener("submit", async (event) => {
        event.preventDefault();

        try{
        const formData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        const response = await fetch(`${BASE_URL}/login1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),   
        });
        localStorage.setItem("username", document.getElementById("username").value);

        if(response.ok){
            const result = await response.json();
            console.log(result);
          
            if(result.message === 'Otp sent successfully'){
                
                window.location.href = "./verifyLogin.html";
            }
            else{
                alert("Login Failed")
                console.log("mja nhi aaya")
            }
            }
            }
        catch(err){
            console.log(err)
            alert("Login Failed")
        }
    });
}

const submitloginbtn = document.getElementById('submitloginbtn')

if(submitloginbtn){
    
    submitloginbtn.addEventListener('click',async function(event){
                    event.preventDefault();
                    const otp = document.getElementById('otplogin').value.trim(); // Trim whitespace
    
      if (!otp || otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
      }
                    const username = localStorage.getItem("username")
                    console.log(username)
                    const response = await fetch(`${BASE_URL}/verify_login_otp/`,{
                            method:"POST",
                            headers:{
                            "Content-Type": "application/json",
                                 },
                              body: JSON.stringify({otp : otp, username: username}),
                    })
    
                    if(response.ok){
                    const result = await response.json()
    
                    console.log(result)
                    if (result.token) {
                      localStorage.setItem("token", result.token); // ✅ Store token
                      
                        window.location.href = "./Dashboard.html";
                    } else {
                        alert("No token received");
                    }
                }
                    else{
                        
                        console.error("Failed to sign up");
                        
                    }
    
                })}
    
                const orderTable = document.getElementById("orderTable");
        
                if (orderTable) {
                  const getOrdersDetails = async () => {
                    try {
                      const response = await fetch("https://backenddjango-main-final.onrender.com/outbound/getOrderDetails", {
                        method: "GET",
                        headers: {
                          "Authorization": `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                      });
                
                      if (response.ok) {
                        const result = await response.json();
                        console.log(result);
                        displayOrderTable(result.invoices, result.receiver); // Pass both invoices and receivers
                      }
                    } catch (err) {
                      console.log(err);
                      alert("Order details not fetched");
                    }
                  };
                  getOrdersDetails();
                  const displayOrderTable = function (invoices, receivers) {
                    const tableBody = document.getElementById("orderTableBody");
                    tableBody.innerHTML = ""; // Clear the table body
                  
                    console.log("Invoices:", invoices);
                    console.log("Receivers:", receivers);
                  
                    invoices.forEach((invoice) => {
                      console.log("Processing invoice:", invoice);
                  
                      // Match receiver based on the receiver's email
                      const receiverData = receivers?.find(r => r.Receiver_Email === invoice.receiver_id);
                      console.log("Matched receiver:", receiverData);
                  
                      // Format datetime fields
                      const billDate = formatDate(invoice.Bill_date);
                      const billValidity = formatDate(invoice.Bill_validity);
                      const billTime = formatDate(invoice.Bill_time);
                  
                      let row = document.createElement("tr");
                      row.innerHTML = `
                        <td>${invoice.Invoice_number}</td>
                        <td>${receiverData ? receiverData.ReceiverCompany_Name : 'N/A'}</td>
                        <td>${billValidity}</td>
                        <td>${invoice.ValueOfGoods}</td>
                        <td>
                          <button class="edit-btn" onclick="downloadPdf('${invoice.Bill_pdf}')">Download Pdf</button>
                        </td>
                      `;
                      tableBody.appendChild(row);
                    });
                  };
                  
                  // Format datetime to a human-readable string (e.g., YYYY-MM-DD)
                  const formatDate = (date) => {
                    if (!date) return 'N/A';
                    return new Date(date).toLocaleDateString('en-GB'); // You can adjust the format as needed
                  };
                  
                  // Function to open the PDF in a new tab
                  
                }
                const downloadPdf = (pdfUrl) => {
                  if (!pdfUrl) {
                    alert("PDF link is missing!");
                    return;
                  }
                  window.open(pdfUrl, "_blank");
                };