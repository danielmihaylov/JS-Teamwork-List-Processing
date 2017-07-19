;(function () {
  let theArray = []
  let initialized = false
  let output = document.getElementById('output')
  let input = document.getElementById('input')
  document.getElementById('submit').addEventListener('click', submit)
  input.addEventListener('keypress', e => (e.code === 'Enter' ? submit() : ''))
  let commands = {
    reverse: reverse,
    sort: sort,
    count: count,
    end: end,
    append: append,
    prepend: prepend,
    roll: roll,
    delete:deleteAt,
    insert:insertAt
  }

  function submit () {
    let commandTokens = input.value.split(' ').filter(e => e !== '')
    console.log('Submitted: ' + commandTokens)
    if (!initialized) {
      theArray = commandTokens.slice(0)
      input.value = ''
      initialized = true
      output.value += theArray.join(' ') + '\n'
      return
    }
    try {
      commands[commandTokens[0]](commandTokens.slice(1))
    } catch (err) {
      output.value += 'Error: invalid command' + '\n'
    } finally {
      input.value = ''
    }
  }

  function roll (direction) {
      console.log(arguments.length)
    if (direction == 'right') {
      theArray = theArray
        .slice(theArray.length - 1)
        .concat(theArray.slice(0, theArray.length - 1))
        .slice(0)
      output.value += theArray.join(' ')+'\n'
    } else if (direction == 'left') {
      theArray = theArray.slice(1).concat(theArray.slice(0, 1)).slice(0)
      output.value += theArray.join(' ')+'\n'
    }else{
        output.value += 'Error: invalid command parameters' + '\n'
    }
  }

  function deleteAt (indexer) {
    let index = Number(indexer[0])

    if(validateIndex(theArray, index)){
      return
    }

    theArray = theArray.slice(0, index).concat(theArray.slice(index + 1)).slice(0)
    output.value+=theArray.join(' ')+'\n'
  }

  function insertAt (tokens) {
    let index = Number(tokens[0])
    let item = tokens[1]


    if(validateIndex(theArray, index, true)){
      return
    }


    theArray = theArray.slice(0, index).concat([item]).concat(theArray.slice(index)).slice(0)
    output.value += theArray.join(' ')+'\n'
  }

  function validateIndex (arr, index, isInsert = false) {
    let checker = false
    if (isNaN(index)) {
      output.value += `Error: invalid type.\n`
      checker = true
       }
    if (index < 0) {
      output.value +=`Error: invalid index ${index}.\n`
  
    }

    if (isInsert) {
      if (index > arr.length) {
        output.value +=`Error: invalid index ${index}.\n`
        checker = true
      }
    } else if (index >= arr.length) {
      output.value +=(`Error: invalid index ${index}.\n`)
      checker = true
    }
    return checker
  }

  // Georgi Andonov
  function sort (args) {
    if (args.length !== 0) {
      output.value += 'Error: invalid command parameters' + '\n'
      return
    }

    theArray.sort()
    output.value += theArray.join(' ') + '\n'
  }

  // Georgi Andonov
  function count (args) {
    if (args.length === 0 || args.length > 1) {
      output.value += 'Error: invalid command parameters' + '\n'
      return
    }

    let count = 0
    let stringPar = args[0]
    for (let elem of theArray) {
      if (elem == stringPar) {
        count++
      }
    }
    output.value += count + '\n'
  }

  // Georgi Andonov
  function end (args) {
    if (args.length > 0) {
      output.value += 'Error: invalid command parameters' + '\n'
      return
    }

    output.value += 'Finished\n'
  }

  // Daniel Mihaylov
  function append (args) {
    if (args.length !== 1) {
      output.value += 'Error: invalid command parameters' + '\n';
      return
    }
    theArray.push(args);
    output.value += theArray.join(' ').toString() + '\n'
  }

  // Daniel Mihaylov
  function prepend (args) {
    if (args.length !== 1) {
      output.value += 'Error: invalid command parameters' + '\n';
      return
    }
    theArray.unshift(args);
    output.value += theArray.join(' ').toString() + '\n'
  }

  // Daniel Mihaylov
  function reverse (args) {
    if (args > 0) {
      output.value += 'Error: invalid command parameters' + '\n';
      return
    }
    output.value += theArray.reverse().join(' ').toString() + '\n'
  }

})()


