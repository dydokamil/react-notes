import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { content: 'Type' }
  }

  componentDidMount () {
    this.props.onFetchNotes()
    // this.onContentChange = this.onContentChange.bind(this)
  }

  render () {
    return (
      <div>
        <div className='flex-container'>
          <div className='notes-panel'>
            {_.map(this.props.notes.notes, note => {
              return (
                <div key={note._id} className='note'>
                  {note.name}
                </div>
              )
            })}
          </div>
          <div className='editor-panel'>
            <div className='note-date'>Date goes here...</div>
            <textarea className='editor' size='1' />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { notes: state.notes }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchNotes: () => {
      dispatch({ type: 'FETCH_NOTES_REQUEST' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
