const BASE_URL = 'https://backenddjango-main-final.onrender.com';
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleSidebarBtn && sidebar) {
      toggleSidebarBtn.addEventListener('click', function() {
        sidebar.classList.toggle('show');
      });
    }
    
    // Dropdown menu functionality
    const menuTitles = document.querySelectorAll('.menu-title');
    
    menuTitles.forEach(title => {
      title.addEventListener('click', function() {
        const dropdownId = this.getAttribute('data-dropdown');
        const dropdown = document.getElementById(dropdownId);
        
        // Set aria-expanded attribute
        const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle the submenu
        if (dropdown) {
          dropdown.classList.toggle('expanded');
        }
        
        // Close other dropdowns if this one is opening
        if (!isExpanded) {
          menuTitles.forEach(otherTitle => {
            if (otherTitle !== title) {
              otherTitle.setAttribute('aria-expanded', 'false');
              const otherId = otherTitle.getAttribute('data-dropdown');
              const otherDropdown = document.getElementById(otherId);
              if (otherDropdown) {
                otherDropdown.classList.remove('expanded');
              }
            }
          });
        }
      });
    });
    
    
    // Animation for dashboard stats
    const statCards = document.querySelectorAll('.stat-card');
    
    function animateStats() {
      statCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    }
    
    // Set initial state for animation
    statCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Animate after a small delay
    setTimeout(animateStats, 300);
    
    // Animate chart bars
    const bars = document.querySelectorAll('.bar');
    
    function animateBars() {
        bars.forEach((bar, index) => {
          const targetHeight = bar.getAttribute('data-height'); // ✅ fetch from attribute
      
          bar.style.height = '0%'; // Reset
      
          setTimeout(() => {
            bar.style.height = targetHeight; // Animate
          }, 200 * index);
        });
      }
      
    
    // Animate bars after a delay
    setTimeout(animateBars, 800);
    
    
    // Add click handlers for view all buttons
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    
    viewAllBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        alert('This would navigate to the full list view.');
      });
    });
    
   
    // Handle mail icon click
const mailIcon = document.querySelector('.mail-icon');

if (mailIcon) {
  mailIcon.addEventListener('click', function () {
    alert('Opening your messages...');
    window.location.href="https://www.gmail.com";
    // Hide the badge after clicking
    const badge = this.querySelector('.badge');
    if (badge) {
      badge.style.display = 'none';
    }

  });
}

  });


  const token = localStorage.getItem("token");
  

const stockItem = document.getElementById('stockItems');
if(stockItem){
async function totalStocks(){

  try{
    const response = await fetch(`${BASE_URL}/app1/totalStocks`,{
      method:'GET',
      headers:{
        "Authorization": `Bearer ${token}`,
        'Content-Type':'application/json',
      }
    });
    const data = await response.json();
    console.log(data)
    if(!response.ok){
        throw new Error(`HTTP error! Status : ${response.status}`);
    }
    else{
        stockItem.textContent = `${data.total_items.total_items}`
    }
    }
    catch(error){
        console.error(error);
    }

}
totalStocks();

}



const totalOrders = document.getElementById('totalOrders');

if(totalOrders){
async function totalOrdersFetch(){

  try{
    const response = await fetch(`${BASE_URL}/app1/totalOrders`,{
      method:'GET',
      headers:{
        "Authorization": `Bearer ${token}`,
        'Content-Type':'application/json',
      }
    });
    const data = await response.json();
    console.log(data)
    if(!response.ok){
        throw new Error(`HTTP error! Status : ${response.status}`);
    }
    else{
        totalOrders.textContent = `${data.total_orders}`
    }
    }
    catch(error){
        console.error(error);   
    }
}
totalOrdersFetch();
}
if(totalOrders){
const totalOrdersdiv = document.getElementById('totalItemsDiv')
totalOrdersdiv.onclick =function(){
  window.location.href='tableforInv.html'
}}


const totalShipments = document.getElementById('totalShipments');

if(totalShipments){
async function totalShipmentsFetch(){

  try{
    const response =  await fetch(`${BASE_URL}/app1/totalShipments`,{  
      method:'GET',
      headers:{
        "Authorization": `Bearer ${token}`,
        'Content-Type':'application/json',
      }
    });
    const data = await response.json();
    console.log(data)
    if(!response.ok){
        throw new Error(`HTTP error! Status : ${response.status}`);
    }
    else{
        totalShipments.textContent = `${data.total_Shipments}`
    }
    }
    catch(error){
        console.error(error);   
    }
  }
totalShipmentsFetch();  
}



const username =document.getElementById("username");
if(username){
    username.textContent = localStorage.getItem("username");
}

const logout = document.getElementById('logout');
logout.addEventListener('click',function(){
  localStorage.removeItem('token');
  window.location.href="./Login.html";
})


const ctx1 = document.getElementById('myBarChart').getContext('2d');
let myPieChart;

const fetchDataForPieChart = async () => {
  try {
    const response =  await fetch(`${BASE_URL}/outbound/piechart_view`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Log the data to inspect its structure

    // Assuming data contains a "data" object with the necessary values
    const { total_orders, total_shipments } = data.data;

    // Update the Pie chart
    if (myPieChart) {
      myPieChart.destroy(); // Destroy the previous chart instance if it exists
    }

    myPieChart = new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: ['Orders Ongoing','Orders Confirmed'],
        datasets: [{
          label: 'Distribution',
          data: [total_orders,  total_shipments], // Data dynamically from API
          backgroundColor: [
            'hsla(222, 83.30%, 18.80%, 0.70)',
            'rgba(157, 11, 43, 0.7)',
            
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
           
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });

  } catch (error) {
    console.error(error);
  }
}

// Call the fetchDataForPieChart function to populate the Pie chart
fetchDataForPieChart();
