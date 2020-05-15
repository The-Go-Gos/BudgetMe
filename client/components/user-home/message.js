import React from 'react'

const Message = (props) => {
  return (
    <div className="fancy">This month you have spent ${props.totalSpend}</div>
  )
}

export default Message
{/*<div className="mobile card">
        <div className="card-content">
    <div className="level-item content">
      This month you have spent ${props.totalSpend}
      <br />
    </div>
  </div>
  </div> */}