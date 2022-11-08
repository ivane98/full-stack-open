import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload
      return (state = `you voted '${content}'`)
    },
    removeNotification(state, action) {
      return (state = initialState)
    },
  },
})

export const { showNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
