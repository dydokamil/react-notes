import React from 'react'

import './App.css'
import Left from './Left'
import Right from './Right'
import consts from '../actions/consts'

export const updateNoteAction = body => {
  return { type: consts.UPDATE_NOTE_REQUEST, body }
}

export const App = () => (
  <div className="wrap">
    <main>
      <Left className="left" />
      <Right onUpdateNote={updateNoteAction} className="right" />
    </main>
  </div>
)

export default App
