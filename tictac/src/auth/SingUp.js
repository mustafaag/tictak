import React, { Component } from 'react'

export default class SingUp extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
       
    }
    
    
    render() {
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3"> Sign Up </h5>
                    <div className="input-field">
                        <label htmlFor="username"> username </label>
                        <input type="text" id="username" onChange={this.handleOnChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email"> Email </label>
                        <input type="email" id="email" onChange={this.handleOnChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password"> Password </label>
                        <input type="password" id="password" onChange={this.handleOnChange} />
                    </div>
                    <div className="input-field">
                       <button className="btn pink lighten-1 z-depth-0" >SignUp</button>
                    </div>
                </form>
            </div>
        )
    }
}
