import React from 'react'
import { VictoryPie, VictoryLabel } from "victory";

export class Pie extends React.Component {
  render(){
   const {percentageNotSpent, percentageSpent, email}= this.props
      return(
      <div>
        <h4>Welcome, {email}  </h4>
        <div className='level-item'>
        <svg width={300} height={300}>
          <VictoryPie
            standalone={false}
            width={300}
            height={300}
            padding={100}
            data={[
              {label: 'Not Spent', y: percentageNotSpent },
              {label: 'Spent', y: percentageSpent},
            ]}
            innerRadius={75}
            labelRadius={90}
            style={{labels: {fontSize: 12, fill: 'black'}}}
            colorScale={['#9ACD32', '#FF7F50']}
          />
          <circle cx="150" cy="150" r="50" fill="none" stroke="black" strokeWidth={1}/>
          <circle cx="150" cy="150" r="75" fill="none" stroke="black" strokeWidth={1}/>
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