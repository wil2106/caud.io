import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const styles = (theme) => ({
  greyButton: {
    backgroundColor: '#444857',
    color: '#fff',
    fontSize: 16,
    borderRadius: 10,
    '&:hover': {
      backgroundColor: '#5A6074',
    },
  },
})

/**
 * @function GreyButton
 * @param {Object} props
 * @description  Extension of the Material UI Button component
 */
function GreyButton(props) {
  const { classes, onClick, text, fullWidth, disabled } = props

  return (
    <Box m={1}>
      <Button
        onClick={onClick}
        className={classes.greyButton}
        fullWidth={fullWidth}
        disabled={disabled}
      >
        {text}
      </Button>
    </Box>
  )
}

/**
 * @exports
 */
export default withStyles(styles)(GreyButton)
