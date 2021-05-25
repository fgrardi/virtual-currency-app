const {src, dest} = require("gulp");

function tryout(done){
    console.log("It works!");
    done();
}

exports.tryout = tryout;