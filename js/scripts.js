//pricing
let total_price = 0;

function addToPrice(price) {
    total_price = total_price + price;
    updatePrice();
}

function removeFromPrice(price) {
    total_price = total_price - price;
    updatePrice();
}

function updatePrice() {
    document.getElementById("total").innerHTML = `total price is: ${total_price} kr`;
}

//ButtonLogic 


//This function adds new CartItem in cart_list (with itemName)
function addItem(itemName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToPrice(price);
    updatePrice(price);
    console.log(price);
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
