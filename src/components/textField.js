import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';

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


function GreyTextField(props) {
  const { classes, placeholder, onChange, isPassword, disabled } = props

  return (
    <Box m={1}>
      <InputBase
          className={classes.textField}
          placeholder={placeholder}
          onChange={onChange}
          type={isPassword ? "password" : "text"}
          disabled={disabled}
      />
    </Box>
  );
}


export default withStyles(styles)(GreyTextField);