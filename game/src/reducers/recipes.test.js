import { expect } from 'chai'
import reducer, { recipes } from './recipes'

describe('recipes reducer', () => {
  const initialState = recipes

  it('returns an empty array for the initial state', () => {
    expect(reducer()).to.eql(initialState)
  })
})
