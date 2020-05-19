import React from 'react'

const Message = props => {
  const {totalSpend, categorySpend} = props
  const total = Math.round(totalSpend * 100) / 100
  return (
    <div>
      <div className="fancy">This month you have spent ${total}</div>
      <br />
      <div className="fancy">Most of your budget spent on {categorySpend}.</div>
    </div>
  )
}

export default Message
