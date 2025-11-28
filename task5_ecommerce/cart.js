// cart.js - simple cart using localStorage
const CART_KEY = 'mini_ecom_cart_v1';
function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[] }catch(e){ return [] } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }

function addToCartById(id){
  const prod = PRODUCTS.find(p=>p.id===id);
  if(!prod) return;
  let cart = loadCart();
  let item = cart.find(i=>i.id===id);
  if(item) item.qty += 1;
  else cart.push({id:prod.id, title:prod.title, price:prod.price, qty:1});
  saveCart(cart);
  alert(prod.title + ' added to cart');
}

function updateCartCount(){
  const countEl = document.getElementById('cart-count');
  const cart = loadCart();
  const total = cart.reduce((s,i)=>s + i.qty,0);
  if(countEl) countEl.textContent = total;
}

function renderCart(){
  const cart = loadCart();
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  if(cart.length===0){ container.innerHTML = '<li>Cart is empty.</li>'; document.getElementById('cart-total').textContent = '0'; return; }
  cart.forEach(item=>{
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.title} (x${item.qty}) - ₹${item.price*item.qty}</span>
                    <div class="actions">
                      <button class="qty-decrease" data-id="${item.id}">-</button>
                      <button class="qty-increase" data-id="${item.id}">+</button>
                      <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>`;
    container.appendChild(li);
  });
  const total = cart.reduce((s,i)=>s + i.qty*i.price,0);
  document.getElementById('cart-total').textContent = total;
}

// modal controls
const cartModal = document.getElementById('cart-modal');
const viewCartBtn = document.getElementById('view-cart');
const closeCartBtn = document.getElementById('close-cart');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');

viewCartBtn.addEventListener('click', ()=>{
  cartModal.setAttribute('aria-hidden','false');
  cartModal.classList.add('open');
  renderCart();
});
closeCartBtn.addEventListener('click', ()=>{ cartModal.setAttribute('aria-hidden','true'); cartModal.classList.remove('open'); });

document.getElementById('cart-items').addEventListener('click', (e)=>{
  const id = parseInt(e.target.dataset.id,10);
  if(e.target.matches('.qty-increase')){ modifyQty(id, 1); }
  if(e.target.matches('.qty-decrease')){ modifyQty(id, -1); }
  if(e.target.matches('.remove-item')){ removeItem(id); }
});

function modifyQty(id, delta){
  let cart = loadCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty<=0) cart = cart.filter(i=>i.id!==id);
  saveCart(cart); renderCart();
}

function removeItem(id){
  let cart = loadCart();
  cart = cart.filter(i=>i.id!==id);
  saveCart(cart); renderCart();
}

clearCartBtn.addEventListener('click', ()=>{
  localStorage.removeItem(CART_KEY);
  renderCart();
  updateCartCount();
});

checkoutBtn.addEventListener('click', ()=>{
  alert('Checkout - demo only. Total: ₹' + document.getElementById('cart-total').textContent);
  localStorage.removeItem(CART_KEY);
  renderCart();
  updateCartCount();
});

// init
updateCartCount();
