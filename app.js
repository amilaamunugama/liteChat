var express = require('express');
var app = express();

var server = require('http').Server(app);
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');

var io = require('socket.io')(server);
var sharedSession = require("express-socket.io-session");

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//session maintaining
app.use(cookieParser());
var sessionMiddleware = session({
    secret: "Shh, its a secret!",
    resave: true,
    saveUninitialized: true
});
app.use(sessionMiddleware);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//to make public folder externally accessible
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/socket.io-client/dist')));

io.use(sharedSession(sessionMiddleware));
io.on('connection', function (socket) {

    if (!socket.handshake.session.userName) {
        socket.emit("loginRequest", "");
    }
    socket.on("login", function (data) {
        socket.handshake.session.userName = data;
        socket.handshake.session.save();
    });

    socket.on('message', function (data) {
        var userName = socket.handshake.session.userName;
        var message = data;
        console.log(userName, message);
        io.sockets.emit("displayMessage", {
            userName: userName,
            message: message
        });
    });
});

app.get('/', function (req, res) {
    res.render("main");
});

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

