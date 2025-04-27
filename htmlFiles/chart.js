const ctx = document.getElementById('myBarChart1').getContext('2d');
let myBarChart;
const BASE_URL = 'https://backenddjango-main-final.onrender.com';

const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/outbound/chart`, {
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
    const { total_orders, total_products, total_shipments, total_quantity } = data.data;

    // Update the chart
    if (myBarChart) {
      myBarChart.destroy(); // Destroy the previous chart instance if it exists
    }

    myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Orders', 'Total Products', 'Total Shipments', 'Total Items'],
        datasets: [{
          label: 'Numbers in Warehouse',
          data: [total_orders, total_products, total_shipments, total_quantity], // Update data dynamically
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  } catch (error) {
    console.error(error);
  }
}


fetchData();
