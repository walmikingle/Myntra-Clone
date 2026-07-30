let bagItems;
onload();
function onload() {
  let bagItemsstr = localStorage.getItem('bagItems');
  bagItems = bagItemsstr ? JSON.parse(bagItemsstr) : [];
  homePageItems();
  displaybagIcon();

}




function addToBag(itemID){
  bagItems.push(itemID);
  displaybagIcon();
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
}


function displaybagIcon() {
  let bagItemCountEle = document.querySelector('.bagItemCount');
  if(bagItems.length > 0) {
  bagItemCountEle.innerText=bagItems.length;
  bagItemCountEle.style.visibility = 'visible';

  } else {
    bagItemCountEle.style.visibility = 'hidden';
  }
}

function homePageItems(){
let itemContainerEle = document.querySelector('.items-container');

if(!itemContainerEle) {
  return;
}
let innerHTML='';
items.forEach(item=> {
  innerHTML +=
  `<div class="item-container">

    <img class="item-img" src="${item.image}" alt="item image">

    <div class="rating">
      ${item.rating.stars}⭐ | ${item.rating.count}
    </div>

    <div class="company-name">${item.company}</div>

    <div class="item-name">
      ${item.item_name}</div>

    <div class="pricing">
      <span class="current-price">Rs. ${item.current_price}</span>
      <span class="original-price">Rs. ${item.original_price}</span>
      <span class="discount">(${item.discount_percentage})</span>
      </div>
      
    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>

  </div>`
});

itemContainerEle.innerHTML = innerHTML;
}

