



//ButtonLogic -

//When button + is pushed - the product should be added to cart list. 

//This function adds new listItem
function addItem(itemName) {
    const items_list = document.getElementById("items_list");
    const newListItem = document.createElement("li");
    newListItem.textContent = itemName;
    items_list.appendChild(newListItem);
}
//When button CART is pushed - You should go to checkout

function goToCheckout (){}

//When button TA BORT is pushed - You will remove one item

function removeItem (){
   
    
}

//When button LÄGG TILL is pushed - You will add one of the same item 

//function addItem(){} //Could this work as the first one?


// When button Swish is pushed - You will get something that says "You have paid" and then removes everything from cart and goes to first page. 
//This function clears the list by ID: "items_list".
function payItems(){
    alert ("Tack för att du har handlat hos oss!");
    const items_list = document.getElementById("items_list");
    items_list.innerHTML= "";
}


//Might need a button GÅ TILLBAKA - to go from checkout to mainpage.

function goToMainpage (){}