import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      let blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setMessage(`${blog.title} has been added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <h2 className="error">{errorMessage}</h2>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const updateBlog = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const blogList = () => {
    let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {sortedBlogs
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              initBlog={blog}
              updateBlog={updateBlog}
            />
          ))
          .sort((a, b) => a.likes - b.likes)}
      </div>
    )
  }

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <h2 className="successmessage">{message}</h2>
          <p>
            {user.name} logged in <button onClick={handleLogOut}>logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <CreateBlog createBlog={handleCreateBlog} />
          </Togglable>
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
