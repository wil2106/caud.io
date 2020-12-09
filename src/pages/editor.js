import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
import LoopIcon from '@material-ui/icons/Loop';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";


const drawerWidth = 240;

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
    height: 400,
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
    alignItems: "center",
    marginTop: 40,
    flexWrap: "wrap",
  },
  editorMenu: {
    display: "flex",
    alignItems: "center",
    backgroundColor:'#1E1F26',
    padding: 8
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
}));

export default function Editor(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Logo/> 
              </IconButton>
          </Link>
          <Typography variant="h6">Title</Typography>
          <Box className={classes.title}><IconButton style={{color:'white'}}><EditIcon /></IconButton></Box>
          <Box m={1}><Button variant="contained" className={classes.greenButton} disableElevation>Share</Button></Box>
          <Box m={1}><Button variant="contained" className={classes.greyButton} disableElevation>Save</Button></Box>
          <Box m={1}><Button variant="contained" className={classes.greyButton} disableElevation>Settings</Button></Box>
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
          <Box mx={2} mt={2} fontSize="h6.fontSize" style={{color: "#AAAEBC", fontWeight: "fontWeightRegular"}} textAlign="left">Files</Box>
          <List className={classes.sampleList}>
            {['kick.wav', 'hihat.wav', 'snare', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav', '808.wav'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} style={{color:"white"}}/>
              </ListItem>
            ))}
          </List>
          <Box m={2}>
            <Card className={classes.sampleCard}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Box flexGrow={1}>Title</Box>
                  <Box>
                    <PlayCircleOutlineIcon style={{color: "white", fontSize: "30"}}/> 
                  </Box>
                </Box>
                <Box>
                  Audio spectre
                </Box>
                <Box display="flex" mt={2}>
                  <Box flexGrow={1}>Duration: 3s</Box>
                  <Box>12Mb</Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </div>
      </Drawer>
      <div className={classes.content}>
        <Toolbar />
        <Box className={classes.editors}>
          <Box m={1}>
            <Box className={classes.editorMenu}>
              <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightMedium"}}>Setup</Box>
              <Box flexGrow={1} textAlign="left">
                <Tooltip title="Here you have to initialize instruments, import samples, add effects">
                  <HelpIcon style={{color: "#AAAEBC"}}/> 
                </Tooltip>
              </Box>
             <Box display="flex">
              <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightRegular"}}>Bpm</Box>
              <input type="number" className={classes.numberInput} min="0" max="300"/>
             </Box>
             <Box display="flex">
              <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightRegular"}}>Steps</Box>
              <input type="number" className={classes.numberInput} min="0" max="500"/>
             </Box>
            </Box>
            <AceEditor
              mode="ruby"
              theme="monokai"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </Box>
          <Box m={1}>
            <Box className={classes.editorMenu}>
              <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightMedium"}}>Step</Box>
              <Box flexGrow={1} textAlign="left">
                <Tooltip title="Here you have to define what instruments, samples to trigger at each steps of the music">
                  <HelpIcon style={{color: "#AAAEBC"}} /> 
                </Tooltip>
              </Box>
              <Box mx={1} style={{color: "#AAAEBC", fontWeight: "fontWeightRegular"}}>0 / 10</Box>
              <PlayCircleOutlineIcon style={{color: "#AAAEBC", fontSize: "30"}}/> 
              <LoopIcon style={{color: "#AAAEBC", fontSize: "30"}}/>
            </Box>
            <AceEditor
              mode="ruby"
              theme="monokai"
              name="UNIQUE_ID_OF_DIV2"
              editorProps={{ $blockScrolling: true }}
            />
          </Box>
        </Box>
      </div>
    </div>
  )
}


