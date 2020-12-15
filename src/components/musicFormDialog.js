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
import { createMusic, updateMusic, setNewMusicError } from '../app/musicPackSlice'
import { selectNewMusicError, selectNewMusicLoading } from '../app/musicPackSlice'
import { useHistory } from 'react-router-dom'

const styles = theme => ({
  media: {
    height: 200,
    width: 200
  },
  input: {
    display: 'none',
  },
  colorPrimary: {
    backgroundColor: 'white',
  },
  barColorPrimary: {
    backgroundColor: '#47CF73',
  },
});


function FormDialog(props) {
 
  const { closeDialog, classes, openSuccessSnackBar, setupCode, stepCode, bpm, nbSteps, samples, mode, musicObject} = props

  

  const [title, setTitle] = useState(musicObject ? musicObject.title : '')
  const [image, setImage] = useState(musicObject ? musicObject.image : '')
  const [canFork, setCanFork] = useState(musicObject ? musicObject.can_fork : true)
  const [isPrivate, setIsPrivate] = useState(musicObject ? musicObject.private : false);

  const history = useHistory()
  const dispatch = useDispatch()
  const loading = useSelector(selectNewMusicLoading)
  const error = useSelector(selectNewMusicError)

  const handleClose = () => {
    closeDialog()
  }

  const handleImageChange = async (files) => {
    let base64 = await createBase64String(files[0])
    setImage(base64)
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

  const handlePost = async () => {
    if(title.trim() === ""){
      dispatch(setNewMusicError('Music must have a title'))
      return;
    }
    let formattedImageString = removeMetaData(image)
    let music = {
      title: title, 
      image: formattedImageString, 
      canFork: canFork, 
      isPrivate: isPrivate, 
      bpm: bpm, 
      nbSteps: nbSteps, 
      setupCode: setupCode, 
      stepCode: stepCode, 
      samples: samples
    }
    dispatch(createMusic(music, ()=>{
      closeDialog()
      history.push('/')
    }))
  }


  const handleSave = async () => {
    if(title.trim() === ""){
      dispatch(setNewMusicError('Music must have a title'))
      return;
    }
    let formattedImageString = removeMetaData(image)
    let music = {
      title: title, 
      image: formattedImageString, 
      canFork: canFork, 
      isPrivate: isPrivate, 
      bpm: bpm, 
      nbSteps: nbSteps, 
      setupCode: setupCode, 
      stepCode: stepCode, 
      id: musicObject.id
    }
    dispatch(updateMusic(music, ()=>{
      closeDialog()
      history.push('/')
    }))
    
  }

  
  return (
    <Dialog open={true} aria-labelledby="form-dialog-title" fullWidth={true} 
       PaperProps={{style: {backgroundColor: '#131417'}}}
    >
      <DialogTitle><Box color="white" display="flex">{mode === "edit" ? "Edit music" : "New music" }</Box></DialogTitle>
      <DialogContent>
        <Box m={1} display="flex">
          <Box>
              {
                image === "" ?
                <Box className={classes.media} style={{backgroundColor:"#1E1F26", color: "#AAAEBC"}} display="flex" alignItems="center" justifyContent="center">
                  No image
                </Box>
                :
                <img src={image} alt="Music image" className={classes.media}></img>
              }
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
            <TextField onChange = {handleTitleChange} placeholder="Title" disabled={loading} value={title}/>
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
          <GreyButton onClick={handleClose} text="CANCEL" disabled={loading}/>
          {
            mode === "edit" ?
            <GreenButton onClick={handleSave} text="Save" disabled={loading}/>
            :
            <GreenButton onClick={handlePost} text="POST" disabled={loading}/>
          }
          
      </DialogActions>
      {loading && <LinearProgress classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}/>}
    </Dialog>
  );
}


function createBase64String(fileObject){
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(fileObject)
    reader.onerror = error => reject(error);
  })
}

function removeMetaData(string){
  return string.split(',')[1]
}



export default withStyles(styles)(FormDialog);