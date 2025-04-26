console.log("Shivam it is working");

//Adding product
const BASE_URL="http://127.0.0.1:8000";
const productForm = document.getElementById("productForm");
// const token = localStorage.getItem("token");
if(productForm){

productForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const transactionType = document.querySelector('input[name="TransactionType"]:checked')?.value;
  console.log("It is here");
  const formData = {
    productName: document.getElementById("productName").value,
    productQuantity: document.getElementById("quantity").value,
    productPrice: document.getElementById("price").value,
    productCategory: document.getElementById("category").value,
    transactionType: transactionType,
    ProductRejected: document.getElementById("productRejected").value,
    productRestock:document.getElementById("productRestock").value
  };

  if(!transactionType){
    alert("Please select the transaction type");
    return
  }
  if (!confirm("You sure ?")) {
    return;
  }

  const response = await fetch(`${BASE_URL}/app1/add_item`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  console.log(response);

  window.location.href = "tableforInv.html";
});
}


const getProductDetails = async function () {
  const response = await fetch(`${BASE_URL}/app1/get_product`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! Status : ${response.status}`);
  } else {
    displayDatatable(data.data);
    displayStatustable(data.data);
  }
  console.log(data);
};


const displayDatatable = async function (data) {
  const tableBody = document.getElementById("tablebody");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            
            <td>${item.ProductName}</td>
            <td>${item.ProductQuantity}</td>
            <td>${item.ProductPrice}</td>
            <td>${item.ProductCategory}</td>
            <td>${item.Transaction_type}</td>
            <td>${item.Product_Rejected}</td>
             <td>
                <button class="edit-btn" onclick="redirectToEditPage(${item.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${item.id})">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
};
getProductDetails()


//storing the product id
function redirectToEditPage(productId) {
  if (!confirm("You will be redirected to another page!")) {
    return;
  }
  localStorage.setItem("productId", productId);
  
  window.location.href = 'inventoryEdit.html';
}




//Deleting the product
const deleteProduct = async function (productId) {
  const response = await fetch(`${BASE_URL}/app1/del_product`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: productId }),
  });
  const data = await response.json();
  console.log(data);
};




const displayStatustable = async function (data) {
  console.log("Shivam");
  const table2Body = document.getElementById("stockTableBody");
  table2Body.innerHTML = "";
  data.forEach((item) => {
    let row = document.createElement("tr");
    let buttonStyle = '';
    if (item.status === "OutofStock") {
      buttonStyle = "style='background-color: red; color: white;  padding:5px;'";
      
    } else if (item.status === "InStock") {
      buttonStyle = "style='background-color: green; color: white;  padding:5px; '";
    } else {
      buttonStyle = "style='background-color: orange; color: white;  padding:5px;'";
    }

    row.innerHTML = `
        
        <td>${item.ProductName}</td>
        <td>${item.ProductQuantity}</td>
        <td>
          <button class="edit-btn" ${buttonStyle} onclick="redirectToEditPage2(${item.id})">${item.status}</button>
        </td>
      `;
    table2Body.appendChild(row);

    
  });
  
};

function redirectToEditPage2(productId) {
  if (!confirm("You will be redirected to another page!")) {
    return;
  }
  localStorage.setItem("productId", productId);
  
  window.location.href = 'orderplacement.html';
}

