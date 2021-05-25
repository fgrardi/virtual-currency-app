const {watch, src, dest} = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

// function tryout(done){
//     console.log("It works!");
//     done();
// }

function sass2css(done){
	return src('./src/**/*.scss').pipe(sass().on("error", sass.logError)).pipe(gulp.dest('./public/stylesheets'));
	done();
}

function cssminify(done){
    return src("./public/stylesheets/*.css").pipe(cleanCSS({compatibility: "ie8"})).pipe(dest("./public/cssminify"));
    done();
}

exports.default = function(done) {
	watch('./src/**/*.scss', sass2css);
    done();
}

exports.sass2css = sass2css;
exports.cssminify = cssminify;
//exports.tryout = tryout;