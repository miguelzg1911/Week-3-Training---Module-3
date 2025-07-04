// Wait until the DOM content is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Base URL for the API
  const API_URL = 'http://localhost:3000/products';

  // Get references to input fields and product list container
  const inputName = document.getElementById('name');
  const inputPrice = document.getElementById('price');
  const inputDeleteId = document.getElementById('idToDelete');
  const inputUpdateId = document.getElementById('updateId');
  const productList = document.getElementById('productList');

  function showMessage(text, type = 'success') {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = `message ${type}`; // Assign CSS class based on type
    messageElement.style.display = 'block';    // Make sure the message is visible
  }

  // Handle "Add Product" button click
  document.getElementById('add').addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent form submission reload

    const name = inputName.value.trim();
    const price = Number(inputPrice.value);

    // Validate inputs
    if (!name || isNaN(price)) {
      showMessage('Invalid data. Please complete all fields.', 'error');
      return;
    }

    // Send POST request to add new product
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });

    showMessage(`Product "${name}" added successfully.`, 'success');

    // Clear inputs
    inputName.value = '';
    inputPrice.value = '';

    // Refresh product list
    showProducts();
  });

  // Handle "Update Product" button click
  document.getElementById('updateProduct').addEventListener('click', async (e) => {
    e.preventDefault();

    const id = inputUpdateId.value.trim();
    const name = inputName.value.trim();
    const price = Number(inputPrice.value);

    // Validate inputs
    if (!id || !name || isNaN(price)) {
      showMessage('You must enter a valid ID, name, and price to update.', 'error');
      return;
    }

    // Send PUT request to update the product
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });

    if (res.ok) {
      showMessage(`Product ID ${id} updated successfully.`, 'success');
    } else {
      showMessage(`Error updating product with ID ${id}.`, 'error');
    }

    // Clear inputs
    inputUpdateId.value = '';
    inputName.value = '';
    inputPrice.value = '';

    // Refresh product list
    showProducts();
  });

  // Handle "Show Products" button click
  document.getElementById('show').addEventListener('click', (e) => {
    e.preventDefault();
    showProducts();
  });

  // Handle "Delete Product" button click
  document.getElementById('delete').addEventListener('click', async (e) => {
    e.preventDefault();

    const id = inputDeleteId.value.trim();

    if (!id) {
      showMessage('You must enter a valid ID to delete.', 'error');
      return;
    }

    // Send DELETE request to remove product
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (res.ok) {
      showMessage(`Product ID ${id} deleted.`, 'success');
    } else {
      showMessage(`No product found with ID ${id}.`, 'error');
    }

    inputDeleteId.value = '';

    // Refresh product list
    showProducts();
  });

  /**
   * Fetch products from the API and display them in the list
   */
  async function showProducts() {
    const res = await fetch(API_URL);
    const products = await res.json();

    // Build list items with product info
    productList.innerHTML = products
      .map(p => `<li>${p.id} - ${p.name} - $${p.price}</li>`)
      .join('');
  }
});
