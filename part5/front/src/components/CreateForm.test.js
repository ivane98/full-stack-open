import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

test('<CreateForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<CreateBlogForm createBlog={createBlog} />)

  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'testing of forms could be easier' },
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
})
