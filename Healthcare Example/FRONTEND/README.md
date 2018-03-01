

# Medusa Enterprise Edition (or Title To Be Determined)

## How to run
 - `npm install`
 - `npm start`

## What is the purpose of this?
 - To do a code review of the existing front-end to catch bugs
 - To get less support for ant design global variables, as well as scss support through webpack
 - Integrate redux which will be necessary as the project grows, and is necessary now in order to take sensitive data out of local storage (tokens!)
 - Fractal design to allow modular css and better folder structure

## Biggest Change
 - Scaffolded from this library seed https://github.com/MacKentoch/react-redux-antdesign-webpack-starter
  which includes most of the webpack integration needed out of the box. Over engineered, so many features removed for easier parsing. *Only actual project code occurs in the src folder, everything else is scaffolding*

## Current Roadblock
 - I can register a new user with the supplied credentials from Dom, however when trying to login with that user I get *401 Not Authorized*. I suspect the server may be down **I may have crashed it, woopsy doopsy**

## Yet to Do
 - Many things, but specifically any/all UI changes that need to occur, including the tree view of the folders.

## Going Forward
  - Is the juice worth the squeeze?
  - Please take a look and determine if it would be worthwhile to migrate to this platform or if it would be more effort than it is worth. If that is the case I can move on to something else.
