# Griddler

This is a simple client/server program to understand basic skills on both client and server as well as presentation skills. The Client is vanilla JS, HTML and inline CSS. Server is built on Node.js with Express. Uses websockets to share cell state between clients.

**NB:** There is a file named `grid_plain_poc.html` in the root folder that served as a PoC for the the rendering of the grid, cell toggling and undoing feature on the client only.

## Installation

```bash
cd server
npm install
```

## Usage

### Run Griddler

Inside the `server` folder

```bash
node server.js
```

#### Open Browser

[http://localhost:3000](http://localhost:3000)

Open a more than one tab or browsers to enjoy multiuser cell toggling

### Running Tests

Inside the `server` folder

```bash
npm test
```
