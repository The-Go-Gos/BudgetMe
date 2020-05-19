import React from 'react'
import {VictoryPie, VictoryLabel, VictoryTooltip} from 'victory'

export default class Chart extends React.Component {
  render() {
    const {categories} = this.props
    console.log('PROPS ==>>>  ', this.props.categories)
    return (
      <div>
        <div className="level-item">
          <svg width={300} height={240} viewBox="0 50 300 230">
            <VictoryPie
              standalone={false}
              width={300}
              height={300}
              padding={100}
              data={[{label: 'Not Spent', y: categories}]}
              innerRadius={75}
              labelRadius={90}
              labelComponent={
                <VictoryTooltip cornerRadius={20} pointerLength={0} />
              }
              style={{labels: {fontSize: 15, fill: 'black'}}}
              //   colorScale={['#9ACD32', '#FF7F50']}
            />
            <circle
              cx="150"
              cy="150"
              r="50"
              fill="none"
              stroke="black"
              strokeWidth={1}
            />
            <circle
              cx="150"
              cy="150"
              r="75"
              fill="none"
              stroke="black"
              strokeWidth={1}
            />
          </svg>
        </div>
      </div>
    )
  }
}
