
module.exports = {
    connectSockets,
    emitTaskUpdate,
};

let ioSocket = null;

function emitTaskUpdate(task) {
    ioSocket.emit('task-updated', task)
}

function connectSockets(io) {
    ioSocket = io;
    io.on('connection', socket => {
        socket.on('entered-task-manager', () => {
            // if (socket.currBoardId) {
            //     socket.leave(socket.currBoardId)
            // }
            // socket.join(boardId)
            // socket.currBoardId = boardId;
            console.log('connected')
        })
    })
}