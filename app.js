
const bar = document.getElementById('bar');
const nav = document.getElementsByClassName('nav-ul')[0];
const close = document.getElementById('close');

if(bar){
    bar.addEventListener('click' , () =>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click' , () =>{
        nav.classList.remove('active')
    })
}

// Cart

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

// Making Function
// Remove Item from Cart
function ready(){
    var removeCartButton=document.getElementsByClassName('cart-remove');
    for(var i=0;i<removeCartButton.length;i++){
        var button = removeCartButton[i];  
        button.addEventListener('click',removeCartItem);
    }


    // Add to cart item
    var addCart = document.getElementsByClassName('add-cart');
    for( var i=0; i<addCart.length;i++){
        var button= addCart[i];
        button.addEventListener("click",addCartClicked);
    }
}

// this is an aproach where we check dom is loaded if yes so perform the event
// document.addEventListener('DOMContentLoaded', () => {
//     const addCartButtons = document.getElementsByClassName('add-cart');
//     for (let button of addCartButtons) {
//         button.addEventListener('click', addCartClicked);
//     }
// });

// Function to remove item


function removeCartItem(event){
   var buttonClicked = event.target
   buttonClicked.closest('tr').remove();
}


// Function to add item in cart
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.closest('.single-pro-details');

    if (!shopProduct) {
        console.error('Product details container not found.');
        return;
    }

    //In this we are searching under parent element
    var productSection = shopProduct.closest('#prodetails');
    var productImgElement = productSection.getElementsByClassName('mainImg')[0];
    var productImgSrc = productImgElement ? productImgElement.src : 'No Image';
    // one approach above 2nd approach below 
    // var productImgElement = document.getElementById('MainImg');
    // var productImgSrc = productImgElement ? productImgElement.src : 'No Image';
    var title = shopProduct.getElementsByClassName('ProductName')[0].innerText;
    var price = shopProduct.getElementsByClassName('ProductPrice')[0].innerText;
    
    //Funtion call 
    if(document.readyState=="loading"){
        document.addEventListener("DOMContentLoaded", function() {
          addProductToCart(title, price, productImgSrc);
        });
      } else {
        addProductToCart(title, price, productImgSrc);
      }
    
   
    // updateTotal();
}

// Another aproach of addProductToCart function 
// Approach when we dont need to create class dynamically
// function addProductToCart(title, price, productImgSrc) {
//     var cartTableBody = document.querySelector('#cart1 > tbody'); // here ">" indicate that tbody is not direct child of cart
//   if (!cartTableBody) {
//     console.error('Cart table body not found.');
//     return;
// }

//     var cartRows = cartTableBody.getElementsByTagName('tr');
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartItemImgSrc = cartRows[i].querySelector('.mainImage img')?.src;
//         if (cartItemImgSrc === productImgSrc) {
//             alert("You have already added this item in cart.");
//             return;
//         }
//     }



function addProductToCart(title, price, productImgSrc) {
   
    // This is an aproach use to create element dynamic and also apply classs or id
// this is used in such cases where the dom cant find the id or class
// 1. Check for existing cart table:
//     var cartShopRow = document.createElement('tr');
//     cartShopRow.classList.add('table-row');

//     var cartTable = document.getElementById('cart-table');
//     if (!cartTable) {
//     // Create cart table if it doesn't exist
//     cartTable = document.createElement('table');
//     cartTable.id = 'cart-table';
//     document.body.appendChild(cartTable);
//     }
//     console.log('---' ,cartTable);

//     // 2. Create cart table body consistently:
//     var cartTableBody = cartTable.querySelector('tbody cart-item');
//     if (!cartTableBody) {
//         // Create cart table if it doesn't exist
//     cartTableBody = document.createElement('tbody');
//     cartTableBody.className = 'cart-item';
//     cartTable.appendChild(cartTableBody);
//     }
//     console.log("CartTableBody" , cartTableBody);

//     // 3. Check for existing cart items before looping:
//     var cartRows = cartTableBody.getElementsByTagName('tr');
//     if(!cartRows || cartRows.length==0){
//         var cartRow=document.createElement('tr');
//         cartRow.className= 'table-row';

//         // Create image element with the product-image class
//         var imageCell = document.createElement('td');
//         var productImage = document.createElement('img');
//         productImage.className = 'product-image'; // Add the class here
//         productImage.src = productImgSrc;
//         imageCell.appendChild(productImage); //img appended in td
//         cartRow.appendChild(imageCell);     //td appended in tr

//         cartTableBody.appendChild(cartRow);  //tr appended in tbdoy
//        cartRows = [cartRow]; // Create a new array with the single row
//     }
//     console.log('cartRows-->', cartRows);
//     console.log('cartRow-->', cartRows[0]);

//     // 4. Check for duplicate product only if there are existing rows:
//     if (cartRows.length > 0) {
//         for (var i = 0; i < cartRows.length; i++) {
//                 var existingCartItemImg = cartRows[i].querySelector('.product-image'); // Use correct class
//                     if (existingCartItemImg) {
//                         var existingCartItemImgSrc = existingCartItemImg.src;
//                         if (existingCartItemImgSrc === productImgSrc) {
//                         alert("You have already added this item to the cart.");
//                         }
//                         return;
//                     } 
                      
//         }
//     }

// }

    var cartBox = document.getElementById("cart-table");
    var cartItems = document.getElementsByClassName('cart-item')[0];
    var cartItemNames = document.getElementById('ProductNamee');

     console.log("cartItemNames" , cartItemNames);
    // console.log("caritem" , cartItems);

    var cartRow = document.createElement('tr');
    cartRow.classList.add('table-row');
    cartRow.innerHTML = `
        <td><a class="cart-remove" href="#"><i class="fa-regular fa-circle-xmark"></i></a></td>
        <td><img class="product-image" src="${productImgSrc}" alt="product image"></td>
        <td class="ProductNamee">${title}</td>
        <td class="ProductPrices">${price}</td>
        <td class="cart-quantity"><input type="number" value="1"></td>
        <td>${price}</td>`;

        if (cartItems) {
            cartItems.appendChild(cartRow);
          } else {
            console.error("cartItems is undefined");
            // Handle the case where cartItems doesn't exist
          }
    cartRow.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    //updateTotal();
}


function quantityChanged(){}