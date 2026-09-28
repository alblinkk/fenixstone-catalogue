const products = [
  {id:1,name:"Essential Jacket",category:"Одежда",price:"€129",description:"Минималистичная куртка свободного кроя для повседневных образов.",tone:"tone-1"},
  {id:2,name:"Mono Watch",category:"Аксессуары",price:"€189",description:"Лаконичные часы с чистым циферблатом и универсальным ремешком.",tone:"tone-2"},
  {id:3,name:"Soft Chair",category:"Дом",price:"€249",description:"Удобное кресло с мягкой посадкой и спокойным современным силуэтом.",tone:"tone-3"},
  {id:4,name:"Daily Bag",category:"Аксессуары",price:"€89",description:"Вместительная сумка на каждый день. Подходит для города и путешествий.",tone:"tone-4"},
  {id:5,name:"Knit Sweater",category:"Одежда",price:"€99",description:"Мягкий свитер свободного кроя из приятного материала.",tone:"tone-5"},
  {id:6,name:"Stone Lamp",category:"Дом",price:"€119",description:"Настольная лампа с мягким светом для рабочего стола или прикроватной тумбы.",tone:"tone-6"}
];

const productsEl = document.querySelector("#products");
const emptyEl = document.querySelector("#empty");
const searchEl = document.querySelector("#search");
const filtersEl = document.querySelector("#filters");
const modal = document.querySelector("#modal");

let category = "all";

function render() {
  const query = searchEl.value.trim().toLowerCase();
  const visible = products.filter(p =>
    (category === "all" || p.category === category) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query)
  );

  productsEl.innerHTML = visible.map(p => `
    <article class="product" data-id="${p.id}">
      <div class="product-image ${p.tone}"></div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="product-bottom">
          <span class="price">${p.price}</span>
          <span class="details">Подробнее →</span>
        </div>
      </div>
    </article>
  `).join("");

  emptyEl.style.display = visible.length ? "none" : "block";
}

filtersEl.addEventListener("click", e => {
  const button = e.target.closest(".filter");
  if (!button) return;
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  category = button.dataset.category;
  render();
});

searchEl.addEventListener("input", render);

productsEl.addEventListener("click", e => {
  const card = e.target.closest(".product");
  if (!card) return;
  const p = products.find(x => x.id === Number(card.dataset.id));
  document.querySelector("#modalCategory").textContent = p.category;
  document.querySelector("#modalTitle").textContent = p.name;
  document.querySelector("#modalDescription").textContent = p.description;
  document.querySelector("#modalPrice").textContent = p.price;
  document.querySelector("#modalImage").className = `modal-image ${p.tone}`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
});

modal.addEventListener("click", e => {
  if (e.target.matches("[data-close]")) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("open");
});

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => document.body.classList.remove("menu-open"));
});

render();
