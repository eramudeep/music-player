const generateErrorMessage = (errors) => {
  let errorMessage = []
  const errObj = { message: '' }
  const errorResponse = errors
  Object.keys(errorResponse).forEach(err => {
    if (errorResponse[err]) {
      let errValue = ''
      errValue += err + ': '
      errorResponse[err].forEach(e => {
        errValue += e + ', '
      })
      errValue = errValue.slice(0, errValue.length - 2)
      errObj.message = errValue
      errorMessage.push({ ...errObj })
    }
  })
  return errorMessage
}

const errorChecker = (response) => {
  const obj = {
    value: false,
    errors: null
  }
  if (response.data.code === 200) {
    if (response.data.errors) {
      obj.value = true
      obj.errors = generateErrorMessage(response.data.errors)
    }
  } else {
    obj.value = true
    if (response.data.errors) {
      obj.errors = generateErrorMessage(response.data.errors)
    } else {
      obj.errors = [{ message: 'Invalid !' }]
    }
  }
  return obj
}

export default errorChecker
