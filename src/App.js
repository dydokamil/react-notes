import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { content: 'Type here...' }
  }

  componentDidMount () {
    this.props.onFetchNotes()
    // this.onContentChange = this.onContentChange.bind(this)
  }

  formatDatetime = dt => {
    return dt.split('.')[0].replace('T', ' ')
  }

  render () {
    return (
      <div id='content'>
        <div id='left'>
          {_.map(_.orderBy(this.props.notes.notes, 'edited', 'desc'), note => {
            return (
              <div key={note._id} className='note'>
                <div className='note-name'>{note.name}</div>
                <div className='note-date-preview'>
                  {this.formatDatetime(note.edited)}
                </div>
              </div>
            )
          })}
        </div>
        <div id='right'>
          <div className='note-date'>Date goes here...</div>
          <textarea className='editor' size='1' />
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
