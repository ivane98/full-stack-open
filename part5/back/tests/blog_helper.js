const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((note) => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const initialBlogs = [
  {
    author: 'HTML is easy',
    url: 'example.com',
    likes: 4,
  },
  {
    author: 'HTML is easy',
    url: 'example.com',
    likes: 4,
  },
]

module.exports = {
  blogsInDb,
  initialBlogs,
  usersInDb,
}
