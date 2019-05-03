import React from 'react'

import Button from '../../UI/Button/Button'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ig => (
    <li key={ig}>
      <span style={{ textTransform: 'capitalize' }}>{ig}</span>:{' '}
      {props.ingredients[ig]}
    </li>
  ))

  return (
    <>
      <h3>Your Order</h3>
      <p>Your delicious burger with:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}€</strong></p>
      <p>Continue with checkout?</p>
      <Button btnType="Danger" onClick={props.onOrderCancelled}>CANCEL</Button>
      <Button btnType="Success" onClick={props.onOrderContinued}>CONTINUE</Button>
    </>
  )
}

export default orderSummary
