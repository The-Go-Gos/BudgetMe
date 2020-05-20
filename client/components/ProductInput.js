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
      // <div key={idx}>
      //   <label htmlFor="name">
      //     <small>Name</small>
      //   </label>
      //   <div className="input is-success is-small is-rounded">
      //     <input
      //       type="text"
      //       name="name"
      //       id={idx}
      //       value={props.products[idx].name}
      //       className="name"
      //       onChange={props.onChangeHandler}
      //     />
      //   </div>
      //   <label htmlFor="price">
      //     <small>Price</small>
      //   </label>
      //   <input
      //     type="number"
      //     step="any"
      //     name="price"
      //     id={idx}
      //     value={props.products[idx].price}
      //     className="price input is-success is-small"
      //     onChange={props.onChangeHandler}
      //   />
      //   <br />
      //   <select
      //     id={idx}
      //     className="categoryId input is-success is-small"
      //     onChange={props.onChangeHandler}
      //   >
      //     {categories.map((c, optionIndex) => {
      //       return (
      //         <option key={optionIndex} value={optionIndex + 1}>
      //           {c}
      //         </option>
      //       )
      //     })}
      //   </select>
      // </div>
      <form className="pure-form pure-form-aligned">
        <fieldset>
          <legend>New Item</legend>
          <div className="pure-control-group">
            <label htmlFor="aligned-name">Name</label>
            <input
              type="text"
              name="name"
              id={idx}
              value={props.products[idx].name}
              className="name"
              onChange={props.onChangeHandler}
              placeholder="eg. Apple"
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="aligned-price">Price</label>
            <input
              type="number"
              name="price"
              id={idx}
              value={props.products[idx].price}
              className="price"
              onChange={props.onChangeHandler}
              placeholder="0.00"
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="aligned-category">Category</label>
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
        </fieldset>
      </form>
    )
  })
}

export default ProductInputs
