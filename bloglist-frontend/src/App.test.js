import React from 'react'
import { shallow, mount } from 'enzyme'

import App from './App'
//import Blog from './components/Blog'

jest.mock('./services/blogs')
import blogService from './services/blogs'

const user = {
  token: '1231231214',
  username: "testi",
  name: "Nimi"
}

const mockHandler = jest.fn()

describe('<App />', () => {
  let app


  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()

      const logIn = app.find('Login')
    
      expect(app.html()).toContain('Login')
      expect(app.html()).not.toContain('Blogs')
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)

      console.log(app.html())
      console.log(blogComponents.length)
    
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})