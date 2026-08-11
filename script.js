const CONFIG = {
  whatsapp: "55SEUNUMERO",
  instagram: "https://www.instagram.com/SEUINSTAGRAM/"
};

const toast = document.getElementById("toast");
const showToast = (text) => {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
};

const whatsappConfigured = () =>
  CONFIG.whatsapp !== "55SEUNUMERO" && CONFIG.whatsapp.length >= 12;

const instagram = document.getElementById("instagram");
const whatsapp = document.getElementById("whatsapp");
const floatingWhatsapp = document.getElementById("floatingWhatsapp");

instagram.href = CONFIG.instagram;

function whatsappUrl(message = "Olá! Gostaria de conhecer a Dom das Docuras e fazer uma encomenda.") {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

if (whatsappConfigured()) {
  whatsapp.href = whatsappUrl();
  floatingWhatsapp.href = whatsappUrl();
} else {
  whatsapp.href = "#contato";
  floatingWhatsapp.href = "#contato";
}

floatingWhatsapp.addEventListener("click", (e) => {
  if (!whatsappConfigured()) {
    e.preventDefault();
    showToast("Configure o WhatsApp no script.js.");
  }
});

instagram.addEventListener("click", (e) => {
  if (CONFIG.instagram.includes("SEUINSTAGRAM")) {
    e.preventDefault();
    showToast("Configure o Instagram no script.js.");
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    const value = filter.dataset.filter;

    cards.forEach(card => {
      card.style.display =
        value === "todos" || card.dataset.category === value
          ? ""
          : "none";
    });
  });
});

document.querySelectorAll(".order").forEach(button => {
  button.addEventListener("click", () => {
    if (!whatsappConfigured()) {
      showToast("Configure o número do WhatsApp no script.js.");
      document.querySelector("#contato").scrollIntoView({ behavior: "smooth" });
      return;
    }

    const product = button.dataset.product;
    window.open(
      whatsappUrl(`Olá! Sou cliente da Dom das Docuras e gostaria de encomendar: ${product}.`),
      "_blank"
    );
  });
});

const form = document.getElementById("orderForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!whatsappConfigured()) {
    showToast("Configure o número do WhatsApp no script.js.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const product = document.getElementById("product").value;
  const message = document.getElementById("message").value.trim();

  const text =
`Olá, Brenda! Tudo bem?
Meu nome é ${name}.

Gostaria de fazer um orçamento para:
${product}

Detalhes:
${message}`;

  window.open(whatsappUrl(text), "_blank");
});

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.dataset.image;
    modalCaption.textContent = item.dataset.caption;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
