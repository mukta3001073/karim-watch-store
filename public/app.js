const API = '/api'; // same origin; change to full backend URL if frontend is hosted separately

const grid = document.getElementById('grid');
const statusEl = document.getElementById('status');
const searchEl = document.getElementById('search');
const navRight = document.getElementById('navRight');

const modal = document.getElementById('modal');
const authForm = document.getElementById('authForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const modalTitle = document.getElementById('modalTitle');
const submitBtn = document.getElementById('submitBtn');
const switchText = document.getElementById('switchText');
const switchLink = document.getElementById('switchLink');
const msg = document.getElementById('msg');

let mode = 'login';

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}

function renderNav() {
  const user = getUser();
  navRight.innerHTML = '';
  if (user) {
    const span = document.createElement('span');
    span.textContent = `Hi, ${user.name}`;
    const out = document.createElement('button');
    out.className = 'ghost';
    out.textContent = 'Logout';
    out.onclick = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); renderNav(); };
    navRight.append(span, out);
  } else {
    const login = document.createElement('button');
    login.className = 'ghost';
    login.textContent = 'Sign in';
    login.onclick = () => openModal('login');
    const reg = document.createElement('button');
    reg.textContent = 'Register';
    reg.onclick = () => openModal('register');
    navRight.append(login, reg);
  }
}

function openModal(m) {
  setMode(m);
  msg.textContent = '';
  modal.classList.remove('hidden');
}
function closeModal() { modal.classList.add('hidden'); authForm.reset(); }

function setMode(m) {
  mode = m;
  const reg = m === 'register';
  nameInput.classList.toggle('hidden', !reg);
  nameInput.required = reg;
  modalTitle.textContent = reg ? 'Create account' : 'Sign in';
  submitBtn.textContent = reg ? 'Register' : 'Sign in';
  switchText.textContent = reg ? 'Already have an account?' : 'No account?';
  switchLink.textContent = reg ? 'Sign in' : 'Register';
}

document.getElementById('closeModal').onclick = closeModal;
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
switchLink.onclick = (e) => { e.preventDefault(); setMode(mode === 'login' ? 'register' : 'login'); msg.textContent = ''; };

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.className = 'msg';
  msg.textContent = 'Please wait...';
  const body = { email: emailInput.value, password: passwordInput.value };
  if (mode === 'register') body.name = nameInput.value;

  try {
    const res = await fetch(`${API}/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    msg.className = 'msg ok';
    msg.textContent = mode === 'register' ? 'Registered! Check your email for a welcome message.' : 'Signed in!';
    renderNav();
    setTimeout(closeModal, 1500);
  } catch (err) {
    msg.className = 'msg err';
    msg.textContent = err.message;
  }
});

function renderProducts(products) {
  grid.innerHTML = products.map((p) => `
    <article class="card">
      <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" />
      <div class="body">
        <div class="brand">${esc(p.brand)}</div>
        <div class="name">${esc(p.name)}</div>
        <div class="desc">${esc(p.description)}</div>
        <div class="row">
          <span class="price">$${Number(p.price).toFixed(2)}</span>
          <span class="stock">${p.stock > 0 ? p.stock + ' in stock' : 'Out of stock'}</span>
        </div>
      </div>
    </article>`).join('');
}

async function loadProducts(search = '') {
  statusEl.textContent = 'Loading watches...';
  try {
    const res = await fetch(`${API}/products?search=${encodeURIComponent(search)}`);
    if (!res.ok) throw new Error('Failed to load products');
    const products = await res.json();
    statusEl.textContent = products.length ? '' : 'No watches found.';
    renderProducts(products);
  } catch (err) {
    statusEl.textContent = err.message;
  }
}

let timer;
searchEl.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(() => loadProducts(searchEl.value), 300);
});

renderNav();
loadProducts();
