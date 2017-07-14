const funcs = require('../js/xapuJs.js')
const assert = require('chai').assert
const expect = require('chai').expect

const rollRight = funcs.rollRight
const rollLeft = funcs.rollLeft
const deleteAt = funcs.deleteAt
const insertAt = funcs.insertAt
const validateIndex = funcs.validateIndex

describe('list functionality tests', function () {
  // 7 elements
  let demoList = [1, 2, 3, 'pesho', 'gosho', {}, []]

  beforeEach(function () {
    demoList = [1, 2, 3, 'pesho', 'gosho', {}, []]
  })

  describe('index validations group', function () {
    it('validation for the range of the index for deleteAt', function () {
      for (let i = 0; i < demoList.length; i++) {
        assert.ifError(validateIndex(demoList, i))
      }
    })

    it('should throw err for negative index', function () {
      assert.throws(
        () => new validateIndex(demoList, -1),
        'Error: invalid index -1.'
      )
    })

    it('should throw err for index thats bigger than the arr length-1 - deletetion func', function () {
      assert.throws(
        () => new validateIndex(demoList, demoList.length),
        `Error: invalid index ${demoList.length}.`
      )
    })

    it('should throw err for index thats bigger than the arr length+1 - insert func', function () {
      assert.throws(
        () => new validateIndex(demoList, demoList.length + 1, true),
        `Error: invalid index ${demoList.length + 1}.`
      )
    })

    it('should not throw err for index thats equal to arr length - insert func', function () {
      assert.ifError(validateIndex(demoList, demoList.length, true))
    })
  })

  describe('insertion functionality tests', function () {
    it('should place elements at the beginnig of the list', function () {
      tempArr = insertAt(demoList, 0, 'pesho')

      let output = ['pesho', 1, 2, 3, 'pesho', 'gosho', {}, []]

      assert(
        tempArr.toString() == output.toString(),
        'the first elem was not placed'
      )
    })

    it('should place elements at the end of the list', function () {
      tempArr = insertAt(demoList, demoList.length, 1)

      let output = [1, 2, 3, 'pesho', 'gosho', {}, [], 1]

      assert(
        tempArr.toString() == output.toString(),
        'the last elem was not placed'
      )
    })
  })

  describe('deletion functionality tests', function () {
    it('should delete elements at the beginnig of the list', function () {
      let output = [2, 3, 'pesho', 'gosho', {}, []]

      assert.equal(
        deleteAt(demoList, 0).toString(),
        output.toString(),
        'dosent delete the 0 elem'
      )
    })

    it('should delete elements at the end of the list', function () {
      let output = [1, 2, 3, 'pesho', 'gosho', {}]

      assert.equal(
        deleteAt(demoList, demoList.length - 1).toString(),
        output.toString(),
        'dosent delete the last elem'
      )
    })
  })

  describe('roll left functionality tests', function () {
    it('should rotate elements left by one position', function () {
      let output = [2, 3, 'pesho', 'gosho', {}, [], 1]

      assert.equal(
        rollLeft(demoList).toString(),
        output.toString(),
        'dosent rotate left'
      )
    })
  })

  describe('roll right functionality tests', function () {
    it('should rotate elements right by one position', function () {
      let output = [[], 1, 2, 3, 'pesho', 'gosho', {}]

      assert.equal(
        rollRight(demoList).toString(),
        output.toString(),
        'dosent rotate right'
      )
    })
  })
})
