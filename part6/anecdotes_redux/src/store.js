import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { appendAnecdote } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { getAll } from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
  },
})

getAll().then((anecdotes) =>
  anecdotes.forEach((anecdotes) => {
    store.dispatch(appendAnecdote(anecdotes))
  })
)

export default store
