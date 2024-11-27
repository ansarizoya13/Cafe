//EVENTS
function btnAddToCart(foodId, foodName, foodImg, foodPrice) {

    //Cart Handler
    addOrUpdateCart(foodId, foodName, foodImg, foodPrice);

    //Update cart icon quantity
    updateCartQtyText();

    //Toastr
    showToastr();
}

function cartScreenLoad() {

    toggleDivVisibility();

    updateSummarySection();

    updateCartItemsList();

}




// METHODS
function addOrUpdateCart(foodId, foodName, foodImg, foodPrice) {

    const cart = localStorage.getItem('cart');

    if (cart == null) {

        //Foods array
        const foods = [
            {
                id: foodId,
                name: foodName,
                img: foodImg,
                price: foodPrice,
                quantity: 1
            }
        ]

        //Cart object
        const cartObj = {
            foods: foods,
            totalQuantity: 1,
            totalPrice: foodPrice
        }

        //Upload cart object to localStorage
        localStorage.setItem('cart', JSON.stringify(cartObj));
    }
    else {

        //Convert cart string  to JSON
        const cartJson = JSON.parse(cart);

        //Find the food by id
        const foundFood = cartJson.foods.find(food => food.id == foodId);

        //If food found
        if (foundFood != undefined) {
            foundFood.quantity += 1;
        }
        else {
            const foodObj = {
                id: foodId,
                name: foodName,
                img: foodImg,
                price: foodPrice,
                quantity: 1
            }

            //Add the found food to the foods array
            cartJson.foods.push(foodObj);
        }

        //Update totalQuantity and totalPrice
        cartJson.totalQuantity += 1;
        cartJson.totalPrice += foodPrice;

        //Upload the cart object back to local storage
        localStorage.setItem('cart', JSON.stringify(cartJson));
    }
}

function updateCartQtyText() {

    let cartTextTag = document.querySelector('#cart-counter');
    let count = 0;

    const cartJson = JSON.parse(localStorage.getItem('cart'))

    if (cartJson != undefined) {
        count = cartJson.totalQuantity;
    }

    cartTextTag.innerHTML = count;

}

function showToastr() {
    toastr.success('Added');
}

function toggleDivVisibility() {

    const cart = JSON.parse(localStorage.getItem('cart'));

    let emptyCartSection = document.querySelector('#emptyCartSection');
    let cartSection = document.querySelector('#cartSection');

    if (cart != undefined) {
        emptyCartSection.style.display = 'none';
    }
    else {
        cartSection.style.display = 'none'
    }
}

function updateSummarySection() {

    const cart = JSON.parse(localStorage.getItem('cart'));

    let totalQuantity = document.querySelector('#total-quantity')
    let subTotalPrice = document.querySelector('#sub-total-price')
    let totalPrice = document.querySelector('#total-price')
    let btnPay = document.querySelector('#pay');
    let totalPriceHidden = document.querySelector('#totalPrice')

    if (cart != undefined) {
        totalQuantity.innerHTML = cart.totalQuantity;
        subTotalPrice.innerHTML = totalPrice.innerHTML = '$' + cart.totalPrice.toFixed(2);
        btnPay.innerHTML = `Pay $${cart.totalPrice.toFixed(2)}`
        totalPriceHidden.value = cart.totalPrice.toFixed(2);
    }
}

function updateCartItemsList() {

    let itemList = document.querySelector('#item-list');
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart != undefined) {
        let items = cart.foods;

        items.forEach(item => {
            const itemHTML = `<div class="row mx-3 py-3 border-bottom">
                        <div class="d-flex align-items-center justify-content-between w-100">
                            <div class="d-flex align-items-center">
                                <div class="me-3">
                                    <img src="${item.img}"
                                         alt="${item.name}" height="90" width="90" class="rounded">
                                </div>
                                <div>
                                    <h4 class="mb-1">${item.name}</h4>
                                    <h5 class="mb-0 text-secondary">$${item.price} x ${item.quantity}</h5>
                                </div>
                            </div>
                            <div>
                                <h5 class="mb-0 text-secondary">$${(item.price * item.quantity).toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>`;

            itemList.innerHTML += itemHTML;
        })
    }

}