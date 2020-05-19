import React from 'react'
import Popup from 'reactjs-popup'

const SingleCategory = props => {
  const {category, index} = props

  return (
    <Popup
      trigger={
        <div
          key={index}
          className="grid-child boxed box has-background-warning has-text-centered"
        >
          <h1 className="has-text-weight-bold">{category.key}</h1>
          <h2>${category.value.totalSpent.toFixed(2)}</h2>
        </div>
      }
      modal
      closeOnDocumentClick
    >
      <span className="modal-h-w">
        <div className="tile is-parent">
          <article className="tile is-child notification is-info">
            <h2>
              Total Spent in {category.key}:{' '}
              {category.value.totalSpent.toFixed(2)}
            </h2>
            <h2>
              Average Spent in {category.key}:{' '}
              {category.value.averageSpent.toFixed(2)}
            </h2>
            <h2>
              Total Number of items bought in {category.key}:{' '}
              {category.value.quantity}
            </h2>
          </article>
        </div>
      </span>
    </Popup>
  )
}

export default SingleCategory
