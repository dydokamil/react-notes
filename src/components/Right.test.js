import React from 'react'
import { shallow } from 'enzyme'
import { Right } from './Right'

describe('Right component', () => {
  const notes = {}
  const props = { notes: { notes, selected: 1 } }
  const rightComponent = shallow(<Right {...props} />)
  it('should match the snapshot', () => {
    expect(rightComponent).toMatchSnapshot()
  })
  it('should render #note-saver button', () => {
    expect(rightComponent.find('#note-saver').exists()).toBe(true)
  })
  it('should render #title-input button', () => {
    expect(rightComponent.find('#title-input').exists()).toBe(true)
  })
  it('should render #content-input button', () => {
    expect(rightComponent.find('#content-input').exists()).toBe(true)
  })
  it('should call `onUpdateNoteWithParams` when #note-saver button is clicked', () => {
    // TODO
  })
})
