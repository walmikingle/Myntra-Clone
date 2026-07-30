console.log('bag.js');
const convenience_fees = 99;
let bagItemObjects = [];

loadPage();

function loadPage() {
    loadBagItemsObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryEle = document.querySelector('.bag-summary');
  let totalItems = bagItemObjects.length;
  let totalMrp = 0;
  let totalDiscount = 0;
 

  bagItemObjects.forEach(bagItem => {
    totalMrp += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
   
  })
   let finalPayment = totalMrp - totalDiscount + convenience_fees;
  bagSummaryEle.innerHTML=`
<div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalItems}) </div>
          <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">${totalMrp}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">${totalDiscount}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">Rs 99
            </span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">Rs ${finalPayment}</span>
          </div>
       </div>
        <button class="btn-place-order">
          <div class="css-xjhrni">PLACE ORDER</div>
        </button>

        
  `;
}

// Convert bag item IDs into full product objects
function loadBagItemsObjects() {

    console.log("Bag IDs:", bagItems);

    bagItemObjects = bagItems.map(itemId => {
        return items.find(item => item.id == itemId);
         

    });

    console.log("Bag Objects:", bagItemObjects);
}

// Display all bag items
function displayBagItems() {

    const containerElement = document.querySelector('.bag-items-container');

    if (bagItemObjects.length === 0) {
        containerElement.innerHTML = "<h2>Your Bag is Empty</h2>";
        return;
    }

    let innerHTML = "";

    bagItemObjects.forEach(item => {
        innerHTML += generateItemHtml(item);
    });

    containerElement.innerHTML = innerHTML;
}


function removeFromBag(itemId) {
  bagItems = bagItems.filter(bagItemId => bagItemId!= itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
         loadBagItemsObjects();
          displaybagIcon();
         displayBagItems();
         displayBagSummary();
        
}
// Generate HTML for a single item
function generateItemHtml(item) {

    return `
    <div class="bag-item-container">

        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}" alt="${item.item_name}">
        </div>

        <div class="item-right-part">

            <div class="company">
                ${item.company}
            </div>

            <div class="item-name">
                ${item.item_name}
            </div>

            <div class="price-container">
                <span class="current-price">
                    Rs. ${item.current_price}
                </span>

                <span class="original-price">
                    Rs. ${item.original_price}
                </span>

                <span class="discount-percentage">
                    (${item.discount_percentage}% OFF)
                </span>
            </div>

            <div class="return-period">
                <span class="return-period-days">
                    ${item.return_period} Days
                </span>
                Return Available
            </div>

            <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">
                    ${item.delivery_date}
                </span>
            </div>

        </div>

        <div class="remove-from-cart" onclick="removeFromBag('${item.id}')">
            x
        </div>

    </div>
    `;
}