import rootReducer from '../reducers'

describe('rootReducer', () => {
  it('initializes the default state', () => {
    expect(rootReducer({}, {})).toEqual({
      notes: { error: undefined, notes: undefined, selected: undefined }
    })
  })
})
