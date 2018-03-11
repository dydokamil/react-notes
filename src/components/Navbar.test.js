import React from 'react'
import { shallow } from 'enzyme'
import { Navbar } from './Navbar'

describe('Navbar component', () => {
  const onNewNoteMock = jest.fn()
  const onRemoveNoteMock = jest.fn()
  const props = { onNewNote: onNewNoteMock, onRemoveNote: onRemoveNoteMock }
  const navbar = shallow(<Navbar {...props} />)
  it('should render the navbar', () => {
    expect(navbar).toMatchSnapshot()
  })
  it('should call `onNewNote` when #new-note-button is pressed', () => {
    navbar.find('#new-note-button').simulate('click')
    expect(onNewNoteMock).toHaveBeenCalled()
  })
  it('should call `onRemoveNote` when #remove-note-button is pressed', () => {
    navbar.find('#remove-note-button').simulate('click')
    expect(onRemoveNoteMock).toHaveBeenCalled()
  })
})
