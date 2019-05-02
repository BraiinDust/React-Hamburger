import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
    purchasable: false,
    purchasing: false,
  }

  updatePurchaseState = () => {
    const ingredients = { ...this.state.ingredients }
    const count = Object.keys(ingredients).reduce(
      (sum, elem) => sum + ingredients[elem],
      0
    )
    this.setState({ purchasable: count > 0 })
  }

  addIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients }
    ingredients[type] = this.state.ingredients[type] + 1

    this.setState(
      prevState => ({
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
        ingredients: ingredients,
      }),
      this.updatePurchaseState
    )
  }

  removeIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients }
    if (ingredients[type] === 0) return
    ingredients[type] = this.state.ingredients[type] - 1

    this.setState(
      prevState => ({
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
        ingredients: ingredients,
      }),
      this.updatePurchaseState
    )
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('You have purchases your hamburger!')
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          onClose={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            onOrderCancelled={this.purchaseCancelHandler}
            onOrderContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onAddIngredient={this.addIngredientHandler}
          onRemoveIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          onOrder={this.purchaseHandler}
        />
      </>
    )
  }
}

export default BurgerBuilder
