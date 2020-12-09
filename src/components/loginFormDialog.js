import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import GreenButton from './../components/greenButton'
import GreyButton from './../components/greyButton'
import Box from '@material-ui/core/Box';
import TextField from '../components/textField'
import CustomAlert from './customAlert'
import { logMeIn, setLoginError } from './../app/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  selectLoginLoading,
  selectLoginError,
} from '../app/userSlice'

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';


const styles = theme => ({
  colorPrimary: {
    backgroundColor: 'white',
  },
  barColorPrimary: {
    backgroundColor: '#47CF73',
  }
});


function FormDialog(props) {

  const loading = useSelector(selectLoginLoading)
  const error = useSelector(selectLoginError)

  const dispatch = useDispatch()

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const { closeDialog, classes, openSuccessSnackBar} = props

  const handleClose = () => {
    closeDialog()
  }
  const handleLogin = () => {

    if(login.trim().length === 0 || password.trim().length === 0){
      dispatch(setLoginError('Login and password are required'))
      return;
    }
    dispatch(setLoginError(''))

    dispatch(logMeIn(login, password, () => {
        openSuccessSnackBar('You have successfully logged in')
        closeDialog()
    }))
  }

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleLogin()
    }
  }


  return (
    <Dialog open={true} aria-labelledby="form-dialog-title" fullWidth={true} 
       PaperProps={{style: {backgroundColor: '#131417'}}}
       onKeyDown={handleKeyDown}
    >
      <DialogTitle><Box color="white" display="flex" justifyContent="center">Login</Box></DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center">
          <Box><PersonIcon style={{ color: 'white' }}/></Box>
          <Box flexGrow={1}><TextField disable onChange = {handleLoginChange} placeholder="login" disabled={loading}/></Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box><LockIcon style={{ color: 'white' }}/></Box>
          <Box flexGrow={1}><TextField onChange = {handlePasswordChange} placeholder="password" isPassword={true} disabled={loading}/></Box>
        </Box>
        {error && <CustomAlert text={error}/>}
      </DialogContent>
      <DialogActions>
          <GreyButton onClick={handleClose} text="CANCEL" disabled={loading}/>
          <GreenButton onClick={handleLogin} text="SUBMIT" disabled={loading}/>
      </DialogActions>
      {loading && <LinearProgress classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}/>}
    </Dialog>
  );
}


export default withStyles(styles)(FormDialog);