import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

const blog = {
  title: 'Test Title',
  author: 'I.M. Author',
  url: 'url',
  likes: 3,
  user: {
    _id: "1",
    username: "tester",
    name: "tester"
  }
}

const loggedUser = {
  _id: "2",
  username: "testi",
  name: "Nimi"
}

const mockHandler = jest.fn()

const blogComponent = shallow(
  <Blog 
    blog={blog}
    user={loggedUser}
    visible='false' 
    addALike={mockHandler} 
    removeABlog={mockHandler}
    />)

describe('<Blog />', () => {

  it('after clicking name the details are displayed', () => {

    const nameDiv = blogComponent.find('.name')
    nameDiv.simulate('click')

    const contentDiv = blogComponent.find('.info')

    expect(contentDiv.text()).toContain(blog.likes)
  })

})
