import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import GreenButton from './../components/greenButton'
import GreyButton from './../components/greyButton'
import Box from '@material-ui/core/Box'
import TextField from '../components/textField'
import CustomAlert from './customAlert'
import { signMeUp, setSignUpError } from './../app/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { selectSignUpLoading, selectSignUpError } from '../app/userSlice'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'

/**
 * Constants
 */
const SAFEPASSWORDREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/g
const styles = (theme) => ({
  colorPrimary: {
    backgroundColor: 'white',
  },
  barColorPrimary: {
    backgroundColor: '#47CF73',
  },
})

/**
 * @function FormDialog
 * @param {Object} props React props
 * @description Sign up form for user registration
 */
function FormDialog(props) {
  /**
   * State
   */
  const loading = useSelector(selectSignUpLoading)
  const error = useSelector(selectSignUpError)
  const dispatch = useDispatch()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const { closeDialog, classes, openSuccessSnackBar } = props

  /**
   * Event handlers
   */
  const handleClose = () => {
    closeDialog()
  }

  const handleSignUp = () => {
    if (login.trim().length === 0 || password.trim().length === 0) {
      dispatch(setSignUpError('Login and password are required'))
      return
    }
    if (!password.match(SAFEPASSWORDREGEX)) {
      dispatch(
        setSignUpError(
          'Password should contain at least 1 digit, one lower case, one upper case and 8 characters'
        )
      )
      return
    }
    dispatch(setSignUpError(''))
    dispatch(
      signMeUp(login, password, () => {
        openSuccessSnackBar('You have successfully signed up')
        closeDialog()
      })
    )
  }

  const handleLoginChange = (event) => {
    setLogin(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignUp()
    }
  }

  return (
    <Dialog
      open={true}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      PaperProps={{ style: { backgroundColor: '#131417' } }}
      onKeyDown={handleKeyDown}
    >
      <DialogTitle>
        <Box color="white" display="flex" justifyContent="center">
          Sign up
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center">
          <Box>
            <PersonIcon style={{ color: 'white' }} />
          </Box>
          <Box flexGrow={1}>
            <TextField
              onChange={handleLoginChange}
              placeholder="login"
              disabled={loading}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box>
            <LockIcon style={{ color: 'white' }} />
          </Box>
          <Box flexGrow={1}>
            <TextField
              onChange={handlePasswordChange}
              placeholder="password"
              isPassword={true}
              disabled={loading}
            />
          </Box>
        </Box>
        {error && <CustomAlert text={error} />}
      </DialogContent>
      <DialogActions>
        <GreyButton onClick={handleClose} text="CANCEL" disabled={loading} />
        <GreenButton onClick={handleSignUp} text="SUBMIT" disabled={loading} />
      </DialogActions>
      {loading && (
        <LinearProgress
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      )}
    </Dialog>
  )
}

/**
 * @exports
 */
export default withStyles(styles)(FormDialog)
