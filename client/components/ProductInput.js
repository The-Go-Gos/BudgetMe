import React from 'react'

const categories = [
  'Choose a Category', //category 'other' in db
  'Apparel',
  'Accessaries',
  'Dining Out',
  'Fees & Service Charges',
  'Groceries',
  'Household',
  'Hobbies',
  'Personal Care',
  'Sports',
  'Travel'
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
