import React from 'react'
import { shallow, mount } from 'enzyme'
import { Left } from './Left'

import { mapStateToProps } from './Left'

describe('Left component', () => {
  const notes = [
    { _id: 0, edited: '2011-08-12T20:17:46.384Z' },
    { _id: 1, edited: '2011-08-12T20:17:46.384Z' }
  ]
  const onFetchNotesMock = jest.fn()
  const onRemoveNoteMock = jest.fn()
  const onNewNoteMock = jest.fn()
  const onSelectNoteMock = jest.fn()
  const props = {
    notes: { notes },
    onFetchNotes: onFetchNotesMock,
    onRemoveNote: onRemoveNoteMock,
    onNewNote: onNewNoteMock,
    onSelectNote: onSelectNoteMock
  }
  const leftComponent = mount(<Left {...props} />)
  it('should match the snapshot', () => {
    expect(leftComponent).toMatchSnapshot()
  })
  it('should render a navbar', () => {
    expect(leftComponent.find('#add-remove-navbar').exists()).toBe(true)
  })
  it('should display all notes', () => {
    expect(leftComponent.find('#notes-list').children().length).toEqual(
      notes.length
    )
  })
  it('should map state to props', () => {
    expect(mapStateToProps({ notes: 'some notes' })).toEqual({
      notes: 'some notes'
    })
  })
})
