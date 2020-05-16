import React from 'react'

const Message = props => {
  const {totalSpend} = props
  return <div className="fancy">This month you have spent ${totalSpend}</div>
}

export default Message
