const API_URL = "http://localhost:3000";

async function loadSweets() {
  const res = await fetch(`${API_URL}/sweets`);
  const sweets = await res.json();

  const list = document.getElementById("sweetList");
  list.innerHTML = "";

  sweets.forEach((sweet) => {
    const li = document.createElement("li");
    li.textContent = `${sweet.name} - ₹${sweet.price} (Qty: ${sweet.quantity})`;
    list.appendChild(li);
  });
}

async function addSweet() {
  const name = document.getElementById("name").value;
  const price = Number(document.getElementById("price").value);
  const quantity = Number(document.getElementById("quantity").value);

  await fetch(`${API_URL}/sweets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, quantity }),
  });

  loadSweets();
}

// page load pe data lao
loadSweets();