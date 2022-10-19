import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'title',
    author: 'author',
    // url: 'url.com',
    // likes: 5,
  }
  //   const mockHandler = jest.fn()
  const component = render(<Blog initBlog={blog} />) //updateBlog={mockHandler} as a prop

  //   const button = component.getByText('View')
  //   expect(button).toBeDefined()

  //   fireEvent.click(button)

  const element = component.container.querySelector('.blog')
  //   expect(element).toHaveTextContent('url.com')
  expect(element).toBeDefined()
})
