function deleteAt (arr, indexer) {
  let index = Number(indexer)

  validateIndex(arr, index)

  arr = arr.slice(0, index).concat(arr.slice(index + 1)).slice(0)
  return arr
}

function rollRight (arr) {
  arr = arr.slice(arr.length - 1).concat(arr.slice(0, arr.length - 1)).slice(0)
  return arr
}

function rollLeft (arr) {
  arr = arr.slice(1).concat(arr.slice(0, 1)).slice(0)
  return arr
}

function insertAt (arr, indexer, item) {
  let index = Number(indexer)
  validateIndex(arr, index, true)
  arr = arr.slice(0, index).concat([item]).concat(arr.slice(index)).slice(0)
  return arr
}

function validateIndex (arr, index, isInsert = false) {
  if (isNaN(index)) {
    throw new Error(`Error: invalid type.`)
  }
  if (index < 0) {
    throw new Error(`Error: invalid index ${index}.`)
  }

  if (isInsert) {
    if (index > arr.length) {
      throw new Error(`Error: invalid index ${index}.`)
    }
  } else if (index >= arr.length) {
    throw new Error(`Error: invalid index ${index}.`)
  }
}

module.exports = { deleteAt, rollRight, rollLeft, insertAt, validateIndex }

