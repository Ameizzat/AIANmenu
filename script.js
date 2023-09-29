// JavaScript for quantity control
document.addEventListener('DOMContentLoaded', function () {
  // Get all quantity boxes and buttons
  const quantityBoxes = document.querySelectorAll('.quantity-box');
  const plusButtons = document.querySelectorAll('.plus');
  const minusButtons = document.querySelectorAll('.minus');
  const selectedItems = [];

  // Attach event listeners to plus and minus buttons
  plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const quantityElement = quantityBoxes[index].querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantity += 1;
      quantityElement.textContent = quantity;

      // Add the item index to the selectedItems array
      if (quantity === 1) {
        selectedItems.push(index);
      }
      updateOrderList();
    });
  });

  minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const quantityElement = quantityBoxes[index].querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 0) {
        quantity -= 1;
        quantityElement.textContent = quantity;

        // Remove the item index from the selectedItems array
        if (quantity === 0) {
          const itemIndex = selectedItems.indexOf(index);
          if (itemIndex !== -1) {
            selectedItems.splice(itemIndex, 1);
          }
        }
        updateOrderList();
      }
    });
  });

  // Function to update the order list and calculate total price
  function updateOrderList() {
    const orderList = document.querySelector('#order-list ul');
    const receiptList = document.querySelector('.receipt ul');
    receiptList.innerHTML = '';

    let totalPrice = 0; // Initialize total price

    selectedItems.forEach((index) => {
      const item = document.querySelectorAll('.menu-item')[index];
      const itemName = item.querySelector('span').textContent;
      const itemPrice = parseFloat(item.querySelector('.unit-price').textContent.replace('RM ', ''));

      // Get the quantity for the current item
      const quantity = parseInt(quantityBoxes[index].querySelector('.quantity').textContent);

      // Calculate the item total
      const itemTotal = itemPrice * quantity;

      totalPrice += itemTotal; // Add item total to the total price

      const listItem = document.createElement('li');
      listItem.className = 'receipt-item';
      listItem.innerHTML = `
        <span class="item-quantity">${quantity}x</span>
        <span class="item-name-space">&nbsp;</span>
        <span class="item-name">${itemName}</span>
        <span class="item-price">RM ${itemTotal.toFixed(2)}</span>
      `;
      receiptList.appendChild(listItem);
    });

    // Update the total price display
    const totalPriceDiv = document.getElementById('total-price');
    totalPriceDiv.textContent = `Total Price: RM ${totalPrice.toFixed(2)}`;
  }
});
