import React from 'react'

const categories = [
  'Select Category',
  'Clothing',
  'Shoes',
  'Groceries',
  'Dining Out',
  'Crafts and Hobbies',
  'Travel',
  'Sports and Athletics',
  'Fees and Service Charges'
]

const ProductInputs = props => {
  return props.products.map((val, idx) => {
    return (
      <div key={idx}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id={idx}
          value={props.products[idx].name}
          className="name"
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id={idx}
          value={props.products[idx].price}
          className="price"
        />
        <select id={idx} className="categoryId">
          {categories.map((c, optionIndex) => {
            return (
              <option key={optionIndex} value={optionIndex}>
                {c}
              </option>
            )
          })}
        </select>
      </div>
    )
  })
}
export default ProductInputs
