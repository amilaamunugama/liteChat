/**
 * Created by amilab on 5/23/17.
 */

module.exports = (function (req, res, next) {
    console.log("[" + (new Date()).toUTCString() + "]" + "request -> " + req.headers.host);
    next();
});
