import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import './App.css'
import Navbar from './components/navbar'
import consts from './consts'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { content: '', name: '' }
  }

  componentDidMount () {
    this.props.onFetchNotes()
  }

  componentWillReceiveProps = props => {
    try {
      this.setState({
        content: props.notes.notes[props.notes.selected].content,
        name: props.notes.notes[props.notes.selected].name
      })
    } catch (err) {
      console.log(err)
    }
  }

  formatDatetime = dt => {
    return dt.split('.')[0].replace('T', ' ')
  }

  onChange = text => {
    this.setState({ content: text })
  }

  onChangeTitle = text => {
    this.setState({ name: text })
  }

  onUpdateNoteWithParams = () => {
    this.props.onUpdateNote({
      content: this.state.content,
      name: this.state.name,
      _id: this.props.notes.notes[this.props.notes.selected]._id
    })
  }

  onRemoveNoteWithParams = () => {
    this.props.onRemoveNote({ id: this.props.notes.selected })
    // this.setState({ content: '', name: '' })
  }

  render () {
    return (
      <div className='wrap'>
        <main>
          <div className='left'>
            <Navbar
              onNewNote={this.props.onNewNote}
              onUpdateNote={this.onUpdateNoteWithParams}
              onRemoveNote={this.onRemoveNoteWithParams}
            />
            {_.map(
              _.orderBy(this.props.notes.notes, 'edited', 'desc'),
              note => {
                return (
                  <div
                    onClick={() => this.props.onSelectNote(note._id)}
                    key={note._id}
                    className={`note ${note._id === this.props.notes.selected ? 'note-selected' : 'note-hoverable'}`}
                  >
                    <div className='note-name'>
                      {note.name
                        ? note.name
                        : <span
                          style={{ fontStyle: 'italic', fontWeight: 100 }}
                          >
                            no title
                          </span>}
                    </div>
                    <div className='note-date-preview'>
                      {this.formatDatetime(note.edited)}
                    </div>
                  </div>
                )
              }
            )}
          </div>
          <div className='right'>
            {this.props.notes.selected &&
              <input
                className='title-editor'
                onChange={event => this.onChangeTitle(event.target.value)}
                placeholder={`Title`}
                value={this.state.name}
              />}
            {this.props.notes.selected &&
              <textarea
                onChange={event => this.onChange(event.target.value)}
                placeholder={`Type here...`}
                value={this.state.content}
                className='editor'
              />}
          </div>
        </main>
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
      dispatch({ type: consts.FETCH_NOTES_REQUEST })
    },
    onSelectNote: id => {
      dispatch({ type: consts.SELECT_NOTE_REQUEST, selected: id })
      dispatch({ type: consts.FETCH_NOTE_REQUEST, selected: id })
    },
    onNewNote: () => {
      dispatch({ type: consts.NEW_NOTE_REQUEST })
    },
    onUpdateNote: body => {
      dispatch({ type: consts.UPDATE_NOTE_REQUEST, body })
    },
    onRemoveNote: id => {
      dispatch({ type: consts.REMOVE_NOTE_REQUEST, id })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
