// Import required modules
const readline = require('readline');    // To read input from the console
const fetch = require('node-fetch');     // To make HTTP requests (install with: npm install node-fetch)

// Base API URL (make sure json-server is running here)
const API_URL = 'http://localhost:3000/products';

// Setup console input/output interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility function to ask questions and get answers from user input
function ask(questionText) {
  return new Promise(resolve => {
    rl.question(questionText, answer => resolve(answer));
  });
}

// =====================
// CRUD FUNCTIONS
// =====================

// 1. List all products from API
async function listProducts() {
  try {
    const res = await fetch(API_URL);    // GET request
    const products = await res.json();         

    if (products.length === 0) {
      console.log('\nNo products found.');
    } else {
      console.log('\nProduct list:');
      console.table(products);          // Display products in table format
    }
  } catch (error) {
    console.log('\nError listing products.');
  }
}

// 2. Create a new product
async function createProduct() {
  const name = (await ask('Product name: ')).trim();   // Ask for name
  const price = parseFloat(await ask('Price: '));    // Ask for price and convert to number

  // Basic validation
  if (!name || isNaN(price) || price < 0) {
    console.log('\nInvalid data. Please enter a valid name and price.');
    return;
  }

  try {
    // Send POST request to create product
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });

    const newProduct = await res.json();
    console.log(`\nProduct "${newProduct.name}" created successfully (ID: ${newProduct.id}).`);
  } catch (error) {
    console.log('\nError creating the product.');
  }
}

// 3. Update an existing product
async function updateProduct() {
  const id = (await ask('ID of the product to update: '));
  const name = (await ask('New name: ')).trim();
  const price = parseFloat(await ask('New price: '));

  // Validation
  if (!id || !name || isNaN(price) || price < 0) {
    console.log('\nInvalid data. Please check the ID, name, and price.');
    return;
  }

  try {
    // Send PUT request to update product
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });

    if (res.ok) {
      const updatedProduct = await res.json();
      console.log(`\nProduct updated: ${updatedProduct.name} - $${updatedProduct.price}`);
    } else {
      console.log('\nProduct not found or could not be updated.');
    }
  } catch (error) {
    console.log('\nError updating the product.');
  }
}

// 4. Delete a product by ID
async function deleteProduct() {
  const id = (await ask('ID of the product to delete: '));

  // Validation
  if (!id) {
    console.log('\nInvalid ID.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (res.ok) {
      console.log(`\nProduct with ID ${id} deleted successfully.`);
    } else {
      console.log('\nProduct not found or could not be deleted.');
    }
  } catch (error) {
    console.log('\nError deleting the product.');
  }
}

// =====================
// MAIN MENU
// =====================

// Show available options to the user
async function menu() {
  console.log('\n==============================');
  console.log('PRODUCT CRUD MENU');
  console.log('1. List products');
  console.log('2. Create product');
  console.log('3. Update product');
  console.log('4. Delete product');
  console.log('5. Exit');
  console.log('==============================');

  const option = await ask('\nSelect an option: ');

  // Handle user choice
  switch (option) {
    case '1':
      await listProducts();
      break;
    case '2':
      await createProduct();
      break;
    case '3':
      await updateProduct();
      break;
    case '4':
      await deleteProduct();
      break;
    case '5':
      console.log('\nGoodbye!');
      rl.close();  // Close console input
      return;
    default:
      console.log('\nInvalid option.');
  }

  // Show menu again
  menu();
}

// Start the app by showing the menu
menu();
