import React from 'react'

const categories = [
  'Choose a Category',
  'Food & Dining',
  'Shopping',
  'Home',
  'Auto & Transport',
  'Health & Fitness',
  'Pets',
  'Travel',
  'Fees & Charges'
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
          onChange={props.onChangeHandler}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id={idx}
          value={props.products[idx].price}
          className="price"
          onChange={props.onChangeHandler}
        />
        <br />
        <select
          id={idx}
          className="categoryId"
          onChange={props.onChangeHandler}
        >
          {categories.map((c, optionIndex) => {
            return (
              <option key={optionIndex} value={optionIndex + 1}>
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
