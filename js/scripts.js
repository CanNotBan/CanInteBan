//ButtonLogic 


//This function adds new CartItem in cart_list (with itemName)
function addItem(itemName) {
    const cartList = document.getElementById("cart_list");
    const newListItem = document.createElement("li");
    newListItem.textContent = itemName;
    cartList.appendChild(newListItem);
}

// Removes one item from cart_list (with itemName)
function removeItem (itemName){
    const cartList = document.getElementById("cart_list");
    const items = cartList.querySelectorAll ("li");

    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent == itemName) {
            cartList.removeChild(items[i]);            
        }     
        break;   
    }    
    
}


//This function tells you that you have paid, clears the list by ID: "cart_list".
function payItems(){
    alert ("Tack för att du har handlat hos oss!");
    const cart_list = document.getElementById("cart_list");
    cart_list.innerHTML= "";
}


