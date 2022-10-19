import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ initBlog, updateBlog }) => {
  const [likes, setLike] = useState(initBlog.likes)
  const [blog, setBlog] = useState(initBlog)

  const handleLike = async () => {
    const putBlog = await blogService.update(blog.id, {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })

    setLike(putBlog.likes)
    setBlog(putBlog)
  }

  const handleDelete = async () => {
    if (window.confirm('do you really want to delete?')) {
      await blogService.deleteBlog(blog.id)
    }

    updateBlog()
    // window.location.reload()
  }
  return (
    <div className="blog">
      {blog.title} {blog.author} {likes}
      <button onClick={handleLike}>like</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Blog
