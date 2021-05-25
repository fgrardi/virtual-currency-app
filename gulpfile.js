const {watch, src, dest} = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

// function tryout(done){
//     console.log("It works!");
//     done();
// }

function sass2css(done){
	return src('./src/**/*.scss')
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
	done();
}

function cssminify(done){
    return src("./public/stylesheets/*.css")
    .pipe(cleanCSS({compatibility: "ie8"}))
    .pipe(dest("./public/cssminify"));
    done();
}

function jsminify(done){
    return src("./public/js/*.js")
    .pipe(jsmin()).pipe(rename({suffix: ".min"}))
    .pipe(dest("./public/minified_js"));
    done();
}

exports.default = function(done) {
	watch('./src/**/*.scss', sass2css);
    done();
}

exports.sass2css = sass2css;
exports.cssminify = cssminify;
exports.jsminify = jsminify;
//exports.tryout = tryout;