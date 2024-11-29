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
    localStorage.setItem('total_saved', total_price)
}


//function to load the current total from local-storage
function loadTotal(page) {
    let saved_total = localStorage.getItem('total_saved');
    document.getElementById(`total_${page}`).innerText = `Total is ${saved_total} kr`
}

//ButtonLogic 


//This function adds new CartItem in cart_list (with itemName)
function addItem(itemName, price, page) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToPrice(price, page);
    cart.push(itemName);

    localStorage.setItem('cart', JSON.stringify(cart));

    const cartList = document.getElementById("cart_list");
    const newListItem = document.createElement("li");
    newListItem.textContent = itemName;
    cartList.appendChild(newListItem);

}

// Removes one item from cart_list (with itemName)
function removeItem(itemName, price) {
    removeFromPrice(price);
    updatePrice();

    const cartList = document.getElementById("cart_list");
    const items = cartList.querySelectorAll("li");


    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent === itemName) {

            cartList.removeChild(items[i]);


            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            cart = cart.filter(item => item !== itemName);


            localStorage.setItem('cart', JSON.stringify(cart));


            break;
        }
    }
}


//This function tells you that you have paid, clears the list by ID: "cart_list".
function payItems() {
    alert("Tack för att du har handlat hos oss!");
    const cart_list = document.getElementById("cart_list");
    cart_list.innerHTML = "";
    localStorage.removeItem('cart')
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
        newListItem.textContent = item;
        cartList.appendChild(newListItem);
    });
}

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