import React from 'react'
import {NavLink} from 'react-router-dom'

function MenuItem(props) {
    //<NavLink {...props}/>
    return (
        <div>
            <NavLink to = {props.to} activeStyle = {{color: 'red'}}>{props.children}</NavLink>
        </div>
    )
}

MenuItem.propTypes = {
}

export default MenuItem