const dummy = [
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
  },
  {
    item: 'OG WTG BANANA',
    price: 1.56
  }
]

import React from 'react'

class ReceiptDetail extends React.Component {
  render() {
    return (
      <div>
        {dummy.map(list => {
          return (
            <div>
              <input type="checkbox" />
              <span>{list.item}</span>
              <span> </span>
              <span>${list.price}</span>
              <span> </span>
              <span>
                <select>
                  <option value="1" hidden>
                    Select Category
                  </option>
                  <option value="2">Grocery</option>
                  <option value="3">Sports</option>
                  <option value="4">Education</option>
                  <option value="5">Pets</option>
                  <option value="6">Gas</option>
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
