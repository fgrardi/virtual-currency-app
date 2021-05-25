const {watch, src, dest} = require('gulp');
const sass = require('gulp-sass');

// function tryout(done){
//     console.log("It works!");
//     done();
// }

function sass2css(done){
	return src('./src/**/*.scss').pipe(sass().on("error", sass.logError)).pipe(gulp.dest('./public/stylesheets'));
	done();
}

exports.default = function(done) {
	watch('./src/**/*.scss', sass2css);
    done();
}

exports.sass2css = sass2css;
//exports.tryout = tryout;