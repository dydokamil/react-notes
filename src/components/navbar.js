import React from 'react'
import PropTypes from 'prop-types'

const Navbar = props => (
  <div className="my-navbar">
    <button onClick={() => props.onNewNote()}>
      <i className="fas fa-plus" />
    </button>
    <button onClick={() => props.onRemoveNote()}>
      <i className="fas fa-trash-alt" />
    </button>
    <button onClick={() => props.onUpdateNote()}>
      <i className="fas fa-save" />
    </button>
  </div>
)

Navbar.propTypes = {
  onNewNote: PropTypes.func.isRequired,
  onRemoveNote: PropTypes.func.isRequired,
  onUpdateNote: PropTypes.func.isRequired
}

export default Navbar
