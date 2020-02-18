// Declare strClickedImage variable as a global variable
var strClickedImage = "";
let quickAddForm = createQuickAddForm();

function createStoreItems(imgCard, description, size, message, address) {
    this.imgCard = imgCard;
    this.description = description;
    this.size = size;
    this.message = message;
    this.address = address;

}


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

// Function to dynamically display the items on the catalogue page using JQuery
// items generated from an array of JS objects 
function displayCatItems(arrCatalogItems) {
    // 
    let CatalogItemDiv = $("<div></div>");
    let quickButton = $("<button></button>").text("Add To Cart");
    quickButton.addClass("btnQuickAdd");
    quickButton.attr('onClick', 'quickAddClick()');

    $(CatalogItemDiv).addClass("row");

    let catRowElement = $("<div></div>");
    let catLinkElement = $("<a></a>");
    let catImageElement = $("<img>");
    let catDescriptionPar = $("<p></p>")

    let catQuickDiv = $("<div></div>");

    arrCatalogItems.forEach(function(currentCatalogItem, index) {

        catRowElement = "";
        catLinkElement = "";
        catImageElement = "";
        catQuickDiv = "";

        quickButton = "";

        quickButton = $("<button></button>").text("Add To Cart");
        quickButton.addClass("btnQuickAdd");
        quickButton.attr("value", index);
        quickButton.click(function() { quickAddClick(currentCatalogItem) });


        catRowElement = $("<div></div>");
        catRowElement.addClass("col-sm-3");

        catLinkElement = $("<a></a>");
        $(catLinkElement).attr("href", "ProductPage.html");
        $(catLinkElement).attr("target", "_blank");


        catImageElement = $("<img>");
        $(catImageElement).attr("src", currentCatalogItem.imgCard);

        $(catImageElement).attr("alt", currentCatalogItem.description);


        catImageElement.addClass('imgLink img-thumbnail imgcrop img-responsive thumbnail');
        $(catLinkElement).append(catImageElement);



        // catRowElement.append("<p></p>").text(currentCatalogItem.description);
        catQuickDiv = $("<div></div>");
        catQuickDiv.addClass("quickAdd");
        catQuickDiv.attr("value", currentCatalogItem);
        catDescriptionPar = $("<h2></h2>").text(currentCatalogItem.description);
       
        $(catRowElement).append(catLinkElement, catDescriptionPar, catQuickDiv, quickButton);

        $(CatalogItemDiv).append(catRowElement);

        $("#ProductCatalogue").append(CatalogItemDiv);
        

    });

} // end of displayCatItems



function createQuickAddForm() {
    let quickAddElement = $("<div></div>");
    let formElement = $("<form></form>");
    let labelElement = $("<label></label>");
    labelElement.addClass("radio-inline");
    let radElement = $("<input></input>");
    let arrSize = ['4" x 6"', '5" x 7"', '6" x 9"', '6" x 11"'];
    radElement.attr("type", "radio");
    radElement.attr("name", "optRadio");


    arrSize.forEach(function(currentSize) {
        labelElement = $("<label></label>");
        labelElement.addClass("quickLabel")
        radElement = $("<input></input>");
        radElement.attr("type", "radio");
        radElement.attr("name", "optRadio");
        labelElement.text(currentSize);
        labelElement.append(radElement);
        formElement.append(labelElement);

    });


    // let quickButton = $("<button></button>").text("Add To Cart");
    // quickButton.addClass("btnQuickAdd");
    // quickButton.attr('onClick','quickAddClick()');
    quickAddElement.append(formElement);
    // formElement.after(quickButton);


    return quickAddElement;
}

// function to create the checkout items objects
function createCheckoutItem(imageLink, size, message, address, price) {
    this.imageLink = imageLink;
    this.size = size;
    this.message = message;
    this.address = address;
    this.price = price;
};


function clearCart() {

    sessionStorage.clear();

    loadCart();
    location.reload();
    
}

function loadCart() {

    let cartTotal = 0;

    if (sessionStorage.getItem("cartItems") === null) {
        // if session Storage  is null - 
        $("#cartItems").append("<li> Cart is Empty. </li>");

    } else {
        let cartSize = $("<p></p>");
        let cartMsg = $("<p></p>");
        let cartAddr = $("<p></p>");
        let cartPrice = $("<p></p>");
        let cartListItem = $("<li></li>");



        let arrCartItems = JSON.parse(sessionStorage.getItem("cartItems"));

        arrCartItems.forEach(function(currentItem) {
            cartSize = "";
            cartMsg = "";
            cartAddr = "";
            cartPrice = "";
            cartListItem = "";


          

            cartImg = $("<img>");
            cartImg.attr("src", currentItem.imageLink);
            cartImg.addClass("cartImg");
            

            cartSize = $("<p></p>").text("Size : " + currentItem.size);
            cartMsg = $("<p></p>").text("Message :" + currentItem.message);
            cartAddr = $("<p></p>").text("Delivery Address: " + currentItem.address);
            cartPrice = $("<p></p>").text("Price : R " + currentItem.price);
            cartTotal += parseInt(currentItem.price);


            cartListItem = $("<li></li>");
            cartListItem.append(cartImg, cartSize, cartMsg, cartAddr, cartPrice);
           
            $("#cartItems").append(cartListItem);

            $("#exTotal").text(cartTotal);
            $("#vat").text((cartTotal * 0.15));
            $("#inclTotal").text(cartTotal * 1.15);

        });

    }

}

// Function to set the img source property of the product page image with the URL of the image clicked on the catalogue page
// url string saved to "LocalStorage" so that the data from one page can be used on the next page 
function LoadProduct() {

    $("#LinkedImage").attr("src", localStorage.getItem("Linke"));

};


function quickAddClick(currentItem) {
    // console.log((currentItem));


    let quickItem = new createCheckoutItem(currentItem.imgCard, '4" x 6"', "", "", 100)

    if (sessionStorage.getItem("cartItems") === null) {

        // if session Storage  is null - 
        let arrCartItems = [quickItem];
        let JSONCartItems = JSON.stringify(arrCartItems);
        sessionStorage.setItem("cartItems", JSONCartItems);
       

    } else {


        let arrCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        arrCartItems.push(quickItem);

        let JSONCartItems = JSON.stringify(arrCartItems);
        sessionStorage.setItem("cartItems", JSONCartItems);
        
    }


    loadCart();



}

// function runs on web page load 

$(document).ready(function() {




    displayCatItems(arrCatalogItems);

    $(".quickAdd").append(quickAddForm);

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
loadCart();

// var x = document.getElementById("myText").value;

function subClickFunction() {
    strClickedImage = document.getElementById("txtURL").value;
    alert("text");
};

$('#testimonialCarousel').carousel({
    interval: false
});