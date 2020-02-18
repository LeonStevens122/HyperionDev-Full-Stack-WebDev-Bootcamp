// Declare strClickedImage variable as a global variable
var strClickedImage = "";
let quickAddForm = createQuickAddForm();
//  function to create store items 
function createStoreItems(imgCard, description, size, message, address) {
    this.imgCard = imgCard;
    this.description = description;
    this.size = size;
    this.message = message;
    this.address = address;

}


// function to create the checkout items objects
function createCheckoutItem(imageLink, size, message, address, price) {
    this.imageLink = imageLink;
    this.size = size;
    this.message = message;
    this.address = address;
    this.price = price;
};

// generate objects tobe used as items displayed on the catalogue page
let catItem1 = new createStoreItems("https://cdn.pixabay.com/photo/2015/05/18/13/31/cape-town-772248_960_720.jpg", "Item 1", "", "", "");
let catItem2 = new createStoreItems("https://cdn.pixabay.com/photo/2017/10/13/14/25/cape-town-2847751_960_720.jpg", "Item 2", "", "", "");
let catItem3 = new createStoreItems("https://cdn.pixabay.com/photo/2015/10/20/09/57/south-africa-997540_960_720.jpg", "Item 3", "", "", "");
let catItem4 = new createStoreItems("https://cdn.pixabay.com/photo/2019/12/13/16/34/cape-town-4693402_960_720.jpg", "Item 4", "", "", "");
let catItem5 = new createStoreItems("https://cdn.pixabay.com/photo/2018/07/16/10/11/table-bay-harbour-3541607_960_720.jpg", "Item 5", "", "", "");
let catItem6 = new createStoreItems("https://cdn.pixabay.com/photo/2017/02/17/23/15/duiker-island-2076042_960_720.jpg", "Item 6", "", "", "");
let catItem7 = new createStoreItems("https://cdn.pixabay.com/photo/2019/04/25/02/48/africa-4153779_960_720.jpg", "Item 7", "", "", "");
let catItem8 = new createStoreItems("https://cdn.pixabay.com/photo/2016/02/24/03/06/helicopter-1218974_960_720.jpg", "Item 8", "", "", "");
let catItem9 = new createStoreItems("https://cdn.pixabay.com/photo/2015/06/07/18/56/table-mountain-800681_960_720.jpg", "Item 9", "", "", "");
let catItem10 = new createStoreItems("https://cdn.pixabay.com/photo/2016/08/02/09/46/cape-town-1562907_960_720.jpg", "Item 10", "", "", "");
let catItem11 = new createStoreItems("https://cdn.pixabay.com/photo/2017/05/12/00/22/muizenberg-2305734_960_720.jpg", "Item 11", "", "", "");
let catItem12 = new createStoreItems("https://cdn.pixabay.com/photo/2019/12/18/21/45/mercedes-4704948_960_720.jpg", "Item 12", "", "", "");

// save the catalogue items to an array to be iterated through
let arrCatalogItems = [
    catItem1,
    catItem2,
    catItem3,
    catItem4,
    catItem5,
    catItem6,
    catItem7,
    catItem8,
    catItem9,
    catItem10,
    catItem11,
    catItem12
];

//Apply Discount Coupon
function applyDiscount() {

    window.open('coupons.html');

}

// Function to dynamically display the items on the catalogue page using JQuery
// items generated from an array of JS objects 
function displayCatItems(arrCatalogItems) {
    // Create Catalogue elements
    let CatalogItemDiv = $("<div></div>");
    let quickButton = $("<button></button>").text("Add To Cart");
    quickButton.addClass("btnQuickAdd");
    quickButton.attr('onClick', 'quickAddClick()');

    $(CatalogItemDiv).addClass("row catalogitemDivCSS");

    let catRowElement = $("<div></div>");
    let catLinkElement = $("<a></a>");
    let catImageElement = $("<img>");
    let catDescriptionPar = $("<p></p>")

    let catQuickDiv = $("<div></div>");

    // loop through Array of Catalogue Item objects and display them on the Catalogue page
    arrCatalogItems.forEach(function(currentCatalogItem, index) {
        // clear values of elements to force JS to append new values 
        catRowElement = "";
        catLinkElement = "";
        catImageElement = "";
        catQuickDiv = "";
        quickButton = "";

        // Create QuickAdd Button with current Item object as function argument
        quickButton = $("<button></button>").text("Add To Cart");
        quickButton.addClass("btnQuickAdd btn btn-primary btn-block");
        quickButton.attr("value", index);
        quickButton.click(function() { quickAddClick(currentCatalogItem) });

        // create Row Div with Bootstrap Grid 
        catRowElement = $("<div></div>");
        catRowElement.addClass("col-sm-3");
        // create link element 
        catLinkElement = $("<a></a>");
        $(catLinkElement).attr("href", "ProductPage.html");
        $(catLinkElement).attr("target", "_blank");

        //create image element to append to link
        catImageElement = $("<img>");
        $(catImageElement).attr("src", currentCatalogItem.imgCard);
        $(catImageElement).attr("alt", currentCatalogItem.description);
        catImageElement.addClass('imgLink img-thumbnail imgcrop img-responsive thumbnail catImg');
        $(catLinkElement).append(catImageElement);



        // Create Quickadd Div
        catQuickDiv = $("<div></div>");
        catQuickDiv.addClass("quickAdd container-fluid");
        catQuickDiv.attr("value", currentCatalogItem);
        catDescriptionPar = $("<h2></h2>").text(currentCatalogItem.description);

        $(catRowElement).append(catLinkElement, catDescriptionPar, catQuickDiv, quickButton);

        $(CatalogItemDiv).append(catRowElement);

        // append item element to catalogue page

        $("#ProductCatalogue").append(CatalogItemDiv);


    });

} // end of displayCatItems


// function creates quickadd form and returns it  to append to the catalogue items
function createQuickAddForm() {

    let quickAddElement = $("<span></span>");
    quickAddElement.addClass("container-fluid quickSpan")
    let formElement = $("<form></form>");
    formElement.attr("name", "quickRadio");
    let labelElement = $("<label></label>");
    labelElement.addClass("radio-inline");

    quickAddElement.append(formElement);

    return quickAddElement;
}


// clear shopping cart
function clearCart() {
    // clear session storage 
    sessionStorage.clear();
    // update the totals on all pages
    updateTotals();

    // reload the cart page
    location.reload();

}


// load items into shopping cart from session storage
function loadCart(delAmount = 0) {
    // create Trash icon to remove items from cart
    let trashList = $("<li></li>");
    trashList.addClass("icon-list")
    let trashIcon = $("<i></i>")
    trashIcon.addClass("fa fa-fw fa-trash ");
    trashIcon.attr('id', 'trashIcon');
    trashList.append(trashIcon);
    // set total to 0
    let cartTotal = 0;
    // check if session storage cartItems is empty
    if (sessionStorage.getItem("cartItems") === null) {
        // if session Storage  is empty show on page
        $("#cartItems").append("<li> Cart is Empty. </li>");

    } else { // create cart Item Elements
        let cartSize = $("<p></p>");
        let cartMsg = $("<p></p>");
        let cartAddr = $("<p></p>");
        let cartPrice = $("<p></p>");
        let cartListItem = $("<li></li>");

        let totalIncluding = 0;
        trashList = $("<li></li>");
        trashList.addClass("icon-list")
        trashIcon = $("<i></i>")
        trashIcon.addClass("fa fa-fw fa-trash trashIcon");

        trashList.append(trashIcon);
        let discountAmount = 0;


        // create cartItems Array from Session Storage 
        let arrCartItems = JSON.parse(sessionStorage.getItem("cartItems"));

        // Loop through cartItems and display each on the Cart Page
        arrCartItems.forEach(function(currentItem, index) {

            // setvariables to  empty strings to force JS to update the values before appending them to the element
            cartSize = "";
            cartMsg = "";
            cartAddr = "";
            cartPrice = "";
            cartListItem = "";
            trashList = "";
            trashIcon = "";
            // create image element 
            cartImg = $("<img>");
            cartImg.attr("src", currentItem.imageLink);
            cartImg.addClass("cartImg col-sm-3 ");
            // create size element
            cartSize = $("<p></p>").text("Size : " + currentItem.size);
            // create message element
            cartMsg = $("<p></p>").text("Message :" + currentItem.message);
            cartAddr = $("<p></p>").text("Delivery Address: " + currentItem.address);
            cartPrice = $("<p></p>").text("Price : R " + currentItem.price);
            // running total is calculated based on addin all the elements from the cartItems Array
            cartTotal += parseInt(currentItem.price);

            // create trash Icon to be clicked to remove items from cart
            trashList = $("<li></li>");
            trashList.addClass("icon-list")
            trashIcon = $("<i></i>")
            trashIcon.addClass("fa fa-fw fa-trash trashIcon");
            trashIcon.attr("value", index)

            trashList.append(trashIcon);

            // create cartList Element
            cartListItem = $("<li></li>");


            // add classes 
            cartListItem.addClass("cartListCSS row container-fluid");
            // append created elements to the CartList Item
            cartListItem.append(cartImg, cartSize, cartMsg, cartAddr, cartPrice, trashList);
            // append the created item to the CartItems UL on the Cart Page
            $("#cartItems").append(cartListItem);



            // update totals on all pages
            updateTotals();

        });

    }
    // read discount from session storage if found
    if ((sessionStorage.getItem("discountAmount")) === null) {
        discountAmount = 0;

    } else {
        discountAmount = parseInt((sessionStorage.getItem("discountAmount")));

    }
    // create variable to be used to alert the user to the total anount in the Cart
    let orderTotal = ((cartTotal - (discountAmount) + delAmount) * 1.15);
    alert("Total of Items in Cart is : R " + orderTotal.toFixed(2));
    sessionStorage.setItem("cartTotal", cartTotal);
    updateTotals();
}

// Function to set the img source property of the product page image with the URL of the image clicked on the catalogue page
// url string saved to "LocalStorage" so that the data from one page can be used on the next page 
function LoadProduct() {

    $("#LinkedImage").attr("src", localStorage.getItem("Linke"));

};

// function to update totals at bottom of page
function updateTotals(delAmount = 0) {
    let cartTotal = 0;
    let discountAmount = 0;
    // check session storage for values and read if they exist
    if ((sessionStorage.getItem("discountAmount")) === null) {
        discountAmount = 0;

    } else {
        discountAmount = parseInt((sessionStorage.getItem("discountAmount")));

    }

    if ((sessionStorage.getItem("cartTotal")) === null) {
        cartTotal = 0;

    } else {
        cartTotal = parseInt(sessionStorage.getItem("cartTotal"));

    }



    // change text of Elements with the selected IDs 
    $("#exTotal").text("R " + (cartTotal).toFixed(2));
    $("#discountTotal").text("R " + (parseInt(discountAmount)).toFixed(2));
    $("#afterDiscountAmount").text("R " + (cartTotal - (discountAmount)).toFixed(2));
    $('#addDeliveryAmount').text("R " + delAmount);
    $("#vat").text("R " + (((cartTotal - (discountAmount)) + delAmount) * 0.15).toFixed(2));
    $("#inclTotal").text("R " + ((cartTotal - (discountAmount) + delAmount) * 1.15).toFixed(2));



}


// fucntion adds item to Cart on click of QuickAdd Button
function quickAddClick(currentItem) {


    // create checkout Item based on clicked button argument
    let quickItem = new createCheckoutItem(currentItem.imgCard, '4" x 6"', "", "", 100);
    // if cart Session Storage is empty create cart array and save to session storage
    if (sessionStorage.getItem("cartItems") === null) {

        // if session Storage  is null - 
        let arrCartItems = [quickItem];
        let JSONCartItems = JSON.stringify(arrCartItems);
        sessionStorage.setItem("cartItems", JSONCartItems);


    } else { // if Shopping Cart session storage is not empty 
        // load array of cart items from session storage and adds the selected item to the array
        // before saving the array to session storage

        let arrCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        arrCartItems.push(quickItem);

        let JSONCartItems = JSON.stringify(arrCartItems);
        sessionStorage.setItem("cartItems", JSONCartItems);

    }

    // run loadcart function to populate the shopping cart page
    loadCart();

}



// function to remove item from cart
function removeItem(event) {


    // set variable to the CartList Item Element that called the function using parents
    let delListItem = $(this).parent().parent();
    // get index of the element to be removed from the Cart from the Value property of the calling element
    let indexToRemove = parseInt($(this).attr("value"));

    // get CartITems Array from session storage using JSON 

    let arrCartItems = JSON.parse(sessionStorage.getItem("cartItems"));

    // USe Splice to remove the item clicked using the index
    arrCartItems.splice(indexToRemove);

    // save cartItems array to Session Storage using JSON
    let JSONCartItems = JSON.stringify(arrCartItems);

    sessionStorage.setItem("cartItems", JSONCartItems);
    // use animation to remove the item from the DOM visually
    delListItem.slideUp(1500);


    // update totals
    updateTotals();



}

// function to apply discounts from the coupons page
function applyDiscounts() {

    // get discount amount based on selected radio button
    let onlDiscount = parseInt($("input[name='onlineDiscount']:checked").val());
    // get total amount before tax from session storage
    let preDiscountAmount = parseInt(sessionStorage.getItem("cartTotal"));
    // calculate discount ammount
    let discountAmount = (preDiscountAmount * ((onlDiscount) / 100));
    // save discount amount to session storage
    sessionStorage.setItem("discountAmount", discountAmount);

    //update totals

    updateTotals();




}

// function runs on web page load 

$(document).ready(function() {

    // function call to apply coupondiscounts on change of coupon form
    $(".frmCoupon").change(applyDiscounts);

    // function call to run on selection of one of the Delivery options on the checkout page
    $("#deliveryOptions").change(selectDelivery);




    // display Catalogue items based o hardcoded array of catalogue objects
    displayCatItems(arrCatalogItems);

    // append quickadd forms to all elements with quickAdd class
    $(".quickAdd").append(quickAddForm);

    // run remove item function on click of the trash icon
    $(".trashIcon").click(removeItem);



    // save string from URL Submit to localstorage to display selected image on the product page
    // 
    $("#URLSubmit").click(function() {
        strClickedImage = document.getElementById("txtURL").value;
        localStorage.setItem("Linke", strClickedImage);

        window.open("ProductPage.html", "_blank");
    });

    //jquery  function saves the src attribute of the clicked image link
    $(".imgLink").click(function() {


        // save src attribute to strClickedImage variable 
        strClickedImage = $(this).attr("src");

        // saves the string variable to the local storage so that it can be used after a new page is opened
        localStorage.setItem("Linke", strClickedImage);

    });

});


// hide delivery selection elements on checkout page
function hideElements() {
    $("#collectDiv").show();
    $("#mailAddressDiv").hide();
    $("#courierDiv").hide();

}


// function shows / hides forms as per user selection of radio buttons on checkout page
function selectDelivery() {

    // get selected value from checkout page
    let deliveryOption = $("input[name='radDelivery']:checked").val();
    // show different forms based on user selected radio button
    switch (deliveryOption) {
        case ("Courier"):

            $("#collectDiv").slideUp(1500);
            $("#mailAddressDiv").slideUp(1500);
            $("#courierDiv").slideDown(1500);
            updateTotals(150);
            break;

        case ("Mail"):

            $("#collectDiv").slideUp(1500);
            $("#mailAddressDiv").slideDown(1500);
            $("#courierDiv").slideUp(1500);
            updateTotals(0);
            break;

        case ("Collect"):

            $("#collectDiv").slideDown(1500);
            $("#mailAddressDiv").slideUp(1500);
            $("#courierDiv").slideUp(1500);
            updateTotals(0);

            break;
        default:

            updateTotals(0);
            break;
    }




}

// function runs on click of confirm order button
function confirmOrder() {


    // Generate "Mostly" Unique order numnber using date 
    var uniqueOrderNumber = new Date().valueOf();

    // set ordertotal to 0
    let orderTotal = 0;



    console.log(uniqueOrderNumber);
    // create new Map object to save unique order number : order details pairs
    let ordersMap = new Map();

    // Alert to give the order number to the user
    alert("Your Order Number is : " + uniqueOrderNumber);
    // check if there are any items saved in the CartItems session storage
    if (sessionStorage.getItem("cartItems") === null) {

        alert("No Items on Order ");


    } else { // if Shopping Cart session storage is not empty 
        // retrieve the cartItems from Session Storage
        // and save the CartItems and the Unique order number to a map , and save the map to localstorage 

        let arrCartItems = JSON.parse(sessionStorage.getItem("cartItems"));


        ordersMap.set(uniqueOrderNumber, arrCartItems);

        let JSONorder = JSON.stringify(ordersMap);


        localStorage.setItem("savedOrders", JSONorder);

        // update the totals
        updateTotals();
        // order is complete - so cart is cleared
        clearCart()

    }





}

function checkout() {

    // open the checkout page
    window.open("Checkout.html", "_blank");
    // update the cart & totals 
    loadCart();

    updateTotals();

}

// open product page and save URL of selected item to variable

function subClickFunction() {
    strClickedImage = document.getElementById("txtURL").value;
    window.open("ProductPage.html", "_blank");

};
// animation for the testimonial carousel
$('#testimonialCarousel').carousel({
    interval: false
});

// adds checkout item to cart from product page
function addCartItem() {
    // create elements as variables
    let cartItemImg = document.getElementById("LinkedImage").src;
    let cartItemSize = $("input[name='optradio']:checked").val();
    let cartItemMessage = document.getElementById("message").value;
    let cartItemAddress = document.getElementById("address").value;
    let cartItemPrice = 0;

    // set price and size based on used selection on radio input form
    switch ($("input[name='optradio']:checked").val()) {
        case "option1":
            cartItemPrice = 100;
            cartItemSize = '4" x 6"';
            break;
        case "option2":
            cartItemPrice = 150;
            cartItemSize = '5" x 7"';
            break;
        case "option3":
            cartItemPrice = 200;
            cartItemSize = '6" x 9"';
            break;
        case "option4":
            cartItemPrice = 300;
            cartItemSize = '6" x 11"';
            break;
        default:
            cartItemPrice = 100;
            cartItemSize = '4" x 6"';
    }
    // create checkout Item based on clicked button argument

    let CartItem = new createCheckoutItem(cartItemImg, cartItemSize, cartItemMessage, cartItemAddress, cartItemPrice);


    // if cart Session Storage is empty create cart array and save to session storage
    if (sessionStorage.getItem("cartItems") === null) {
        // alert(" Write to session");
        // if session Storage  is null - 
        let arrCartItems = [CartItem];
        let JSONCartItems = JSON.stringify(arrCartItems);
        sessionStorage.setItem("cartItems", JSONCartItems);


    } else { // if Shopping Cart session storage is not empty 
        // load array of cart items from session storage and adds the selected item to the array
        // before saving the array to session storage

        let arrCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        arrCartItems.push(CartItem);

        let JSONCartItems = JSON.stringify(arrCartItems);
        sessionStorage.setItem("cartItems", JSONCartItems);

    }

    // run loadcart function to populate the shopping cart page
    loadCart();

};