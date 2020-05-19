import React from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store'
import {SingleCategory, Chart} from './categories'

export class SpenDash extends React.Component {
  componentDidMount() {
    const {id} = this.props
    this.props.getCategories(id)
  }
  render() {
    const {categories} = this.props.categories
    console.table('CATEGORIES ==>>> ', categories)
    return (
      <div className="is-mobile">
        <h1 className="has-text-centered has-background-grey-light is-size-5">
          {' '}
          Spend Dash
        </h1>
        <Chart categories={categories} />
        <br />
        {categories.length === 0 ? (
          <h1>You have nothing to show</h1>
        ) : (
          <div className="grid-container">
            {categories &&
              categories.map((category, index) => (
                <SingleCategory
                  category={category}
                  index={index}
                  key={category.key}
                />
              ))}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {categories: state.categoryReducer, id: state.user.id}
}

const mapDispatch = dispatch => ({
  getCategories: userId => dispatch(fetchAllCategories(userId))
})

export default connect(mapState, mapDispatch)(SpenDash)
