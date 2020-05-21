import React from 'react'

const Message = props => {
  const {totalSpend, categorySpend} = props
  const total = Math.round(totalSpend * 100) / 100
  const mostSpent = categorySpend.filter(x => x !== undefined)

  return (
    <div>
      <div className="fancy">This month you have spent ${total}</div>
      <br />
      {mostSpent.length > 1 ? (
        <div className="fancy">
          Most of your budget spent on <br />{' '}
          {mostSpent && mostSpent.map(spent => `${spent} \n`)}{' '}
        </div>
      ) : (
        <div className="fancy">
          Most of your budget spent on {mostSpent[0]}{' '}
        </div>
      )}
    </div>
  )
}

export default Message
