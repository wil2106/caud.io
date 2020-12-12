import btoa from 'btoa'

export const createBlobURL = (file) => {
  return URL.createObjectURL(file)
}

export const imageBufferToBase64 = (arr) => {
  if (!arr?.length) return
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))
}
