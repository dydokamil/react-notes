import React from 'react'
import UnconnectedApp, { App } from './App'
import { shallow } from 'enzyme'

describe('App', () => {
  const app = shallow(<App />)
  it('should match the snapshot', () => {
    expect(app).toMatchSnapshot()
  })
  it('should render the connected Left component', () => {
    expect(app.find('Connect(Left)').exists()).toBe(true)
  })
  it('should render the connected Right component', () => {
    expect(app.find('Connect(Right)').exists()).toBe(true)
  })
})
