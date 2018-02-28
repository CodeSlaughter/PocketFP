import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu} from 'semantic-ui-react'

/*
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props

  return (
    <div>
      <Menu>
        <Menu.Item href="/about">About</Menu.Item>
        <Menu.Item href="/">Home</Menu.Item>
        <Menu.Menu position='right'>
          {
            isLoggedIn ? 
            <Menu.Menu position='right'>
              <Menu.Item href="#" onClick={handleClick}>Logout</Menu.Item> 
              <Menu.Item href="/dashboard">Dashboard</Menu.Item>
            </Menu.Menu> :
            <Menu.Menu position='right'>
              <Menu.Item href="/login">Login</Menu.Item>
              <Menu.Item href="/signup">Sign Up</Menu.Item>
            </Menu.Menu>
          }
        </Menu.Menu>
      </Menu>
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
