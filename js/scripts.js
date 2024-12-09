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

//funtion that saves the current total price to a localstorage-variable
function saveTotal() {
    localStorage.setItem('total_saved', total_price);
}


//function to load the current total from local-storage
function loadTotal(page) {
    let saved_total = localStorage.getItem('total_saved');

    total_price = saved_total ?  parseInt(saved_total): 0;
    document.getElementById(`total_${page}`).innerText = `Total is ${total_price} kr`;
}

//ButtonLogic 


function addItem(itemName, price, page) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    addToPrice(price, page);
    cart.push({ name: itemName, price: price }); 
    
    localStorage.setItem('cart', JSON.stringify(cart));

    const cartList = document.getElementById("cart_list");
    const newListItem = document.createElement("li");

    const itemText = document.createTextNode(`${itemName} - ${price} kr`);

    // X button
    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.style.marginLeft = "10px";
    removeButton.style.backgroundColor = "transparent";
    removeButton.style.color = "black";
    removeButton.style.border = "none";
    removeButton.style.borderRadius = "5px";
    removeButton.style.cursor = "pointer";

    removeButton.addEventListener("click", () => {
        removeItem(itemName, price, 'checkout'); 
    });

    newListItem.appendChild(itemText);
    newListItem.appendChild(removeButton);

    cartList.appendChild(newListItem);
}

// Removes one item from cart_list (with itemName)
function removeItem(itemName, price, page) {
    removeFromPrice(price, page);

    const cartList = document.getElementById("cart_list");
    const items = cartList.querySelectorAll("li");

    for (let i = 0; i < items.length; i++) {
        if (items[i].firstChild.textContent.includes(`${itemName} - ${price} kr`)) {
            cartList.removeChild(items[i]);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Remove the correct item from the cart array
            const itemIndex = cart.findIndex(item => item.name === itemName && item.price == price);
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            break;
        }
    }
}

function showPopup () {
    const payPopup = document.getElementById ('payed-popup');
    payPopup.style.display = 'block';
    setTimeout(() => { 
        payPopup.style.display ='none';
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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById("cart_list");

    cart.forEach(item => {
        const newListItem = document.createElement("li");

        const itemText = document.createTextNode(`${item.name} - ${item.price} kr`);

        // X button
        const removeButton = document.createElement("button");
        removeButton.textContent = "x";
        removeButton.style.marginLeft = "10px";
        removeButton.style.backgroundColor = "transparent";
        removeButton.style.color = "black";
        removeButton.style.border = "none";
        removeButton.style.borderRadius = "5px";
        removeButton.style.cursor = "pointer";

        removeButton.addEventListener("click", () => {
            removeItem(item.name, item.price, 'checkout'); 
        });

        newListItem.appendChild(itemText);
        newListItem.appendChild(removeButton);

        cartList.appendChild(newListItem);

    });
};

//function that sets the cart-price with localstorage on the page that the user is on
function start() {
    try {
        loadTotal('index');
    }
    catch{
        loadTotal('checkout');
    }
}

//runs the start-function when page has finished loading
start();

function displaySidebar(){
    const sidebar = document.getElementsByClassName("sidebar")[0]
    sidebar.classList.add("move-left")
    sidebar.style.display = "flex";
    setTimeout(function () {
        sidebar.style.left = "calc(100vw - 430px)";
        sidebar.classList.remove("move-left")
    },1000);
}

function hideSidebar(){
    const sidebar = document.getElementsByClassName("sidebar")[0]
    sidebar.classList.add("move-right")
    setTimeout(function () {
    sidebar.style.left = "100vw";
    sidebar.classList.remove("move-right")
    sidebar.style.display = "none";
    },1000);

}