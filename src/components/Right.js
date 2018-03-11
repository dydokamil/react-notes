import React from 'react'
import { connect } from 'react-redux'
import consts from '../actions/consts'
import './Right.css'

export class Right extends React.Component {
  constructor (props) {
    super(props)
    this.state = { content: '', name: '', canSave: false }
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
    this.setState({ canSave: false })
  }

  onUpdateNoteWithParams = () => {
    this.props.onUpdateNote({
      content: this.state.content,
      name: this.state.name,
      _id: this.props.notes.notes[this.props.notes.selected]._id
    })
  }

  onChange = text => {
    this.setState({ content: text })
    this.setState({ canSave: true })
  }

  onChangeTitle = text => {
    this.setState({ name: text })
    this.setState({ canSave: true })
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className="my-navbar">
          <button
            id="note-saver"
            disabled={!this.state.canSave}
            onClick={() => this.onUpdateNoteWithParams()}
          >
            <i className="fas fa-save" />
          </button>
        </div>
        {this.props.notes.selected && (
          <input
            id="title-input"
            className="title-editor"
            onChange={event => this.onChangeTitle(event.target.value)}
            placeholder="Title"
            value={this.state.name}
          />
        )}
        {this.props.notes.selected && (
          <textarea
            id="content-input"
            onChange={event => this.onChange(event.target.value)}
            placeholder="Type here..."
            value={this.state.content}
            className="editor"
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = dispatch => ({
  onUpdateNote: body => {
    dispatch({ type: consts.UPDATE_NOTE_REQUEST, body })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Right)
