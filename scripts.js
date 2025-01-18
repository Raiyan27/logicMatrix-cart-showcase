let products = [];
let cart = [];

const loadProducts = async () => {
  const response = await fetch("./products.json");
  const data = await response.json();
  products = data;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ``;

  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("border", "rounded-lg", "p-4", "shadow-lg", "bg-white");
    card.innerHTML = `
      <img src="${product.image_url}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 class="text-xl font-semibold">${product.name}</h3>
      <p class="text-lg text-gray-500">$${product.price}</p>
      <button
        onclick="addToCart(${product.id})"
        class="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Add to Cart
      </button>
    `;
    cardContainer.appendChild(card);
  });
};

const addToCart = (productId) => {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    updateCart();
  }
};

const removeFromCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
};

const updateCart = () => {
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  cartCount.textContent = cart.length;

  cartItemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "border-b",
      "py-2"
    );
    cartItem.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white p-1 rounded-full">X</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  totalPriceElement.textContent = totalPrice.toFixed(2);
};

document.getElementById("cart-button").addEventListener("click", () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.classList.toggle("hidden");
});

document.getElementById("close-cart-btn").addEventListener("click", () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.classList.add("hidden");
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Proceeding to checkout...");
  cart = [];
  updateCart();
});

loadProducts();
