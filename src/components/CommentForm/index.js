import React, { Component, PropTypes } from 'react'
import './style.css'

const fields = ['user', 'text']

function getDefaultState() {
    return {
        fields: fields.reduce((fields, fieldName) => {
            fields[fieldName] = {
                value: '',
                hasError: null
            }

            return fields
        }, {})
    }
}

class CommentForm extends Component {
    state = getDefaultState()

    render() {
        const { user, text } = this.state.fields
        return (
            <form onSubmit={ this.handleSubmit }>
                <h2>New comment</h2>
                <input type="text" 
                       placeholder="User" 
                       name="user" 
                       onChange={ this.handleUserChange } 
                       value={ user.value } 
                       className={ user.hasError ? 'notValid' : null } />
                <textarea placeholder="Comment..."
                          name="text"
                          onChange={ this.handleTextChange }
                          value={ text.value }
                          className={ text.hasError ? 'notValid' : null } />
                <input type="submit" value="Send" />
            </form>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const newState = this.state
        const { fields } = newState

        const hasErrors = Object.keys(fields).reduce((prevValue, fieldName) => {
            return !validate(fields[fieldName]) || prevValue;
        }, false)

        if(hasErrors)
            this.setState(this.state)
        else
            this.setState(getDefaultState())
    }

    handleUserChange = (e) => {
        let newState = this.state;
        let field = newState.fields.user
        
        field.value = e.target.value;
        validate(field)
        
        this.setState(newState)
    }

    handleTextChange = (e) => {
        let newState = this.state;
        let field = newState.fields.text
        
        field.value = e.target.value;
        validate(field)
        
        this.setState(newState)
    }
}

function validate(field) {
    field.hasError = field.value.length < 10 || field.value.length > 50
    return !field.hasError
}

export default CommentForm

