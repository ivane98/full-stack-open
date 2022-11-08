import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}
function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes)
  console.log(anecdotes)
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(showNotification(anecdote.content, 1))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            vote(anecdote)
          }}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
