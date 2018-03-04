import React, {Component} from 'react'
import blogService from '../services/blogs'

export default class BlogForm extends Component {
  constructor() {
    super()

    this.state = {
      author: '',
      title: '',
      url: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createNew = async (event) => {
    event.preventDefault()

    try{
      const blog = await blogService.create({
        author: this.state.author,
        title: this.state.title,
        url: this.state.url
      })

      this.props.addNewBlog(`A new blog '${this.state.title}' by ${this.state.author} added`, blog)
      this.setState({ author: '', title: '', url: ''})

    } catch(exception) {
      this.props.addNewBlog('Something went wrong when adding ', null)
    }
  }

  render() {

    return (
      <div>
        <h3>Create new</h3>
        <form onSubmit={this.createNew}>
              <div>
                Title
                <input
                  type="text"
                  value={this.state.title}
                  name="title"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                Author
                <input
                  type="text"
                  value={this.state.author}
                  name="author"
                  onChange={this.handleChange}
                />
              </div>
              <div> 
                URL
                <input
                  type="text"
                  value={this.state.url}
                  name="url"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit">Create</button>
            </form>
      </div>
    )
  }
}