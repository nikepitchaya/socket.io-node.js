const app = require('express')();
const server = require('http').createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);

const fs = require('fs')
const index = fs.readFileSync('./index.html', 'utf-8')

app.get('/', (req, res) => {
    res.end(index)
})

io.on('connection', (socket) => {
    console.log('client connected');
    // ดัก Event ที่มาจากฝั่ง Client : socket.on('ชื่อ Event(ต้องตรงกับฝั่งหน้าบ้าน)',callback function)
    socket.on('chat msg', (props) => {
        console.log(`${props.name} : ` + props.msg)
        io.emit('chat msg', props);
    })

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

server.listen(5000, (() => {
    console.log('Start server at port 5000')
}))