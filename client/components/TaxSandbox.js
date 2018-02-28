import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Taxee from 'taxee-tax-statistics'
import {VictoryPie} from 'victory'

const tax = Taxee[2017]

const fedTax = (income, status) => {
    let rate
    let deduction
    let state = 'jersey'
    const brackets = tax.federal.tax_withholding_percentage_method_tables.annual.single.income_tax_brackets
    const deductions = tax.federal.tax_withholding_percentage_method_tables.annual
    
    if (income >= brackets[brackets.length - 1 ].bracket){
        rate = brackets[brackets.length - 1 ].marginal_rate;
    } else if (income < brackets[0].bracket) {
        rate = brackets[0].marginal_rate
    }
    else {
        for(var i = 0; i < brackets.length-1; i++){
           if(income >= brackets[i].bracket && income < brackets[i+1].bracket) {
                rate = brackets[i].marginal_rate
           }
        }
    }
    // console.log(deductions)
    // console.log(rate, deduction)
    return rate
}

let fedBill  = (income, rate, deduction) => {
    return Math.floor((income-deduction) * ( rate / 100 )); 
}



export class TaxSandbox extends Component {
    constructor(props){
        super(props)
        this.state = {
            income: 0,
            expenses: 0
        }
        this.handleIncome = this.handleIncome.bind(this)
        this.handleExpense = this.handleExpense.bind(this)
    }

    handleIncome(event){
        this.setState(Object.assign(this.state, {income: event.target.value}))
    }

    handleExpense(event){
        this.setState(Object.assign(this.state, {expenses: event.target.value}))
    }

    render(){
    const user = this.props.user;
    const income = this.state.income
    const expenses = this.state.expenses

    const stateBill = (income) => {
      if(user.state){
      const stateBrack = tax[user.state].single.income_tax_brackets
      let rate
      if (income >= stateBrack[stateBrack.length - 1 ].bracket){
        rate = stateBrack[stateBrack.length - 1 ].marginal_rate;
      } else if (income < stateBrack[0].bracket) {
        rate = stateBrack[0].marginal_rate
      }
      else {
        for(var i = 0; i < stateBrack.length-1; i++){
           if(income >= stateBrack[i].bracket && income < stateBrack[i+1].bracket) {
                rate = stateBrack[i].marginal_rate
           }
        }
      }
    // console.log(deductions)
    // console.log(rate, deduction)
      return rate / 100
    }
    
    }
    const interest = 7 / 12 / 100
    const fedTaxBill = fedBill(income, fedTax(income), 6000)
    const stateTaxBill = Math.floor(income * stateBill(income)) 
    const afterTax = income - fedBill(income, fedTax(income), 6000) - stateTaxBill
    const yearlyOut = expenses * 12
    const net = afterTax - expenses
    const cashFlow = Math.floor(afterTax - yearlyOut)
    const cashFlowMonthly = Math.floor((afterTax - yearlyOut) /12)
    console.log(fedTaxBill, stateTaxBill, expenses, net)
    fedTax(income, 'single');

    const returnCalc =  () => { 
        console.log(interest, cashFlowMonthly)
        let returns =  cashFlowMonthly * ((Math.pow(1 + interest, 60) - 1) / interest)
        return Math.floor(returns)
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
                        <p>Income</p>
                    <input type="range" min="1" max="250000" value={`${this.state.income}`} className="slider" id="myIncome" onChange={this.handleIncome} />
                  </div>
                  <p>Expenses</p>
                  <div id="expenseslidecontainer">
                    <input type="range" min="1" max="10000" value={`${this.state.expenses}`} className="slider" id="myExpense" onChange={this.handleExpense} />
                  </div>
                  <VictoryPie
                    data={[
                        { x: "Free Cash", y: net },
                        { x: "Fed Taxes", y: fedTaxBill },
                        { x: "Living Expenses", y: yearlyOut },
                        { x: "State tax", y: stateTaxBill }
                      ]}
                    />
                    </div>
                </div>
                <div className="col-sm-5">
                <div className="card">
                    <div className="card-header">
                        Your stats
                    </div>
                    <div className="card-block">
                        <blockquote className="card-blockquote">
                        <p>Income: ${this.state.income}</p>
                        <p>Yearly Expenses: ${yearlyOut}</p>
                        <p>Federal tax Bill: ${fedTaxBill}</p>
                        <p>State tax Bill: ${stateTaxBill}</p>
                        <p>Yearly Cash flow: $
                        {
                            net < 0 ? <p>0</p> : cashFlow
                        }
                            </p>
                        <p> 5 Year Projected Value of invested cash flow: ${returnCalc()}</p>
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

export default connect(mapState, mapDispatch)(TaxSandbox)