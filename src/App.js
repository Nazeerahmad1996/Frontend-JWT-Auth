import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [createUsername, setCreateUsername] = useState("")
  const [createPassword, setCreatePassword] = useState("")
  const [isLogin, setIslogin] = useState(false)
  const [books, setBooks] = useState([])

  const login = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post('http://localhost:3000/auth/login', {
        "username": username,
        "password": password
      }, {
        withCredentials: true // it will save the creds into cookies
      })
      console.log(res)
      let { accessToken } = res.data
      localStorage.setItem("user", JSON.stringify(accessToken))
      setIslogin(true)
    } catch (error) {
      console.log(error)
    }
  }

  const register = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post('http://localhost:3000/auth/signUp', {
        "username": createUsername,
        "password": createPassword
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getBooks = async () => {
    try {
      let res = await Axios.post('http://localhost:3000/auth/getPost', {}, {
        withCredentials: true // token from cookies will send automtically from here
      })
      let { Posts } = res.data
      setBooks(Posts)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="App">
        <div>
          <h2>Login Form</h2>
          <form onSubmit={login}>
            <div className="container">
              <label><b>Username</b></label>
              <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Username" required />

              <label><b>Password</b></label>
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" required />

              <button type="submit">Login</button>
            </div>

            {/* <div className="container" style={{backgroundColor :'#f1f1f1'}}>
          <button type="button" className="cancelbtn">Cancel</button>
          <span className="psw">Forgot <a href="#">password?</a></span>
        </div> */}
          </form>
        </div>

        <div>
          <h2>Sign Up</h2>
          <form onSubmit={register}>
            <div className="imgcontainer">
            </div>

            <div className="container">
              <label><b>Username</b></label>
              <input onChange={(e) => setCreateUsername(e.target.value)} type="text" placeholder="Enter Username" required />

              <label><b>Password</b></label>
              <input onChange={(e) => setCreatePassword(e.target.value)} type="password" placeholder="Enter Password" required />

              <button type="submit">Sign Up</button>
            </div>

            {/* <div className="container" style={{backgroundColor :'#f1f1f1'}}>
          <button type="button" className="cancelbtn">Cancel</button>
          <span className="psw">Forgot <a href="#">password?</a></span>
        </div> */}
          </form>
        </div>
      </div>
      {
        isLogin && (
          <button onClick={getBooks}>Get Books</button>
        )
      }
      <div style={{display: 'flex'}}>
        {
          books.map(_books => {
            return (
              <div className="card">
                <img src={_books.image} alt="Avatar" style={{ width: '100%', height: 400 }} />
                <div className="container">
                  <h4><b>{_books.name}</b></h4>
                  <p>{_books.city}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
