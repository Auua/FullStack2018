import React, {Component} from 'react'
import blogService from '../services/blogs'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      user: this.props.blog.user.name
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  addLike = async (event) => {
    event.preventDefault()
    const like = await blogService.update(this.props.blog.id, {likes: this.props.blog.likes + 1})
    this.props.addALike(like)
  }

  removeBlog = async (event) => {
    event.preventDefault()
    const blog = this.props.blog
    const ok = window.confirm(`Delete ${blog.name} by ${blog.author}?`)
    if (!ok) {
      return
    }
    
    await blogService.remove(blog.id)

    this.props.removeABlog(blog)
  }

  render() {
    const hideWhenVisible = { 
      display: this.state.visible ? 'none' : '',
      paddingTop: 10,
      padding: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const showWhenVisible = { 
      display: this.state.visible ? '' : 'none',
      paddingTop: 10,
      padding: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    let { blog, user } = this.props

    return (
      <div>
        <div style={hideWhenVisible} onClick={this.toggleVisibility}>
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible} >
          <p onClick={this.toggleVisibility}>{blog.title}: {blog.author}</p>
          {blog.url} <br/>
          {blog.likes} <button onClick={this.addLike}>like</button> <br/>
          Added by {this.state.user} <br/>
          {user.username === blog.user.username ? <button onClick={this.removeBlog}>Delete</button> : null}
        </div>
      </div>
    )
  }
}

export default Blog