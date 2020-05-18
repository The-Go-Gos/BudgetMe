import React from 'react'

const Message = props => {
  const {totalSpend, categories} = props
  const maxVotes = Math.max(...categories.map(e => e.value.totalSpent))
  const obj = categories.find(
    categorie => categorie.value.totalSpent === maxVotes
  )
  console.log('KRNG ===>>> ', obj)
  return (
    <div>
      <div className="fancy">This month you have spent ${totalSpend}</div>
      <br />
      <div className="fancy">most of your budget spent on _____.</div>
    </div>
  )
}

export default Message
