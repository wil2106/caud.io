import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  alert: {
    backgroundColor: "#FF3C41",
    color: "white",
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
  }
})


function Alert(props) {
  const { classes, text } = props

  return (
    <Box display="flex" justifyContent="center" className={classes.alert}>
      {text}
    </Box>
  );
}


export default withStyles(styles)(Alert);