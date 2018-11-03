var gulp = require("gulp"); // Load Gulp!
// Now that we've installed the uglify package we can require it:
var uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    babel = require("gulp-babel"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    prettyError = require("gulp-prettyerror"),
    rename = require("gulp-rename");


gulp.task("scripts", function () {
    return gulp
        .src("./js/*.js") // What files do we want gulp to consume?
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel())
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
        .pipe(gulp.dest("./build/js"));// Where do we put the result?

});

gulp.task('load', function () {
    browserSync.reload();
});

gulp.task("sass", function () {
    return gulp
        .src("./sass/style.scss")
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest("./build/css"))
        .pipe(cssnano())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./build/css"));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('js/*.js', gulp.series('scripts', 'load'));
});

gulp.task('default', gulp.series('scripts', 'browser-sync'));