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
          <h2 className="has-text-weight-bold">{category.key}</h2>
          <h2>${category.value.totalSpent.toFixed(2)}</h2>
        </div>
      }
      modal
      closeOnDocumentClick
      contentStyle={{width: '300px'}}
    >
      <span className="modal-h-w">
        <div className="tile is-parent">
          <article className="tile is-child notification is-warning">
            <h2>
              <span className="has-text-weight-bold	">
                Total Spent in {category.key}:
              </span>{' '}
              ${category.value.totalSpent.toFixed(2)}
            </h2>
            <h2>
              <span className="has-text-weight-bold	">
                Average Spent in {category.key}:
              </span>{' '}
              ${category.value.averageSpent.toFixed(2)}
            </h2>
            <h2>
              <span className="has-text-weight-bold	">
                Total Number of items bought in {category.key}:
              </span>{' '}
              {category.value.quantity}
            </h2>
          </article>
        </div>
      </span>
    </Popup>
  )
}

export default SingleCategory
