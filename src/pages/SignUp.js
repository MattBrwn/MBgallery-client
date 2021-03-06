import React from 'react';

function SignUp(props){

    return (
        <form onSubmit={props.onSignUp}>
            <div className="form-group">
                <label htmlFor="InputUsername">Username</label>
                <input type="text" className="form-control" id="InputUsername" name="username" />
            </div>
            <div className="form-group">
                <label htmlFor="InputEmail">Email address</label>
                <input type="email" className="form-control" id="InputEmail" name="email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input name="password" type="password" className="form-control" id="InputPassword" />
            </div>
            {
                props.error ? (
                    <p style={{color: 'red'}}>{ props.error.errorMessage}</p>
                ) : null
            }
            <div class="form-group mt-3 mb-4">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default SignUp
