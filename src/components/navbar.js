import React from 'react'
import PropTypes from 'prop-types'

export const Navbar = props => (
  <div id="add-remove-navbar" className="my-navbar">
    <button id="new-note-button" onClick={() => props.onNewNote()}>
      <i className="fas fa-plus" />
    </button>
    <button id="remove-note-button" onClick={() => props.onRemoveNote()}>
      <i className="fas fa-trash-alt" />
    </button>
  </div>
)

Navbar.propTypes = {
  onNewNote: PropTypes.func.isRequired,
  onRemoveNote: PropTypes.func.isRequired
}

export default Navbar
