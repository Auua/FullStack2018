import React, {Component} from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      username: '',
      user: null,
      loginVisible: false,
      visible: true
    }
    this.addNewBlog = this.addNewBlog.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
    this.addNewLike = this.addNewLike.bind(this)
    this.removeABlog = this.removeABlog.bind(this)
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logOut = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
  }

  addNewBlog = (error, blog) => {
    if (blog) {
      this.setState({ 
        error: error,
        blogs:  this.state.blogs.concat(blog)
       })
    } else {
      this.setState({ 
        error: error
       })
    }
    
    setTimeout(() => {
      this.setState({ error: null})
    }, 5000)
  }

  addNewLike = (newBlog) => {
    this.setState({ blogs: this.state.blogs.map(blog => blog.id !== newBlog.id ? blog : newBlog )})
  }

  removeABlog = (removedBlog) => {
    this.setState({ 
      blogs: this.state.blogs.filter(blog => blog.id !== removedBlog.id),
      error: `${removedBlog.name} removed` 
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  render() {

    const loggedIn = () => (
      <div>
        <p>{this.state.user.name} is logged in</p>
        <button onClick={this.logOut}>Log out</button>

        <BlogForm addNewBlog = {this.addNewBlog}/>
      </div>
    )

    const blogs = this.state.blogs

    blogs.sort((a, b) =>
      b.likes - a.likes
    )


    return (
      <div>
      <Notification message={this.state.error}/>
        <div>
        {this.state.user === null ?
          <Togglable buttonLabel='Login'>
            <LoginForm 
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleChange}
              login={this.login}/> 
          </Togglable>
            : loggedIn()
          }
        </div>
        <div>
          <h2>blogs</h2>

          {blogs.map(blog => 
            <Blog key={blog.id} user={this.state.user} blog={blog} visible='false' addALike={this.addNewLike} removeABlog={this.removeABlog}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;

