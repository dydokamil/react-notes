import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'

import Navbar from './Navbar'
import consts from '../actions/consts'

// export const formatDatetime = dt => dt.split('.')[0].replace('T', ' ')
export const formatDatetime = dt => dt.split('.')[0].replace('T', ' ')

export class Left extends React.Component {
  componentDidMount () {
    this.props.onFetchNotes()
  }

  onRemoveNoteWithParams = () => {
    this.props.onRemoveNote(this.props.notes.selected)
    // this.setState({ content: '', name: '' })
  }

  render () {
    return (
      <div className={this.props.className}>
        {/* navbar */}
        <Navbar
          onNewNote={this.props.onNewNote}
          onUpdateNote={this.props.onUpdateNote}
          onRemoveNote={this.onRemoveNoteWithParams}
        />
        {/* notes */}
        <div id="notes-list">
          {_.map(_.orderBy(this.props.notes.notes, 'edited', 'desc'), note => (
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
          ))}
        </div>
      </div>
    )
  }
}

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
  onRemoveNote: id => {
    dispatch({ type: consts.REMOVE_NOTE_REQUEST, id })
  }
})

export const mapStateToProps = state => {
  return { notes: state.notes }
}

export default connect(mapStateToProps, mapDispatchToProps)(Left)

Left.propTypes = {
  onFetchNotes: PropTypes.func.isRequired,
  onRemoveNote: PropTypes.func.isRequired,
  onNewNote: PropTypes.func.isRequired,
  onSelectNote: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired
}
