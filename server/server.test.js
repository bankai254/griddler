const { createServer } = require("node:http");
const { Server } = require("socket.io");
const ioc = require("socket.io-client");

const ROWS = 50;
const COLS = 80;

let gridState = new Array(ROWS * COLS).fill(false);

describe("Grid Server Tests", () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = ioc(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;

                console.log('A user connected: ' + socket.id);

                socket.on('toggleCell', (index) => {
                    gridState[index] = !gridState[index];
                    console.log('cellToggled', { index, state: gridState[index] });
                    io.emit('cellToggled', { index, state: gridState[index] });
                });

                socket.on('disconnect', () => {
                    console.log('A user disconnected: ' + socket.id);
                });
            });
            clientSocket.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.disconnect();
    });

    test("should load initial state", (done) => {
        clientSocket.on("initialState", (initialState) => {
            expect(initialState.every(cell => cell === false)).toBe(true);
            expect(initialState).toStrictEqual(gridState);
            done();
        });
        serverSocket.emit("initialState", gridState);
    });

    test('should handle cell toggle and emit updated state', (done) => {
        const cellIndex = 5;

        clientSocket.emit('toggleCell', cellIndex);

        clientSocket.on('cellToggled', ({ index, state }) => {
            expect(index).toBe(cellIndex);
            expect(state).toBe(true);
            done();
        });
    });
});