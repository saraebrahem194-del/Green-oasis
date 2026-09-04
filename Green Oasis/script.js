const products = [
  {id:1,name:"Ficus benjamina", type:"plant", label:"Easy Care", price:45, image: "https://imgs.search.brave.com/0oBnJgTADtRxIUhxeve9GeSPkuqSQw75JTcGOnfAGOY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFQa2N5cVZydkwu/anBn?auto=format&fit=crop&w=800&q=85"},
  {id:2,name:"Monstera",type:"plant",label:"Prefers high humidity",price:25,image:"	https://i.pinimg.com/736x/23/55/68/2355683d9c41359853fa663facc3d3a3.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:3,name:"Mint",type:"plant",label:"Perfect in your tea",price:11,image:"https://i.pinimg.com/736x/56/b2/cf/56b2cff32e3c1fcd45d3aa55544ded84.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:4,name:"Fern",type:"plant",label:"Filters and refreshes indoor air",price:30,image:"https://i.pinimg.com/736x/73/61/7a/73617a20fb3491b8164046e47a386719.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:5,name:"Pale Clay Pot",type:"pot",label:"Hand-finished",price:20,image:"https://i.pinimg.com/1200x/61/27/13/6127133891126e944963c748cc5bda58.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:6,name:"Ribbed Stone Pot",type:"pot",label:"Textured ceramic",price:49,image:"https://i.pinimg.com/736x/38/9b/5f/389b5f86ac03cdc6c5f5c519a61e13b8.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:7,name:"Moss Green Pot",type:"pot",label:"Glazed stoneware",price:32,image:"https://i.pinimg.com/1200x/d9/6f/ba/d96fba0763ae3421c231518f0a2423ab.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:8,name:"Pruning Shears",type:"tool",label:"Garden tool",price:19,image:"https://i.pinimg.com/1200x/28/70/44/2870443f11f6c92d0c9ffbbd03097670.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:9,name:"Mister Bottle",type:"tool",label:"Daily ritual",price:8,image:"https://imgs.search.brave.com/mYLYlbY4cesmK_02hdW36YKNiQZry5tWBMAL6y_uaYE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL3prQUFB/ZVN3T1ZGbnF5TEMv/cy1sNTAwLmpwZw?auto=format&fit=crop&w=800&q=85"},
  {id:10,name:"Canvas Gloves",type:"tool",label:"Garden tool",price:20,image:"https://i.pinimg.com/736x/38/d2/d6/38d2d6df69fab5a2f8954ec31747fb9d.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:11,name:"Aloe Vera",type:"plant",label:"Tropical plant",price:25,image:"https://i.pinimg.com/736x/45/92/58/459258eb54015c1c558e172e041bf620.jpg?auto=format&fit=crop&w=800&q=85"},
  {id:12,name:"Echeveria",type:"plant",label:"Easy care",price:27,image:"https://i.pinimg.com/1200x/c5/b8/cf/c5b8cf716af772a6c7d48f82bfb4a4ab.jpg?auto=format&fit=crop&w=800&q=85"}
];

let favorites = new Set();
let cart = [];
const $ = (selector) => document.querySelector(selector);
const money = (value) => `$${value.toFixed(2)}`;


function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderProducts(category = "all") {
  const visible = category === "all" ? products : products.filter((item) => item.type === category);
  $("#product-grid").innerHTML = visible.map((product, index) => `
    <article class="product-card" style="animation-delay:${index * 45}ms" data-testid="card-product-${product.id}">
      <div class="product-image" style="background-image: url('${product.image}')"></div>
        <button class="product-favorite ${favorites.has(product.id) ? "is-favorite" : ""}" data-favorite="${product.id}" aria-label="${favorites.has(product.id) ? "Remove" : "Add"} ${product.name} ${favorites.has(product.id) ? "from" : "to"} favorites" aria-pressed="${favorites.has(product.id)}" data-testid="button-favorite-${product.id}">${favorites.has(product.id) ? "♥" : "♡"}</button>
      </div>
      <div class="product-info">
        <span class="product-type">${product.label}</span>
        <h3 data-testid="text-product-name-${product.id}">${product.name}</h3>
        <div class="product-meta"><span class="stars" aria-label="Five star rating">★★★★★</span><strong data-testid="text-product-price-${product.id}">${money(product.price)}</strong></div>
        <button class="add-product" data-add="${product.id}" data-testid="button-add-${product.id}">Add to basket</button>
      </div>
    </article>
  `).join("");
}
  renderProducts();
  console.log("products:", products);
  console.log("id:1", products[0].id);

function renderCart() {
  const items = $("#cart-items");
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  $("#cart-count").textContent = count;
  if (!cart.length) {
    items.innerHTML = `<div class="empty-cart"><p>Your basket is waiting for something green.</p><a href="#collection" class="text-link" id="empty-shop-link">Explore the collection →</a></div>`;
  } else {
    items.innerHTML = cart.map((item) => `
      <div class="cart-item">
        <div class="cart-item-image" style="background-image:url('${item.image}')"></div>
        <div><h3>${item.name}</h3><p>${item.quantity} × ${money(item.price)}</p><button class="remove-item" data-remove="${item.id}">Remove</button></div>
        <strong>${money(item.price * item.quantity)}</strong>
      </div>`).join("");
  }
  $("#cart-total").textContent = money(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
}

function openCart() {
  $("#cart-drawer").classList.add("open");
  $("#drawer-backdrop").classList.add("open");
  $("#cart-drawer").setAttribute("aria-hidden", "false");
}
function closeCart() {
  $("#cart-drawer").classList.remove("open");
  $("#drawer-backdrop").classList.remove("open");
  $("#cart-drawer").setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-category]");
  if (filter) {
    document.querySelectorAll(".filter").forEach((button) => button.classList.remove("active"));
    filter.classList.add("active");
    renderProducts(filter.dataset.category);
  }
  const favorite = event.target.closest("[data-favorite]");
  if (favorite) {
    const id = Number(favorite.dataset.favorite);
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    renderProducts(document.querySelector(".filter.active").dataset.category);
    showToast(favorites.has(id) ? "Saved to your favorites." : "Removed from favorites.");
  }
  const add = event.target.closest("[data-add]");
  if (add) {
    const product = products.find((item) => item.id === Number(add.dataset.add));
    const existing = cart.find((item) => item.id === product.id);
    existing ? existing.quantity++ : cart.push({...product, quantity:1});
    renderCart();
    showToast(`${product.name} added to your basket.`);
  }
  const remove = event.target.closest("[data-remove]");
  if (remove) {
    cart = cart.filter((item) => item.id !== Number(remove.dataset.remove));
    renderCart();
  }
});

$("#cart-button").addEventListener("click", openCart);
$("#close-cart").addEventListener("click", closeCart);
$("#drawer-backdrop").addEventListener("click", closeCart);
$("#checkout-button").addEventListener("click", () => cart.length ? showToast("Checkout is ready for your next step.") : showToast("Add something green first."));
$("#view-all").addEventListener("click", () => { document.querySelector('[data-category="all"]').click(); showToast("Showing the full collection."); });
$("#search-button").addEventListener("click", () => showToast("Search is coming soon — browse the collection below."));
$("#newsletter-form").addEventListener("submit", (event) => { event.preventDefault(); showToast("You’re on the list. Welcome to the oasis."); event.target.reset(); });

const mobileNav = $("#mobile-nav");
$("#menu-button").addEventListener("click", () => { mobileNav.classList.add("open"); mobileNav.setAttribute("aria-hidden", "false"); });
$("#close-menu").addEventListener("click", () => { mobileNav.classList.remove("open"); mobileNav.setAttribute("aria-hidden", "true"); });
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { mobileNav.classList.remove("open"); mobileNav.setAttribute("aria-hidden", "true"); }));

let lastScroll = 0;
window.addEventListener("scroll", () => {
  const current = window.scrollY;
  const header = $("#site-header");
  if (current > 120 && current > lastScroll) header.classList.add("is-hidden");
  else header.classList.remove("is-hidden");
  lastScroll = current;
}, {passive:true});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }), {threshold:.12});
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
renderProducts();
renderCart();