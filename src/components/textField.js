import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';

/**
 * Constants
 */
const styles = theme => ({
  textField: {
    backgroundColor: "#252830",
    color: "white",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%"
  }
})

/**
 * @function GreyTextField
 * @param {Object} props React props
 * @description Extension of MUI InputBase component
 */
function GreyTextField(props) {
  const {
    classes,
    placeholder,
    onChange,
    isPassword,
    disabled,
    ...rest
  } = props

  return (
    <Box m={1} style={{    flexGrow: 1    }}>
      <InputBase
        className={classes.textField}
        placeholder={placeholder}
        onChange={onChange}
        type={isPassword ? 'password' : 'text'}
        disabled={disabled}
        {...rest}
      />
    </Box>
  )
}

/**
 * @exports
 */
export default withStyles(styles)(GreyTextField);