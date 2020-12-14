import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import GreenButton from './greenButton'
import GreyButton from './greyButton'
import Box from '@material-ui/core/Box';
import TextField from './textField'
import LinearProgress from '@material-ui/core/LinearProgress';
import CustomAlert from './customAlert'
import CardMedia from '@material-ui/core/CardMedia';
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector, useDispatch } from 'react-redux'

const styles = theme => ({
  media: {
    height: 200,
    width: 200
  },
  input: {
    display: 'none',
  }
});


function FormDialog(props) {

  const loading = false//useSelector(null)
  const error = 'test'//useSelector(null)
 
  const { closeDialog, classes, openSuccessSnackBar, setupCode, stepCode, bpm, nbSteps, samples} = props

  console.log(setupCode, stepCode, bpm, nbSteps, samples)

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [canFork, setCanFork] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleClose = () => {
    closeDialog()
  }

  const handleImageChange = (files) => {
    let url = URL.createObjectURL(files[0])
    console.log(url)
    setImage(url)
    //setImage()
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleIsPrivateChange = (e) => {
    setIsPrivate(e.target.checked)
  }

  const handleCanForkChange = (e) => {
    setCanFork(e.target.checked)
  }

  const handleImageClear = () => {
    setImage('')
  }

  
  return (
    <Dialog open={true} aria-labelledby="form-dialog-title" fullWidth={true} 
       PaperProps={{style: {backgroundColor: '#131417'}}}
    >
      <DialogTitle><Box color="white" display="flex">New music</Box></DialogTitle>
      <DialogContent>
        <Box m={1} display="flex">
          <Box>
            <Box style={{backgroundColor:"#1E1F26"}}>
              <CardMedia
                className={classes.media}
                image={image}
                title="Music image"
              />
            </Box>
            <Box display="flex" alignItems="center" m={1} justifyContent="center">
              
              {
                image === "" ?
                <React.Fragment>
                  <input accept="image/*" className={classes.input} id="icon-button-file" type="file" 
                  onChange={(e)=>handleImageChange(e.target.files)}/>
                  <label htmlFor="icon-button-file">
                    <Button variant="contained" color="default" component="span"
                    startIcon={<ImageIcon/>}>
                      Upload
                    </Button>
                  </label>
                </React.Fragment>
                :
                <Button variant="contained" color="default" component="span"
                 startIcon={<ClearIcon/>} onClick={handleImageClear}>
                  Clear
                </Button>
              }
              
            </Box>
          </Box>
          <Box flexGrow={1}>
            <TextField onChange = {handleTitleChange} placeholder="Title" disabled={loading}/>
            <FormControlLabel
                value="start"
                control={<Checkbox style={{color: 'white'}} checked={isPrivate} onChange={handleIsPrivateChange}/>}
                label="is private ?"
                labelPlacement="start"
                style={{color: '#AAAEBC'}}
            />
            {
              !isPrivate &&
              <FormControlLabel
                value="start"
                control={<Checkbox style={{color: 'white'}} checked={canFork}  onChange={handleCanForkChange}/>}
                label="Can other user fork music ?"
                labelPlacement="start"
                style={{color: '#AAAEBC'}}
            />
            }
          </Box>
        </Box>
        
        {error && <CustomAlert text={error}/>}
      </DialogContent>
      <DialogActions>
          <GreyButton onClick={closeDialog} text="CANCEL" disabled={false}/>
          <GreenButton onClick={null} text="POST" disabled={false}/>
      </DialogActions>
      {loading && <LinearProgress classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}/>}
    </Dialog>
  );
}


export default withStyles(styles)(FormDialog);