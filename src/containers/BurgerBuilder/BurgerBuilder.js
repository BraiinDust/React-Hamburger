import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 0.5,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 3,
  }

  addIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients }
    ingredients[type] = this.state.ingredients[type] + 1

    this.setState(prevState => ({
      totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
      ingredients: ingredients,
    }))
  }

  removeIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients }
    if (ingredients[type] === 0) return
    ingredients[type] = this.state.ingredients[type] - 1

    this.setState(prevState => ({
      totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
      ingredients: ingredients,
    }))
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onAddIngredient={this.addIngredientHandler}
          onRemoveIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </>
    )
  }
}

export default BurgerBuilder
