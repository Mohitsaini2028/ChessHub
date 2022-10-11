# ChessHub
1. clone the repository
2. Run npm install
3. Run npm run start
4. open browser http://localhost:8080

---
## File Structure

<li><b>app->config</b> - database configuration</li>
<li><b>app->controllers</b> - routes and server-side events</li>
<li><b>app->models</b> - schema</li>
<li><b>app->views</b> - template</li>
<li><b>public</b> - static files like css, images, and js</li>
<li><b>index.js</b> - entry point of the application</li>

## Technology-
```Node.js``` ```Express``` ```MongoDB``` ```HTML``` ```CSS``` ```JS``` 

I have used Node.js in this project because it is perfect for real time communication and in the required chess game we have to update the data in real-time basis.
I have used socket library for establishing real-time connection. 

## Events 
<h4> socketServer.js (File) </h4>

<li><b>submitName</b> - This event will fire when a user enter his name for registration. </li>
<li><b>sendJoinRequest</b> - This event will fire when a user send join game request from server side.</li>
<li><b>acceptGameRequest</b> - This event will fire when a user accept the game request. </li>
<li><b>chessMove</b> - This event will fire when a user move chess pieces. It will send a broadcast of movement of chess peices.
<li><b>gameWon</b> - This event will fire when a user won a game.
<li><b>disconnect</b> - This event will fire when a user left the room. It will remove the current user from the user's array.

<h4> socketClient.js (File) </h4>
<li><b>joinRequestRecieved</b> - This event will fire when a user recieved join game request. </li>
<li><b>joinGameRequest</b> - This event will fire when a user send join game request from client side.</li>
<li><b>gameRequestAccepted</b> - This event will fire when opponent accept the join request. </li>
<li><b>opponentDisconnect</b> - This event will fire when a opponent left the room. It will reset the chessboard. </li>


<h4> chess.js (File) </h4>
<li><b>oppntWon</b> - It will fire when opponent won. </li>
<li><b>oppntChessMove</b> - It will fire when opponent move the chess pieces. </li>


## Functions
<h4> chess.js (File) </h4>
<li><b>onDragStart</b> - This function check keep track of the game stage. If the user won or lost it will display message.</li>
<li><b>onDragStart</b> - This function check keep track of the user move. It will check if the move is possible or not and after the condition satisfaction the move is made.</li>
<li><b>updateStatus</b> - This function update move color, check checkmate condition,and check draw conditon.</li>

## API Url
<li><b>/move/</b> - It will create or append the move.</li>
<li><b>/move/:id/</b> - It will fetch the all the moves of the room, provided in the query parameter.</li>

## Database
I have used MongoDB because it can handle variety of data and huge amount of data. It offers a MongoDB Node.js Driver which provides a JavaScript API and implements the network protocol required to read and write from a local or remote MongoDB database.

<h4>Database configuration path - </h4> app->config->database.js

<h4>Models</h4>
Models contain the schema document.
Match is the name of Schema which store the game information, id of user and moves.

## Entity Relationship Diagram
![er chess](https://user-images.githubusercontent.com/66358041/195057944-7add42db-b3c2-48f2-a724-9d94f96dda62.png)

<h5>match</h5>
<li><b>roomId</b> - It is the primary key</li>
<li>moves</b> - It is the array which store id of the moves.</li>


<h5>moves</h5>
<li><b>move_id</b> - It is the primary key.</li>
<li><b>color</b> - It store the color of the move peice.</li>
<li><b>from</b> - From where the peice has moved.</li>
<li><b>to</b> - to which position the peice will move.</li>
<li><b>peice</b> - It represent the peice type.</li>



---
## Work Overview
### `Landing Page`
![chrome_EMWd7M29hM](https://user-images.githubusercontent.com/66358041/195047349-64735bdb-6026-4e79-8496-ddf71cb5365e.png)

### `Game request`
Game request send | receiver's end
:-------------------------:|:-------------------------:|
![chrome_DMMoWD7bQo](https://user-images.githubusercontent.com/66358041/195049706-3ede0e6c-367d-4759-a060-0cbeff070592.png) | ![chrome_J0q8DIch3z](https://user-images.githubusercontent.com/66358041/195049743-ca9532af-f06a-451c-96a6-b8085ab7fc35.png)

### `Game Stage`
![chrome_gtgCePJ0vT](https://user-images.githubusercontent.com/66358041/195050743-17d959f1-e1aa-4d1b-bd10-e33eded43cdb.png)

### `Get moves data`
![chrome_TWsUkEgpVP](https://user-images.githubusercontent.com/66358041/195052018-5236bf47-ac43-4b71-9da5-cfd5ab27af7f.png)


