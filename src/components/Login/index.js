import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const onSuccess = Token => {
    const {history} = props
    Cookies.set('jwt_token', Token, {expires: 30})
    history.replace('/')
  }

  const onSubmitBtn = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'

    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      onSuccess(data.jwt_token)
    }
  }

  return (
    <div className="login-container">
      <h1>Please Login</h1>
      <button type="button" onClick={onSubmitBtn}>
        Login with sample creds
      </button>
    </div>
  )
}

export default Login
