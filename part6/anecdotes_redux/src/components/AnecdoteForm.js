import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'
import { createNew } from '../services/anecdotes'

function AnecdoteForm(props) {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newNote = await createNew(content)
    dispatch(createAnecdote(newNote))

    dispatch(showNotification(newNote.content, 1))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
