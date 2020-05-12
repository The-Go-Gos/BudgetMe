import React from 'react'
const ProductInputs = props => {
  return props.products.map((val, idx) => {
    // let catId = `cat-${idx}`,
    //   ageId = `age-${idx}`
    return (
      <div key={idx}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          // data-id={idx}
          id={idx}
          value={props.products[idx].name}
          className="name"
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          // data-id={idx}
          id={idx}
          value={props.products[idx].price}
          className="price"
        />
      </div>
    )
  })
}
export default ProductInputs
