import React from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store'

export class SpenDash extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log('props in componentDidMount: ', this.props)
    this.props.fetchAllCategories(this.props.match.params.userId)
  }
  render() {
    console.log('SpenDash props: ', this.props)
    console.log('SpenDash state: ~~', this.state)
    const {categories} = this.props
    return (
      <div className="columns is-multiline is-mobile">
        {categories.map(category => (
          <div className="column is-half" key={category}>
          <h1>{category.key}</h1>
          <h2>${category.value.totalSpent}</h2>
        </div>)
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {categories: state.categories}
}

const mapDispatch = dispatch => ({
  fetchAllCategories: (userId) => dispatch(fetchAllCategories(userId))
})

export default connect(mapState, mapDispatch)(SpenDash)
