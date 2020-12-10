import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const styles = theme => ({
    greenButton: {
        backgroundColor: '#47CF73',
        color: '#000',
        fontSize: 16,
        borderRadius: 10,
        '&:hover': {
            backgroundColor: "#2FB45A",
        }
    }
});


function GreenButton(props) {
  const { classes, onClick, text, disabled} = props

  return (
    <Box m={1}>
        <Button onClick={onClick} className={classes.greenButton} m={1} disabled={disabled}>
            {text}
        </Button>
    </Box>
  );
}


export default withStyles(styles)(GreenButton);