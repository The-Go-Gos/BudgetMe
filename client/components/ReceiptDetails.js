// parsed from google OCR
const dummy = {
  vendor: 'whole foods',
  products: [
    {
      item: 'OVF LG EGGS',
      price: 6.19
    },
    {
      item: 'OG HASS AVOCADO BAG',
      price: 6.99
    },
    {
      item: 'CRUNCHY ALMD BTR',
      price: 7.99
    }
  ],
  totalPrice: 21.17
}

import React from 'react'

class ReceiptDetail extends React.Component {
  render() {
    return (
      <div>
        {dummy.products.map(list => {
          return (
            <div>
              <input type="checkbox" />
              <span>{list.item}</span>
              <span> </span>
              <span>${list.price}</span>
              <span> </span>
              <span>
                <select>
                  <option value="0" hidden>
                    Select Category
                  </option>
                  <option value="1">Clothing</option>
                  <option value="2">Shoes</option>
                  <option value="3">Groceries</option>
                  <option value="4">Dining Out</option>
                  <option value="5">Crafts and Hobbies</option>
                  <option value="6">Travel</option>
                  <option value="7">Sports and Athletics</option>
                  <option value="8">Fees and Service Charges</option>
                </select>
              </span>
            </div>
          )
        })}
      </div>
    )
  }
}

// const mapStateToProps = state =>{
//   return {
//     receipt:
//   }
// }
export default ReceiptDetail
