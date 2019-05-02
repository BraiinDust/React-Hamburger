import React from 'react'

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
  //Transform the ingredients object into an array of
  //BurgerIngredients, we shall have a reapeating number
  //of BurgerIngredients if there is more than 1 of the same
  //ingredient
  let ingredientsArr = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ))
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
  
    if(ingredientsArr.length === 0) {
        ingredientsArr = <p>Please add ingredients now!</p>
    }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArr}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger
