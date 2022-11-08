import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import { getAll } from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
