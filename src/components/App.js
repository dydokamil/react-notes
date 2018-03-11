import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import './App.css'
import Navbar from './Navbar'
import consts from '../actions/consts'

const formatDatetime = dt => dt.split('.')[0].replace('T', ' ')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { content: '', name: '' }
  }

  componentDidMount () {
    this.props.onFetchNotes()
  }

  componentWillReceiveProps = props => {
    if (
      props.notes &&
      props.notes.notes &&
      props.notes.selected &&
      props.notes.notes[props.notes.selected]
    ) {
      if ('content' in props.notes.notes[props.notes.selected]) {
        this.setState({
          content: props.notes.notes[props.notes.selected].content
        })
      } else {
        this.setState({ content: '' })
      }

      if ('name' in props.notes.notes[props.notes.selected]) {
        this.setState({ name: props.notes.notes[props.notes.selected].name })
      } else {
        this.setState({ name: '' })
      }
    }
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
      <div className="wrap">
        <main>
          <div className="left">
            <Navbar
              onNewNote={this.props.onNewNote}
              onUpdateNote={this.onUpdateNoteWithParams}
              onRemoveNote={this.onRemoveNoteWithParams}
            />
            {_.map(
              _.orderBy(this.props.notes.notes, 'edited', 'desc'),
              note => (
                <div
                  onClick={() => this.props.onSelectNote(note._id)}
                  key={note._id}
                  className={`note ${
                    note._id === this.props.notes.selected
                      ? 'note-selected'
                      : 'note-hoverable'
                  }`}
                >
                  <div className="note-name">
                    {note.name ? (
                      note.name
                    ) : (
                      <span style={{ fontStyle: 'italic', fontWeight: 100 }}>
                        no title
                      </span>
                    )}
                  </div>
                  <div className="note-date-preview">
                    {formatDatetime(note.edited)}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="right">
            {this.props.notes.selected && (
              <input
                className="title-editor"
                onChange={event => this.onChangeTitle(event.target.value)}
                placeholder="Title"
                value={this.state.name}
              />
            )}
            {this.props.notes.selected && (
              <textarea
                onChange={event => this.onChange(event.target.value)}
                placeholder="Type here..."
                value={this.state.content}
                className="editor"
              />
            )}
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({ notes: state.notes })

const mapDispatchToProps = dispatch => ({
  onFetchNotes: () => {
    dispatch({ type: consts.FETCH_NOTES_REQUEST })
  },
  onSelectNote: id => {
    dispatch({ type: consts.SELECT_NOTE_REQUEST, id })
    dispatch({ type: consts.FETCH_NOTE_REQUEST, id })
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
})

App.propTypes = {
  onFetchNotes: PropTypes.func.isRequired,
  onUpdateNote: PropTypes.func.isRequired,
  onRemoveNote: PropTypes.func.isRequired,
  onNewNote: PropTypes.func.isRequired,
  onSelectNote: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
