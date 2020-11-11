
# Synopsis

## Project overview

Tone.js is a web audio library that allows you to encode and create interactive music directly in a browser. It is a very interesting framework from its target audience, musician programmers, and which allows to create interactive audio web applications. Tone allows you to program your music thanks to an event management and synchronization system, and some tools to create your own synthesizers. Today, no simple solution exists to experiment with this framework and to share our creations, whether for free or for a fee. 
We had the idea to build a platform where you can code music and share it to the community. 
The project will be structured in 3 parts (mockup to understand more easily : https://www.figma.com/file/Cch0aNV88402JWteEMK8DR/Caud.io)
First the music creation space where there will be one code editor for the music setup : importing samples, creating synthesizers, setting bpm, adding effects like reverb, distortion, ...; then the second editor will be the code to execute at each step of the music, in other words the samples, notes, chords to trigger. The user will be able to import audio samples, create and view his personal tree file structure and view specific sample details (duration, size, ...) and to play it. The user will also be able to invite other users on the creation space to code music live together (live sessions).
Secondly, the discovery space where users will be able to listen to creations from the community, to like them and to fork projects to make remixes
In the third place, the profile where the user will be able to see his creations and edit/delete them.


## Technical specifications

- Front-end :
 - React Framework
 - Redux
 - Material-UI library 
 - Ace code editor
 - Tone.js library 
 - Axios library for http calls
 - Socket.io for “live sessions”

- Back-end :
 - Node.js
 - Express 
 - Socket.io for “live sessions”
 - JWT for authentication and authorization 
 - PostgresQL database

- CI/CD pipeline :
 - Setup Heroku / Github CI


## Major steps for the development:

- Design phase:
 - Front design
 - Backend design
 - Database design
- Development phase: 
concurrent development Front and Back, priority given to CI/CD + tests after a week or two of github versioning. 
- Assessment phase: 
a week before the due date, stop development of further features and release v0.1 of the application, deployed and thoroughly tested with its release log.

- Workload distribution 
will be based on a per feature basis depending on personal interests:
User authentication flow
Music project Management flow
ToneJs engine + Ace Editor (not final)
Rest of UI/UX + Project management + Setting up deployment and CI
Testing strategy



## Objectives of initial prototype (from api perspective):

- Login 
- Sign up
- Get 10 light music objects (only metadata : image, title, author, nb likes, nb forks, nb listen) by most recent/liked/listened/forked
- Get next 10 light music objects by most recent/liked/listened/forked (without the previous ones)
- Get music content (get code + samples)
- Search music by keyword
- Listen music (increase listen counter)
- Like music (increase like counter + create notification)
- Fork music (increase fork counter + create notification)
- Get full music object
- Create music (code + samples + metadata)
- Update music
- Delete music
- Get 10 light music objects (only metadata : image, title, author, nb likes, nb forks, nb listen) by most recent/liked/listened/forked of an author (if music public)
- Get next 10 light music objects by most recent/liked/listened/forked of an author (without the previous ones, if music public)
- Get last 5 user notifications
- Get a live session code
- Get live session participants
- Socket.io events:
- live session participant joined
- live session participant left
- live session participant cursor position updated
- live session lines updated
- live session closed
