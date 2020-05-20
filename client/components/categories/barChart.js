import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchData} from '../../store'
import {BarChart, Bar, Brush, XAxis, YAxis, Tooltip} from 'recharts'

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    return (
      <div className="custom-tooltip box has-background-white-ter">
        <p className="has-text-weight-normal is-size-6">{`${label}:`}</p>
        <p className="has-text-weight-normal is-size-6">{`$ ${
          payload[0].value
        }`}</p>
      </div>
    )
  }
  return null
}

class Chart extends PureComponent {
  componentDidMount() {
    const {id} = this.props
    this.props.getData(id)
  }
  render() {
    const {data} = this.props
    return (
      <div className="barChart">
        <BarChart
          width={360}
          height={300}
          data={data}
          margin={{
            top: 37,
            right: 45,
            left: 20,
            bottom: 45
          }}
        >
          <Brush dataKey="key" height={30} stroke="#23D160" y={0} />
          <XAxis dataKey="key" interval={0} angle={-30} textAnchor="end" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" name="Spent" fill="#209CEE" />
        </BarChart>
      </div>
    )
  }
}
// <Brush dataKey="key" height={30} stroke="#56BCD2" />
const mapState = state => {
  return {data: state.categoryReducer.graphData}
}

const mapDispatch = dispatch => ({
  getData: id => dispatch(fetchData(id))
})

export default connect(mapState, mapDispatch)(Chart)
// export default Chart
