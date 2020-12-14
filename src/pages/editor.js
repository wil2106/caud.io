import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";

import AceEditor from "react-ace";

import Logo from './../assets/svg/logo2'

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';
import LoopIcon from '@material-ui/icons/Loop';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import DeleteIcon from '@material-ui/icons/Delete';

import GreenButton from './../components/greenButton'
import GreyButton from './../components/greyButton'

import NewMusicDialog from '../components/newMusicFormDialog'
import SignUpFormDialog from './../components/signUpFormDialog'
import LoginFormDialog from './../components/loginFormDialog'

import Snackbar from '@material-ui/core/Snackbar'

import ProfileIndicator from '../components/profileIndicator'

import { selectLogin } from '../app/userSlice'

import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";

import MusicPlayer from '../models/MusicPlayer'

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%"
  },
  appBar: {
    //boxShadow: "none",
    backgroundColor: "#1E1F26",
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1E1F26",
  },
  sampleList: {
    maxHeight: 400,
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  greenButton: {
    backgroundColor:'#47CF73'
  },
  greyButton: {
    backgroundColor:'#444857',
    color:'white'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  editors: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    flexWrap: "wrap",
  },
  editorMenu: {
    display: "flex",
    alignItems: "center",
    backgroundColor:'#1E1F26',
    padding: 8,
    maxWidth: 484,
    flexWrap: "wrap"
  },
  editorAvailableVariables: {
    backgroundColor:'#1E1F26',
    padding: 8,
    maxWidth: 484,
  },
  editorErrorConsole: {
    display: "flex",
    alignItems: "center",
    backgroundColor:'#1E1E1E',
    color: '#CD2822',
    padding: 8,
    maxWidth: 484,
    flexWrap: "wrap"
  },
  numberInput: {
    backgroundColor: "#252830",
    color: "white"
  },
  sampleCard: {
    backgroundColor: "#252830",
    height: "200",
    textAlign: "left",
    color: "white"
  },
  input: {
    display: 'none',
  }
}));
let musicPlayer = new MusicPlayer();

export default function Editor(props) {
  const classes = useStyles();
  
  const [openAudioContextDialog, setOpenAudioContextDialog] = useState(false);

  const [bpm, setBpm] = useState(0);
  const [nbSteps, setNbSteps] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(true);
  const [step, setStep] = useState(0);
  const [synthVariables, setSynthVariables] = useState([]);
  const [sampleVariables, setSampleVariables] = useState([]);

  const [isReady, setIsReady] = useState(false);

  const [setupCode, setSetupCode] = useState('');
  const [stepCode, setStepCode] = useState('');

  const [setupCodeError, setSetupCodeError] = useState('');
  const [stepCodeError, setStepCodeError] = useState('');

  const [samples, setSamples] = useState([]);

  const [selectedSample, setSelectedSample] = useState();

  const [openNewMusicDialog, setOpenNewMusicDialog] = React.useState(false)

  const [openSignUpDialog, setOpenSignUpDialog] = React.useState(false)
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false)

  const [successSnackBarStatus, setSuccessSnackBarStatus] = React.useState({
    open: false,
    message: '',
  })


  const userLogin = useSelector(selectLogin)

  useEffect(() => {
    if(!musicPlayer.isAudioContextStarted()){
      setOpenAudioContextDialog(true)
    }
    musicPlayer.stepIndexUpdateCallback = handleStepChange
    musicPlayer.synthsVariablesUpdateCallback = handleSynthVariablesChange
    musicPlayer.samplesVariablesUpdateCallback = handleSampleVariablesChange

    musicPlayer.setupCodeErrorCallBack = handleSetupCodeErrorChange
    musicPlayer.stepCodeErrorCallBack = handleStepCodeErrorChange

    setTimeout(()=>{
      let theNbSteps = 10;
      let theBpm = 80;
      let theSetupCode = 'this.synths.amsynth = new ToneJS.PluckSynth().toMaster()'
      let theStepCode = 'this.synths.amsynth.triggerAttackRelease("C4", "32n")'
      musicPlayer.initialize(theBpm, theNbSteps, theSetupCode, theStepCode)
      setBpm(theBpm)
      setNbSteps(theNbSteps)
      setSetupCode(theSetupCode)
      setStepCode(theStepCode)
      setIsReady(true)
    }, 2000); 
  }, [])

  const handleStartAudioContextAndCloseDialog = () => {
    musicPlayer.startAudioContext()
    setOpenAudioContextDialog(false)
  }

  const handleSetupCodeChange = (newValue) => {
    setSetupCode(newValue)
    musicPlayer.setupCode = newValue
  }

  const handleStepCodeChange = (newValue) => {
    setStepCode(newValue)
    musicPlayer.stepCode = newValue
  }

  const handleBpmChange = (e) => {
    setBpm(e.target.value)
    musicPlayer.bpm = e.target.value
  }

  const handleNbStepsChange = (e) => {
    setNbSteps(e.target.value)
    musicPlayer.nbSteps = e.target.value
    setIsMusicPlaying(false)
  }

  const handlePlayMusic = (e) => {
    setIsMusicPlaying(true)
    musicPlayer.play()
  }

  const handleStopMusic = (e) => {
    setIsMusicPlaying(false)
    musicPlayer.stop()
  }

  const handleLoop = () => {
    musicPlayer.loop = true
    setIsLoop(true)
    setIsMusicPlaying(false)
  }

  const handleDontLoop = () => {
    musicPlayer.loop = false
    setIsLoop(false)
    setIsMusicPlaying(false)
  }

  const handleStepChange = (step) => {
    setStep(step) 
  }

  const handleSynthVariablesChange = (synthVariables) => {
    setSynthVariables(synthVariables)
  }

  const handleSampleVariablesChange = (sampleVariables) => {
    setSampleVariables(sampleVariables)
  }

  const handleSetupCodeErrorChange = (error) => {
    setSetupCodeError(error)
  }

  const handleStepCodeErrorChange = (error) => {
    setStepCodeError(error)
  }

  const handleSampleAdd = (files) => {
    setSamples((state)=>[...state, ...files])
    musicPlayer.loadSamples(files);
  }

  const handleSampleDelete = (index) => {
    musicPlayer.removeSample(samples[index].name.split(".")[0].toLowerCase())
    setSamples((state)=>state.filter( (sample, idx) => idx !== index))   
    if(selectedSample && (selectedSample.name === samples[index].name)){
      setSelectedSample()
    }
  }

  const handleSampleSelect = (index) => {
    setSelectedSample(samples[index]);
  }

  const handleCloseNewMusicDialog = () => {
    setOpenNewMusicDialog(false)
  }

  const handleOpenNewMusicDialog = () => {
    setOpenNewMusicDialog(true)
  }

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


  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Logo/> 
              </IconButton>
          </Link>
          <Box className={classes.title}>
            <IconButton style={{color:'white'}}/>
          </Box>
          {userLogin ? (
            <Box display="flex" alignItems="center">
              <GreenButton onClick={handleOpenNewMusicDialog} text="CREATE" />
              <GreyButton onClick={null} text="SHARE" />
              <ProfileIndicator />
            </Box>
          ) : (
            <Box display="flex">
              <Box>
                <GreenButton onClick={handleOpenLoginDialog} text="LOGIN" />
              </Box>
              <Box>
                <GreyButton onClick={handleOpenSignUpDialog} text="SIGN UP" />
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div>
          <Box display="flex" alignItems="center" mt={1}>
            <Box fontSize="h6.fontSize" style={{color: "#AAAEBC", fontWeight: "fontWeightRegular", marginLeft: 15}} 
            flexGrow={1} justifyContent="flex-start" display="flex">Files</Box>
            <input accept="audio/*" className={classes.input} id="files" type="file" onChange={ (e) => handleSampleAdd(e.target.files) }
            webkitfile="true" multiple/>
            <label htmlFor="files">
              <IconButton color="primary" component="span">
                <SystemUpdateAltIcon style={{ color: '#AAAEBC'}}/>
              </IconButton>
            </label>
          </Box>
          <Divider />
          <List className={classes.sampleList}>
            {samples.map((file, index) => (
              <ListItem button key={index} onClick={()=>handleSampleSelect(index)} selected={selectedSample && selectedSample.name === samples[index].name}>
                <ListItemText primary={file.name} style={{color:"white"}}/>
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={()=>handleSampleDelete(index)}>
                    <DeleteIcon style={{ color: '#AAAEBC'}}/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {
            selectedSample && 
            <Box m={2}>
              <Card className={classes.sampleCard}>
                <CardContent>
                  <Box display="flex">
                    <Box flexGrow={1}>{selectedSample.name}</Box>
                    <Box>{selectedSample.size} b</Box>
                  </Box>
                  <audio controls src={URL.createObjectURL(selectedSample)} style={{width: 250, marginTop: 10}}>
                      Your browser does not support the
                      <code>audio</code> element.
                  </audio>
                </CardContent>
              </Card>
            </Box>
          }
          
        </div>
      </Drawer>
      <div className={classes.content}>
        <Toolbar />
        <Box className={classes.editors}>
          {
            isReady ?
            <React.Fragment>
              <Box m={1}>
                <Box className={classes.editorMenu}>
                  <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightMedium"}}>Setup code</Box>
                  <Box flexGrow={1} textAlign="left">
                    <Tooltip title="Here you have to initialize instruments, add effects">
                      <HelpIcon style={{color: "#AAAEBC"}}/> 
                    </Tooltip>
                  </Box>
                <Box display="flex">
                  <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightRegular"}}>Bpm</Box>
                  <input type="number" className={classes.numberInput} min="0" max="300" value={bpm} onChange={handleBpmChange}/>
                </Box>
                <Box display="flex">
                  <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightRegular"}}>Steps</Box>
                  <input type="number" className={classes.numberInput} min="0" max="500" value={nbSteps} onChange={handleNbStepsChange}/>
                </Box>
                </Box>
                <AceEditor
                  mode="ruby"
                  theme="monokai"
                  name="SETUP_EDITOR"
                  onChange={handleSetupCodeChange}
                  editorProps={{ $blockScrolling: true }}
                  value={setupCode}
                />
                {setupCodeError && <Box className={classes.editorErrorConsole}>{setupCodeError}</Box>}
              </Box>
              <Box m={1}>
                <Box className={classes.editorMenu}>
                  <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightMedium"}}>Step code</Box>
                  <Box flexGrow={1} textAlign="left">
                    <Tooltip title="Here you have to define what instruments/samples to trigger at each steps of the music">
                      <HelpIcon style={{color: "#AAAEBC"}} /> 
                    </Tooltip>
                  </Box>
                  <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightRegular"}}>{step} / {nbSteps-1}</Box>

                  {isMusicPlaying ?  <StopIcon onClick={handleStopMusic} style={{color: "#CE4848", fontSize: "30", cursor: 'pointer'}}/> 
                  : <PlayCircleOutlineIcon onClick={handlePlayMusic} style={{color: "#47CF73", fontSize: "30", cursor: 'pointer'}}/>}
                  {isLoop ? <LoopIcon style={{color: "#AAAEBC", fontSize: "30", cursor: 'pointer'}} onClick={handleDontLoop}/>:
                  <LoopIcon style={{color: "#5F6168", fontSize: "30", cursor: 'pointer'}} onClick={handleLoop}/>
                  }
                  
                </Box>
                <AceEditor
                  mode="ruby"
                  theme="monokai"
                  name="STEP_EDITOR"
                  onChange={handleStepCodeChange}
                  editorProps={{ $blockScrolling: true }}
                  value={stepCode}
                />
                {stepCodeError && <Box className={classes.editorErrorConsole}>{stepCodeError}</Box>}
                <Box className={classes.editorAvailableVariables}>
                  <Box style={{color: "#AAAEBC"}} justifyContent="flex-start" display="flex">Available variables:</Box>
                  <Box display="flex" alignItems="center">
                    <Box borderRadius={5} style={{color: "white", backgroundColor: "#CC7847", margin: 2, padding: 4}}>step</Box>
                    {
                      synthVariables.map((synthVariable, index)=>
                      <Box key={`${index}-${synthVariable}`} borderRadius={5} style={{color: "white", backgroundColor: "#5F47CC", margin: 2, padding: 4}}>{synthVariable}</Box>)
                    }
                    {
                      sampleVariables.map((sampleVariable, index)=>
                      <Box key={`${index}-${sampleVariable}`} borderRadius={5} style={{color: "white", backgroundColor: "#CC4747", margin: 2, padding: 4}}>{sampleVariable}</Box>)
                    }
                  </Box>
                </Box>
              </Box>
            </React.Fragment>
            :
            <CircularProgress style={{'color': '#47CF73'}}/>
          }
        </Box>
      </div>
      <div>
        <Dialog
          open={openAudioContextDialog}
        >
          <DialogTitle>✋ Audio context authorization</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you allow this website to play audio ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStartAudioContextAndCloseDialog} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {openNewMusicDialog && (
        <NewMusicDialog
          closeDialog={handleCloseNewMusicDialog}
          setupCode={setupCode}
          stepCode={stepCode}
          bpm={bpm}
          nbSteps={nbSteps}
          samples={samples}
        />
      )}
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
    </div>
  )
}


