import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory'


export class InvestSandbox extends Component {
    constructor(props){
        super(props)
        this.state = {
            initial: 0,
            monthlyAdd: 0,
            time: 0,
            interest: 1
        }
        this.handleInitial = this.handleInitial.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleTime = this.handleTime.bind(this)
        this.handleInterest = this.handleInterest.bind(this)
    }

    handleInitial(event){
        this.setState(Object.assign(this.state, {initial: event.target.value}))
    }

    handleAdd(event){
        this.setState(Object.assign(this.state, {monthlyAdd: event.target.value}))
    }

    handleTime(event){
        this.setState(Object.assign(this.state, {time: event.target.value}))
    }

    handleInterest(event){
        this.setState(Object.assign(this.state, {interest: event.target.value}))
    }

    render(){
    console.log(this.state.user)
    const user = this.props.user;
    const initial = this.state.initial
    const monthlyAdd = this.state.monthlyAdd
    const interestMonth = this.state.interest / 12 / 100
    const interestYear = this.state.interest / 100
    const time = this.state.time
    const initialReturn = (time) => {
        return initial * Math.pow(1 + interestYear, time)
    }
    const returnCalc =  (time) => { 
        console.log(interestMonth, monthlyAdd)
        let returns =  (monthlyAdd * ((Math.pow(1 + interestMonth, time * 12) - 1) / interestMonth))
        return Math.floor(returns + initialReturn(time))
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-1" />
                <div className="col-sm-5">
                <div className="card">
                    <div className="card-header">
                        At a glance
                    </div>
                    <div id="taxslidecontainer">
                        <p>Initial Investment</p>
                    <input type="range" min="1" max="100000" value={`${this.state.initial}`} className="slider" id="myInitial" onChange={this.handleInitial} />
                  </div>
                  <p>Monthly Contribution</p>
                  <div id="expenseslidecontainer">
                    <input type="range" min="1" max="10000" value={`${this.state.monthlyAdd}`} className="slider" id="myMonthlyAdd" onChange={this.handleAdd} />
                  </div>
                  <p>Time</p>
                  <div id="timeslidecontainer">
                    <input type="range" min="1" max="40" value={`${this.state.time}`} className="slider" id="myTime" onChange={this.handleTime} />
                  </div>
                  <p>Interest</p>
                  <div id="interestslidecontainer">
                    <input type="range" min="1" max="100" value={`${this.state.interest}`} className="slider" id="myinterest" onChange={this.handleInterest} />
                  </div>
 
                    </div>
                </div>
                <div className="col-sm-5">
                <div className="card">
                    <div className="card-header">
                        Your stats
                    </div>
                    <div className="card-block">
                        <blockquote className="card-blockquote">
                        <p>Initial investment: ${this.state.initial}</p>
                        <p>Monthly Contribution: ${this.state.monthlyAdd}</p>
                        <p>Investment Time: {this.state.time} years</p>
                        <p>Expected interest: {this.state.interest}%</p>
                        <p> Balance after investment period: ${returnCalc(time)}</p>
                        </blockquote>
                    </div>
                    
                    </div>
                </div>
                <div className="col-sm-1" />
                </div>
                <div className="row">
                <div className="col-sm-2" />
                <div className="col-sm-8">
                <VictoryChart
                    theme={VictoryTheme.material}
                    >
                    <VictoryLine
                        style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={[
                        { x: 0, y: returnCalc(time / 5) },
                        { x: 1, y: returnCalc(time * 2 / 5) },
                        { x: 2, y: returnCalc(time * 3 / 5) },
                        { x: 3, y: returnCalc(time * 4 / 5) },
                        { x: 5, y: returnCalc(time) }
                        ]}
                    />
                    </VictoryChart>
                </div>
                <div className="col-sm-2" />
            </div>
            </div>
        )
    }
}



const mapState = (state) => {
    return {
        user: state.user
    }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(InvestSandbox)