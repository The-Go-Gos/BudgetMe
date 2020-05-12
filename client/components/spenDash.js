import React from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store'

export class SpenDash extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {id} = this.props
    this.props.getCategories(id)
  }
  render() {
    const {categories} = this.props.categories
    console.log('CATEGORIES ========> ', categories.length )

    if(categories.length === 0){
      return(<h1>You have nothing to show</h1>)
    } else{
    return (
      <div className="columns is-multiline is-mobile"> 
         {categories && categories.map((category, index) => (
          <div className="column is-half" key={index}>
          <h1>{category.key}</h1>
          <h2>$ {category.value.totalSpent.toFixed(2)}</h2>
        </div>)
        )} 
      </div>
    )
  }
  }
}

const mapState = state => {
  return {categories: state.categoryReducer, id: state.user.id}
}

const mapDispatch = dispatch => ({
  getCategories: (userId) => dispatch(fetchAllCategories(userId))
})

export default connect(mapState, mapDispatch)(SpenDash)

{/* <div className="columns is-multiline is-mobile">
         {categories && categories.map(category => (
          <div className="column is-half" key={category}>
          <h1>{category.key}</h1>
          <h2>${category.value.totalSpent}</h2>
        </div>)
        )} 
      </div> */}