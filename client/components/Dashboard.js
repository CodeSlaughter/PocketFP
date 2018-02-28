import React from 'react'
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



export function Dashboard(props){
    const user = props.user;

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
    console.log(tax[user.state])
    const interest = 7 / 12 / 100
    const fedTaxBill = fedBill(100000, fedTax(100000), 6000)
    const stateTaxBill = Math.floor(user.income * stateBill(100000)) 
    const afterTax = user.income - fedBill(100000, fedTax(100000), 6000) - stateTaxBill
    const yearlyOut = user.monthlyExp * 12
    const cashFlow = Math.floor(afterTax - yearlyOut)
    const cashFlowMonthly = Math.floor((afterTax - yearlyOut) /12)
    fedTax(110000, 'single');

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
                    <div className="card-block">
                        <blockquote className="card-blockquote">
                        <p>Income: {user.income}</p>
                        <p>Income: {user.state}</p>
                        </blockquote>
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
                        <p>Yearly Expenses: ${yearlyOut}</p>
                        <p>Federal tax Bill: ${fedBill(100000, fedTax(100000), 6000)}</p>
                        <p>State tax Bill: ${stateTaxBill}</p>
                        <p>Yearly Cash flow: ${cashFlow}</p>
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
                <VictoryPie
                    data={[
                        { x: "Free Cash", y: afterTax },
                        { x: "Fed Taxes", y: fedTaxBill },
                        { x: "Living Expenses", y: yearlyOut },
                        { x: "State tax", y: stateTaxBill }
                      ]}
                    />
                </div>
                <div className="col-sm-2" />
            </div>
            </div>

    )
}



const mapState = (state) => {
    return {
        user: state.user
    }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(Dashboard)

