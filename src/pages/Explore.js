import React from 'react'
import MusicContainer from './../components/musicContainer'
import { useDispatch, useSelector } from 'react-redux'
import ContainerSwitcher from './../components/containerSwitcher'
import { requireContainerList, selectSearchList } from '../app/musicPackSlice'
import { selectLogin } from '../app/userSlice'
import SearchBar from '../components/SearchBar'
import SignUpFormDialog from './../components/signUpFormDialog'
import LoginFormDialog from './../components/loginFormDialog'
import GreenButton from './../components/greenButton'
import GreyButton from './../components/greyButton'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import ProfileIndicator from '../components/profileIndicator'

/**
 * @function Explore
 * @description Explore container in home page
 * @exports
 */
export default function Explore() {
  /**
   * State
   */
  const searchResult = useSelector(selectSearchList)
  const userLogin = useSelector(selectLogin)
  const [openSignUpDialog, setOpenSignUpDialog] = React.useState(false)
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false)
  const dispatch = useDispatch()

  const [successSnackBarStatus, setSuccessSnackBarStatus] = React.useState({
    open: false,
    message: '',
  })

  /**
   * Init
   */
  dispatch(requireContainerList('mostRecentIDs', 0))

  /**
   * Methods
   */

  const handleCloseSignUpDialog = () => {
    setOpenSignUpDialog(false)
  }

  const handleOpenSignUpDialog = () => {
    setOpenSignUpDialog(true)
  }

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false)
  }

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true)
  }

  const handleOpenSuccessSnackBar = (message) => {
    setSuccessSnackBarStatus({ open: true, message: message })
  }

  const handleCloseSuccessSnackBar = () => {
    setSuccessSnackBarStatus({ open: false, message: '' })
  }

  /**
   * Style
   */
  const panel = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }

  const topBar = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  }
  return (
    <React.Fragment>
      <div style={panel}>
        <div style={topBar}>
          <Box flexGrow={1}>
            <SearchBar />
          </Box>
          {/*<Box flexGrow={1}><SearchBar placeHolder="Search"/></Box>*/}
          {userLogin ? (
            <ProfileIndicator />
          ) : (
            <React.Fragment>
              <Box>
                <GreenButton onClick={handleOpenLoginDialog} text="LOGIN" />
              </Box>
              <Box>
                <GreyButton onClick={handleOpenSignUpDialog} text="SIGN UP" />
              </Box>
            </React.Fragment>
          )}
        </div>
        {searchResult?.length === 0 && <ContainerSwitcher />}
        <MusicContainer />
      </div>
      {openSignUpDialog && (
        <SignUpFormDialog
          closeDialog={handleCloseSignUpDialog}
          openSuccessSnackBar={handleOpenSuccessSnackBar}
        />
      )}
      {openLoginDialog && (
        <LoginFormDialog
          closeDialog={handleCloseLoginDialog}
          openSuccessSnackBar={handleOpenSuccessSnackBar}
        />
      )}
      <Snackbar
        open={successSnackBarStatus.open}
        onClose={handleCloseSuccessSnackBar}
        message={successSnackBarStatus.message}
        autoHideDuration={4000}
      />
    </React.Fragment>
  )
}
