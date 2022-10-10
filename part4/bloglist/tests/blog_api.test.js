const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
    .expect()
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('http unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blog can be added successfully', async () => {
  const newBlog = {
    author: 'ivane98',
    url: 'ivane98.com',
    likes: 9,
  }
  const blogsAtBeggin = await helper.blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtBeggin.length + 1)

  const authors = blogsAtEnd.map((n) => n.author)
  expect(authors).toContainEqual('ivane98')
})

test('http likes', async () => {
  const blogs = await api.get('/api/blogs')

  blogs.body.forEach(async (blog) => {
    if (blog.likes === undefined) {
      blog.likes == 0
    }
  })

  blogs.body.forEach(async (blog) => {
    await expect(blog.likes).toBeDefined()
  })
})

test('delete a blog by id', async () => {
  const blogAtStart = await helper.blogsInDb()
  const blogToDelete = blogAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogAtEnd = await helper.blogsInDb()

  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  const contents = blogAtEnd.map((r) => r.content)

  expect(contents).not.toContain(blogToDelete.content)
})

test('updating a blog', async () => {
  const newBlog = {
    title: 'some',
    author: 'some',
    url: 'some.com',
    likes: 1,
  }

  const result = await api.post('/api/blogs/').send(newBlog)

  newBlog.likes += 1
  await api.put(`/api/blogs/${result.body.id}`).send(newBlog)
  const newResult = await api.get(`/api/blogs/${result.body.id}`)
  expect(newResult.body.likes).toBe(newBlog.likes)
})

//user tests

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ivane98',
      name: 'ivane vardoshvili',
      password: 'Lukurti123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

//after tokens
describe('unique users and blogs operation', () => {
  test('add new blog with correct user', async () => {
    // const responseBlogs = await api.get('/api/blogs')
    const loginData = {
      username: 'ivane98',
      password: 'Lukurti123',
    }

    const user = await api.post('/api/login').send(loginData).expect(200)

    console.log('user, ', user.body)

    const token = user.body.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      // return response.status(401).json({ error: 'token missing or invalid' })
      console.log('token missing or invalid')
    }

    const userId = decodedToken.id
    console.log('userId', userId)

    const newBlog = {
      title: 'the vjegeS  ',
      author: 'hectsdosr',
      url: 'www.senk.ed',
      likes: 311,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(200)
  })

  test('add new blog with no token', async () => {
    // const responseBlogs = await api.get('/api/blogs')
    const loginData = {
      username: 'Zoro',
      password: 'sword',
    }

    const user = await api.post('/api/login').send(loginData).expect(200)

    console.log('user, ', user.body)

    const token = user.body.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      // return response.status(401).json({ error: 'token missing or invalid' })
      console.log('token missing or invalid')
    }

    const userId = decodedToken.id
    console.log('userId', userId)

    const newBlog = {
      title: 'the vjegeS  ',
      author: 'hectsdosr',
      url: 'www.senk.ed',
      likes: 311,
    }

    await api
      .post('/api/blogs')
      // .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
