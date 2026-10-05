import React, { Component } from 'react'
import './errorMessage.css'

class ErrorMessage extends Component {

    render() {
        const { message } = this.props

        return (
            <div className="error-message">
                <h3>⚠️ Something went wrong</h3>
                <p>{message}</p>
            </div>
        )
    }
}

export default ErrorMessage