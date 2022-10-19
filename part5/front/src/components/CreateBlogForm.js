import React, { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateForm = async (event) => {
    event.preventDefault()

    setTitle('')
    setUrl('')
    setAuthor('')

    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
  }

  return (
    <form onSubmit={handleCreateForm}>
      <div>
        title
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author
        <input
          type="text"
          id="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default CreateForm
