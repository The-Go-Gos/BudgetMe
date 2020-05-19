import React from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store'

export class SpenDash extends React.Component {
  componentDidMount() {
    const {id} = this.props
    this.props.getCategories(id)
  }
  render() {
    const {categories} = this.props.categories
    console.log('CATEGORIES ====>>>> ', categories)
    if (categories.length === 0) {
      return <h1>You have nothing to show</h1>
    } else {
      return (
        <div className="is-mobile">
          <h1 className="has-text-centered has-background-grey-light is-size-5">
            {' '}
            Spend Dash
          </h1>
          <br />
          <div className="grid-container">
            {categories &&
              categories.map((category, index) => (
                <div
                  key={index}
                  className="grid-child boxed box has-background-warning has-text-centered"
                >
                  <h1 className="has-text-weight-bold">{category.key}</h1>
                  <h2>${category.value.totalSpent.toFixed(2)}</h2>
                </div>
              ))}
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {categories: state.categoryReducer, id: state.user.id}
}

const mapDispatch = dispatch => ({
  getCategories: userId => dispatch(fetchAllCategories(userId))
})

export default connect(mapState, mapDispatch)(SpenDash)
