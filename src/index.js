
var q = 1;
var countVal = sessionStorage.getItem('count') || 0;

var items = JSON.parse(sessionStorage.getItem("items")) || [
  { pro: "Soap", price: 9.99, qty: 0, sel: 0 },
  { pro: "Towel", price: 14.99, qty: 0, sel: 0 },
  { pro: "Rug", price: 38.99, qty: 0, sel: 0 },
  { pro: "Table", price: 54.99, qty: 0, sel: 0 },
  { pro: "Tissues", price: 5.99, qty: 0, sel: 0 }
];

//incrementing the count of product on button click
if (location.pathname === '/index.html' || location.pathname === '/')
  for (var j = 0; j < items.length; j++) {
    var bu = document.getElementById("mybutton" + j);
    bu.onclick = function incrementcount() {
      for (var k = 0; k < items.length; k++) {
        if (this.id === "mybutton" + k) {
          items[k].qty++;
          items[k].sel = 1;
          ++countVal
          sessionStorage.setItem("count", countVal);
        }
      }
      //update cart/checkout value as items are added to cart 
      document.getElementById("cartbutton").innerHTML =
        "<a>Cart/Checkout: " + countVal + " items </a>"
      sessionStorage.setItem("items", JSON.stringify(items));
      sessionStorage.setItem("count", countVal);
    };
  }

//set cart value on all pages
document.getElementById("cartbutton").innerHTML =
  "<a>Cart/Checkout: " + countVal + " items </a>"


//If cart is empty on click, alert user
var carbu = document.getElementById("cartbutton");
carbu.onclick = function nextpage() {
  if (countVal === 0) {
    alert("You haven't selected any item");
  } else {
    window.location = "cart.html";
  }
};

if (location.pathname === '/cart.html') {
  //Read in items form localStorage and build a table with values
  var m = 0;
  var Total = 0;
  var total = 0;
  var item = JSON.parse(sessionStorage.getItem("items"));
  var flag = 0;

  //displaying the list of products purchased
  document.getElementById("cartTable").innerHTML +=
    "<tr><th>Product</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>";
  for (m in item) {
    if (item[m].sel === 1) {
      total = item[m].qty * item[m].price;
      document.getElementById("cartTable").innerHTML +=
        "<tr class='cartProduct'><td>" +
        item[m].pro +
        "</td><td>" +
        item[m].qty +
        "</td><td>" +
        item[m].price +
        "</td><td>" +
        total +
        "</td></tr>";
      Total = Total + total;
    }
  }

  document.getElementById("cartTable").innerHTML +=
    "<tr><td>Total</td><td></td><td></td><td><b class='total'>" + Total.toFixed(2); + "</b></td></tr>";
}

if (location.pathname !== '/index.html'
  && location.pathname !== '/cart.html'
  && location.pathname !== '/contact-us.html'
  && location.pathname !== '/contact-thank-you.html' 
  && location.pathname !== '/' ) {
  //on product detail pages, update when add to cart button is clicked. increment sessionstorage, etc. 
  var bu = document.querySelector('.add-to-cart')
  bu.onclick = function incrementcount() {
    var product = document.querySelector('.product-name').innerText;
    for (var k = 0; k < items.length; k++) {
      if (items[k].pro === product) {
        items[k].qty++;
        items[k].sel = 1;
        ++countVal
        sessionStorage.setItem("count", countVal);
      }
    }

    //update cart/checkout value as items are added to cart 
    document.getElementById("cartbutton").innerHTML =
      "<a>Cart/Checkout: " + countVal + " items </a>"
    sessionStorage.setItem("items", JSON.stringify(items));
    sessionStorage.setItem("count", countVal);
  };
}
