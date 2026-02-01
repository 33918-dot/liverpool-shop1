let cart = [];
let total = 0;

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalPrice = document.getElementById("total-price");
  const cartText = document.getElementById("cart");

  if (!cartList || !totalPrice || !cartText) return;

  cartList.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} ฿ 
      <button onclick="removeItem(${index})">ลบ</button>
    `;
    cartList.appendChild(li);
  });

  totalPrice.innerText = "ราคารวม: " + total + " ฿";
  cartText.innerText = "ตะกร้า: " + cart.length + " ชิ้น";
}

function addToCart(name, price, type = "") {
  cart.push({ name, price, type });
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}


function login() {
  const user = document.getElementById("username")?.value;
  const pass = document.getElementById("password")?.value;

  const demoUser = "admin";
  const demoPass = "1234";

  if (user === demoUser && pass === demoPass) {
    localStorage.setItem("isLogin", "true");
    window.location.href = "index.html";
  } else {
    const msg = document.getElementById("login-msg");
    if (msg) msg.innerText = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
}

function logout() {
  localStorage.removeItem("isLogin");
  window.location.href = "login.html";
}


let lastScroll = 0;

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (!header) return;

  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    header.style.top = "-120px"; 
  } else {
    header.style.top = "0"; 
  }

  lastScroll = currentScroll;
});


let shirtSelected = false;
let freebieClaimed = false;

function selectShirt() {
  if (freebieClaimed) {
    alert("คุณใช้สิทธิ์โปรโมชั่นไปแล้ว (1 คน 1 สิทธิ์)");
    return;
  }

  shirtSelected = true;

  const status = document.getElementById("promo-status");
  if (status) {
    status.innerText =
      "เลือกเสื้อเรียบร้อยแล้ว 🎉 ตอนนี้สามารถเลือกของแถมได้ 1 ชิ้น";
  }
}

function selectFreebie(type) {
  if (!shirtSelected) {
    alert("ต้องเลือกซื้อเสื้อก่อน ถึงจะรับของแถมได้!");
    return;
  }

  if (freebieClaimed) {
    alert("คุณใช้สิทธิ์รับของแถมไปแล้ว (1 คน 1 สิทธิ์)");
    return;
  }

  let freebieName = "";
  if (type === "scarf") freebieName = "ผ้าพันคอ Liverpool";
  if (type === "cup") freebieName = "แก้วน้ำ Liverpool";

  freebieClaimed = true;

  const status = document.getElementById("promo-status");
  if (status) {
    status.innerText =
      "คุณได้รับของแถม: " + freebieName + " (ใช้สิทธิ์ครบแล้ว)";
  }

  alert("รับของแถมสำเร็จ: " + freebieName);
}
function searchProduct() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.getElementsByClassName("product-card");

  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

    if (title.indexOf(input) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}