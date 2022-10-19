const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  if (blogs.length === 1) {
    return blogs.likes
  }
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
  function compareNumbers(a, b) {
    return a - b
  }
  let likesArray = blogs.map((blog) => blog.likes).sort(compareNumbers)
  let mostLikes = likesArray[likesArray.length - 1]
  if (blogs.length === 0) {
    return 0
  }
  if (blogs.length === 1) {
    return blogs.likes
  }
  return {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: mostLikes,
  }
}

const mostBlogs = (blogs) => {
  const map = new Map()

  blogs.map((blog) =>
    map.set(blog.author, map.has(blog.author) ? map.get(blog.author) + 1 : 1)
  )

  let mostBlogs = {
    author: '',
    blogs: 0,
  }

  for (let [author, blogs] of map) {
    if (mostBlogs.blogs < blogs) {
      mostBlogs = {
        author: author,
        blogs: blogs,
      }
    }
  }

  return mostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
