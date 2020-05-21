import React from 'react'
import {VictoryPie, VictoryLabel, VictoryTooltip} from 'victory'

export class Pie extends React.Component {
  render() {
    const {percentageNotSpent, percentageSpent} = this.props
    return (
      <div>
        <div className="level-item">
          <svg width={300} height={240} viewBox="0 50 300 230">
            <VictoryPie
              standalone={false}
              width={300}
              height={300}
              padding={100}
              data={[
                {label: 'Not Spent', y: percentageNotSpent},
                {label: 'Spent', y: percentageSpent}
              ]}
              innerRadius={75}
              labelRadius={90}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={20}
                  pointerLength={0}
                  dx={({datum}) => (datum.label === 'Not Spent' ? 65 : -77)}
                  dy={({datum}) => (datum.label === 'Not Spent' ? -20 : 40)}
                  flyoutStyle={{
                    stroke: ({datum}) =>
                      datum.label === 'Not Spent' ? '#9ACD32' : '#FF7F50',
                    strokeWidth: 2
                  }}
                />
              }
              style={{labels: {fontSize: 15, fill: 'black'}}}
              colorScale={['#9ACD32', '#FF7F50']}
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
            <VictoryLabel
              textAnchor="middle"
              style={{fontSize: 15}}
              x={150}
              y={150}
              text={`${percentageSpent}% of your \n budget spent`}
            />
          </svg>
        </div>
      </div>
    )
  }
}

export default Pie
