import util from 'util'

export const logBuilder = (options = {}) => {
  return (data) => log(data, options)
}

export const log = (data, options = {}) => {
  const mergedOptions = { showHidden: false, depth: null, colors: true, ...options }
  const content = util.inspect(data, mergedOptions)
  console.log(content) 
  return data
}


