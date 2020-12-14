const palette = [
  '#d31abe',
  '#4a099e',
  '#8638fe',
  '#509d45',
  '#d37817',
  '#40ba1b',
  '#8bbfb0',
  '#1b46fe',
  '#cb7f91',
  '#e0f845',
  '#122352',
  '#924a0a',
]

/**
 * @function RandomColor
 * @description Generate random color based on the list above. User does not have a fixed color.
 * @exports
 */
export const RandomColor = () => {
  let position = Math.floor(Math.random() * Math.floor(palette.length))
  return palette[position]
}
