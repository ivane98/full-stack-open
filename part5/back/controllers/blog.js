const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/api/blogs/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// blogRouter.post('/api/blogs', async (request, response) => {
//   const blog = new Blog(request.body)
//   const user = await User.findById(blog.userId)
//   console.log(blog)
//   console.log(user)
//   const savedBlog = await blog.save()
//   response.json(savedBlog)
// })

blogRouter.post('/api/blogs', async (request, response) => {
  const body = request.body
  //const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body

  const blog = {
    // user: body.user.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog.toJSON())
})

blogRouter.delete('/api/blogs/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'invalid user' })
  }
})

module.exports = blogRouter
