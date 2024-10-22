// Cart

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var addCartButtons = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener('click', addCartClicked);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.closest('tr').remove();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.closest('.single-pro-details');

    if (!shopProduct) {
        console.error('Product details container not found.');
        return;
    }

    var productSection = shopProduct.closest('#prodetails');
    var productImgElement = productSection.querySelector('.mainImg');
    var productImgSrc = productImgElement ? productImgElement.src : 'No Image';
    var title = shopProduct.querySelector('.ProductName').innerText;
    var price = shopProduct.querySelector('.ProductPrice').innerText;

    addProductToCart(title, price, productImgSrc);
}

function addProductToCart(title, price, productImgSrc) {
    var cartTableBody = document.querySelector('.cart-item');

    if (!cartTableBody) {
        console.error('Cart table body not found.');
        return;
    }

    // Check if the product already exists in the cart
    var existingCartItems = cartTableBody.getElementsByClassName('ProductNamee');
    for (var i = 0; i < existingCartItems.length; i++) {
        if (existingCartItems[i].innerText === title) {
            alert("You have already added this item to the cart.");
            return;
        }
    }

    var cartRow = document.createElement('tr');
    cartRow.classList.add('table-row');
    cartRow.innerHTML = `
        <td><a class="cart-remove" href="#"><i class="fa-regular fa-circle-xmark"></i></a></td>
        <td><img class="product-image" src="${productImgSrc}" alt="product image"></td>
        <td class="ProductNamee">${title}</td>
        <td class="ProductPrices">${price}</td>
        <td class="cart-quantity"><input type="number" value="1"></td>
        <td>${price}</td>`;

    cartTableBody.appendChild(cartRow);

    cartRow.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity input').addEventListener('change', quantityChanged);
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    // Optionally, update the total here
}
