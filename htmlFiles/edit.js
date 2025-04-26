
console.log("Shivam")
const productId = localStorage.getItem("productId");
const BASE_URL="http://127.0.0.1:8000";

// const token = localStorage.getItem("token");
if (productId) {
  fetchProductDetails(productId);
} else {
  alert("No item was selected for the edit");
  window.location.href = "tableforInv.html";
}





function fetchProductDetails(productId) {
  fetch(`${BASE_URL}/app1/get_productDetails?product_id=${productId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Response received:', data);
      document.getElementById("productName1").value = data.ProductName;
      document.getElementById("price1").value = data.ProductPrice;
      document.getElementById("quantity1").value = data.ProductQuantity;
      document.getElementById("productRejected1").value = data.Product_Rejected;
      document.getElementById("productRestock1").value = data.ProductRestock;
      document.getElementById("category1").value = data.ProductCategory;
      document.querySelector(
        `input[name="TransactionType"][value="${data.Transaction_type}"]`
      ).checked = true;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}







// Editing the product
const editform = document.getElementById("editProductForm");
if(editform){

editform.addEventListener("submit", async function (event) {
 event.preventDefault();
  const productId = localStorage.getItem("productId");
     const formData={
        ProductName: document.getElementById("productName1").value,
        ProductCategory: document.getElementById("category1").value,
        ProductPrice: document.getElementById("price1").value,
        ProductQuantity: document.getElementById("quantity1").value,
        ProductRejected: document.getElementById("productRejected1").value,
        ProductRestock: document.getElementById("productRestock1").value,
        TransactionType: document.querySelector(
          'input[name="TransactionType"]:checked'
        ).value,

     }
  try {
    const response = await fetch(`${BASE_URL}/app1/edit_product?product_id=${productId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }else{

    const result = await response.json();
    console.log(result);
    window.location.href = "tableforInv.html";
    }
  } catch (error) {
    console.log(error);
  }
});
}
