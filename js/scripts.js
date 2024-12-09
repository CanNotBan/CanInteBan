//pricing
let total_price = 0;

//function to add the price to the total, to be used when adding items to cart.
function addToPrice(price, page) {
    total_price = total_price + price;
    updatePrice(page);
    saveTotal();
}

//function that removes the price from total, to be used when removing items
function removeFromPrice(price, page) {
    total_price = total_price - price;
    updatePrice(page);
    saveTotal();
}

//function to dynamically update the price
function updatePrice(page) {
    document.getElementById(`total_${page}`).innerHTML = `total price is: ${total_price} kr`;
}

//function that saves the current total price to a localstorage-variable
function saveTotal() {
    localStorage.setItem('total_saved', total_price);
}

//function to load the current total from local-storage
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
        // Increment the quantity if the item exists
        existingItem.quantity += 1;
    } else {
        // Add a new item if it doesn't exist
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    
    addToPrice(price, page);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartList();
}

// Removes one item from cart_list (with itemName)
function removeItem(itemName, price, page) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        if (existingItem.quantity > 1) {
            // Decrease the quantity if more than 1
            existingItem.quantity -= 1;
        } else {
            // Remove the item completely if quantity is 1
            cart = cart.filter(item => item.name !== itemName);
        }
    }

    removeFromPrice(price, page);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartList();
}

// Render the cart list
function renderCartList() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById("cart_list");
    cartList.innerHTML = ""; // Clear the list before re-rendering

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

//This function tells you that you have paid, clears the list by ID: "cart_list".
function payItems() {
    showPopup();
    const cart_list = document.getElementById("cart_list");
    cart_list.innerHTML = "";
    localStorage.removeItem('cart');
    total_price = 0;
    saveTotal();
    start();
}

//This makes it possible for cartlist in checkout.html to find what we added in index.html through localstorage.
window.onload = function () {
    renderCartList();
};

//function that sets the cart-price with localstorage on the page that the user is on
function start() {
    try {
        loadTotal('index');
    } catch {
        loadTotal('checkout');
    }
}

//runs the start-function when page has finished loading
start();
