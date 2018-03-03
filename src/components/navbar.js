import React, { Component } from 'react'

export default class Navbar extends Component {
  constructor (props) {
    super(props)
    console.log(this.props)
  }
  render () {
    return (
      <div className='my-navbar'>
        <button onClick={() => this.props.onNewNote()}>
          <i className='fas fa-plus' />
        </button>
        <button onClick={() => this.props.onRemoveNote()}>
          <i className='fas fa-trash-alt' />
        </button>
        <button onClick={() => this.props.onUpdateNote()}>
          <i className='fas fa-save' />
        </button>
      </div>
    )
  }
}
