import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {Header} from 'semantic-ui-react'

export default function Welcome(props){
    return (
    <div className="ui grid">
        <div className="four wide column"></div>
        <div className="eight wide column">
            <Header as="h1" textAlign="center">Welcome</Header>
        </div>
        <div className="four wide column"></div>
    </div>
    )
}

