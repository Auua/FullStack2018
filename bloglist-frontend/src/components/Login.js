import React from 'react'

const LoginForm = (props) => (
  <div className='Login'>
    <h2>Log in to application</h2>
      <form onSubmit={props.login}>
        <div>
          Username
          <input
            type="text"
            value={props.username}
            name="username"
            onChange={props.handleChange}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={props.password}
            name="password"
            onChange={props.handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
  </div>
)

export default LoginForm