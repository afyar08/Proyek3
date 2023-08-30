const products = [
  { name: 'Lego Premium', price: 100000, stock: 5, quantity: 0 },
  { name: 'Lego Eksklusif', price: 50000, stock: 5, quantity: 0 },
  { name: 'Lego Standar', price: 30000, stock: 5, quantity: 0 },
  { name: 'Ini Lego', price: 20000, stock: 5, quantity: 0 },
  { name: 'Lego Legoan', price: 10000, stock: 5, quantity: 0 },
  { name: 'Lego', price: 5000, stock: 5, quantity: 0 }
];

const decreaseButtons = document.querySelectorAll('.decrease-quantity');
const increaseButtons = document.querySelectorAll('.increase-quantity');
const quantityInputs = document.querySelectorAll('.quantity');
const cartCount = document.getElementById('cart-count');
const productContainers = document.querySelectorAll('.product');

let itemCount = 0;

decreaseButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (products[index].quantity > 0) {
      products[index].quantity--;
      products[index].stock++;
      updateProductQuantity(index);
      updateCartCount();
    }
  });
});

increaseButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (products[index].stock > 0) {
      products[index].stock--;
      products[index].quantity++;
      updateProductQuantity(index);
      updateCartCount();
    }
  });
});

quantityInputs.forEach((input, index) => {
  input.addEventListener('change', () => {
    const newQuantity = parseInt(input.value);
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= products[index].stock) {
      products[index].quantity = newQuantity;
      products[index].stock = products[index].stock - newQuantity;
      updateProductQuantity(index);
      updateCartCount();
    } else {
      input.value = products[index].quantity;
    }
  });
});

function updateProductQuantity(index) {
  const quantityInput = productContainers[index].querySelector('.quantity');
  quantityInput.value = products[index].quantity;

  const stockElement = productContainers[index].querySelector('.stock');
  stockElement.textContent = `Stock: ${products[index].stock}`;

  const priceElement = productContainers[index].querySelector('.price');
  priceElement.textContent = `Price: Rp. ${(products[index].price * products[index].quantity).toFixed(2)}`;
}

function updateCartCount() {
  itemCount = products.reduce((total, product) => total + product.quantity, 0);
  cartCount.textContent = itemCount;
}

// ... kode lainnya seperti sebelumnya

const tambahBarangButtons = document.querySelectorAll('.Tambah-Barang');

tambahBarangButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (products[index].quantity > 0) {
      // Simpan data produk yang ditambahkan ke localStorage atau variabel lain jika diperlukan

      const cartItemsList = document.getElementById('cart-items');
      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span>${products[index].name}</span>
        <span>${products[index].quantity} x Rp. ${products[index].price}</span>
      `;
      cartItemsList.appendChild(cartItem);

      updateTotalPrice(); // Panggil fungsi untuk mengupdate total harga termasuk pajak
    }
  });
});

function updateTotalPrice() {
  const totalPriceElement = document.getElementById('total-price');
  const totalTaxElement = document.getElementById('total-tax');
  
  const totalPrice = products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);

  const tax = 0.11 * totalPrice; // Hitung pajak 11%
  const totalPriceWithTax = totalPrice + tax;
  
  totalPriceElement.textContent = `Total : Rp. ${totalPriceWithTax.toFixed(2)}`;
  totalTaxElement.textContent = `Pajak (11%): Rp. ${tax.toFixed(2)}`; 
}
