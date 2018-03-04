import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Test Title',
  author: 'I.M. Author',
  url: 'url',
  likes: 3
}

describe.skip('<SimpleBlog />', () => {

  it('renders author, title and likes', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)

    const contentDiv = blogComponent.find('.content')
    const likesDiv = blogComponent.find('.likes')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking twice the button calls event handler twice', () => {
    const likesBefore = blog.likes

    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <SimpleBlog 
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
    //expect(blog.likes).toBe(likesBefore + 2)
  })
})