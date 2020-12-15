import btoa from 'btoa'

/**
 * @function createBlobURL
 * @param {Object} file 
 * @description using URL.createObjectURL, the function creates a local link to the file instead of the full stream buffer
 * @exports
 */
export const createBlobURL = (file) => {
  return URL.createObjectURL(file)
}

/**
 * @function imageBufferToBase64
 * @param {Array} arr buffer array
 * @description Converts an array of buffer to its base64 object
 * @exports
 */
export const imageBufferToBase64 = (arr) => {
  if (!arr?.length) return
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))
}
