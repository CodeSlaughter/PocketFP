import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory'


export class DebtSandbox extends Component {
    constructor(props){
        super(props)
        this.state = { 
            debt: 0,
            time: 0,
            apr: 1
        }
        this.handleDebt = this.handleDebt.bind(this)
        this.handleTime = this.handleTime.bind(this)
        this.handleApr = this.handleApr.bind(this)
    }

    handleDebt(event){
        this.setState(Object.assign(this.state, {debt: event.target.value}))
    }

    handleTime(event){
        this.setState(Object.assign(this.state, {time: event.target.value}))
    }

    handleApr(event){
        this.setState(Object.assign(this.state, {apr: event.target.value}))
    }

    render(){
    console.log(this.state.user)
    const debt = this.state.debt
    const interestMonth = this.state.apr / 12 / 100
    const apr = this.state.apr / 100
    const time = this.state.time * 12
    const payment = () => {
        console.log(interestMonth, debt, time)
        return  Math.floor(debt * (interestMonth * Math.pow(1 + interestMonth, time)) / (Math.pow(1 + interestMonth, time) - 1))
    }
    //const timeLeft
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-1" />
                <div className="col-sm-5">
                <div className="card">
                    <div className="card-header">
                        At a glance
                    </div>
                    <div id="debtslidecontainer">
                        <p>Debt</p>
                    <input type="range" min="1" max="250000" value={`${this.state.debt}`} className="slider" id="myDebt" onChange={this.handleDebt} />
                  </div>
                  <p>Time</p>
                  <div id="timeslidecontainer">
                    <input type="range" min="1" max="40" value={`${this.state.time}`} className="slider" id="myTime" onChange={this.handleTime} />
                  </div>
                  <p>Interest</p>
                  <div id="aprslidecontainer">
                    <input type="range" min="1" max="100" value={`${this.state.apr}`} className="slider" id="myinterest" onChange={this.handleApr} />
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
                        <p>Dept: ${this.state.debt}</p>
                        <p>Payed in {this.state.time} years</p>
                        <p>Expected interest: {this.state.apr}%</p>
                        <p> Amount to pay: ${payment()}</p>
                        <p> Amount paid: ${payment() * time}</p>
                        <p> Interest paid: ${(payment() * time - debt)}</p>
                        </blockquote>
                    </div>
                    
                    </div>
                </div>
                <div className="col-sm-1" />
                </div>
                <div className="row">
                <div className="col-sm-2" />
                <div className="col-sm-8">
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

export default connect(mapState, mapDispatch)(DebtSandbox)