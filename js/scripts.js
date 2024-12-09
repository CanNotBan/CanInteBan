//pricing
let total_price = 0;

function addToPrice(price, page) {
    total_price = total_price + price;
    updatePrice(page);
    saveTotal();
}

function removeFromPrice(price, page) {
    total_price = total_price - price;
    updatePrice(page);
    saveTotal();
}

function updatePrice(page) {
    document.getElementById(`total_${page}`).innerHTML = `total price is: ${total_price} kr`;
}

//function that saves the current total price to a localstorage-variable
function saveTotal() {
    localStorage.setItem('total_saved', total_price);
}

function loadTotal(page) {
    let saved_total = localStorage.getItem('total_saved');

    total_price = saved_total ? parseInt(saved_total) : 0;
    document.getElementById(`total_${page}`).innerText = `Total is ${total_price} kr`;
}

//ButtonLogic
function addItem(itemName, price, page) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    
    addToPrice(price, page);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartList();
}

function removeItem(itemName, price, page) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
           
        } else {
            cart = cart.filter(item => item.name !== itemName);
          
        }

          removeFromPrice(price, page);
    localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    renderCartList();
}

function renderCartList() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById("cart_list");
    cartList.innerHTML = ""; 

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Din kundkorg är tom.";
        emptyMessage.style.textAlign = "center";
        emptyMessage.style.color = "#888";
        emptyMessage.style.fontStyle = "italic";
        cartList.appendChild(emptyMessage);
        return; 
    }

    cart.forEach(item => {
        const newListItem = document.createElement("li");
        const itemText = document.createTextNode(`${item.name} - ${item.quantity}`);
        
        // - button
        const removeButton = document.createElement("button");
        removeButton.textContent = "-";
        removeButton.style.marginLeft = "10px";
        removeButton.style.backgroundColor = "red";
        removeButton.style.color = "white";
        removeButton.style.border = "none";
        removeButton.style.borderRadius = "5px";
        removeButton.style.padding = "2px 5px";
        removeButton.style.width = "20px";
        removeButton.style.height = "20px";

        removeButton.addEventListener("click", () => {
            removeItem(item.name, item.price, 'checkout');
        });

        // + button
        const addButton = document.createElement("button");
        addButton.textContent = "+";
        addButton.style.marginLeft = "10px";
        addButton.style.backgroundColor = "green";
        addButton.style.color = "white";
        addButton.style.border = "none";
        addButton.style.borderRadius = "5px";
        addButton.style.padding = "2px 5px";
        addButton.style.width = "20px";
        addButton.style.height = "20px";

        addButton.addEventListener("click", () => {
            addItem(item.name, item.price, 'checkout');
        });

        newListItem.appendChild(itemText);
        newListItem.appendChild(removeButton);
        newListItem.appendChild(addButton);

        cartList.appendChild(newListItem);
    });
}

function showPopup() {
    const payPopup = document.getElementById('payed-popup');
    payPopup.style.display = 'block';
    setTimeout(() => {
        payPopup.style.display = 'none';
        window.location.href = "../index.html";
    }, 3000);
}

function payItems() {
    showPopup();
    const cart_list = document.getElementById("cart_list");
    cart_list.innerHTML = "";
    localStorage.removeItem('cart');
    total_price = 0;
    saveTotal();
    start();
}

window.onload = function () {
    renderCartList();
};

function start() {
    try {
        loadTotal('index');
    } catch {
        loadTotal('checkout');
    }
}

function displaySidebar(){
    const sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.add("move-left");
    sidebar.style.display = "flex";
    setTimeout(function () {
        sidebar.style.left = "calc(100vw - 430px)";
        sidebar.classList.remove("move-left");
    },1000);
}

function hideSidebar(){
    const sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.add("move-right");
    setTimeout(function () {
        sidebar.style.left = "100vw";
        sidebar.classList.remove("move-right");
        sidebar.style.display = "none";
    },1000);
    
}

//runs the start-function when page has finished loading
start();
