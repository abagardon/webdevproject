'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var posthtml = require("gulp-posthtml");
var postcss = require("gulp-postcss");
var include = require("posthtml-include");
var plumber = require('gulp-plumber');
var autoprefixer = require("autoprefixer");
var del = require("del");
var run = require("run-sequence");
var imagemin = require("gulp-imagemin");
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');


var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: '*.html',
        js: 'js/*.js',
        style: 'scss/main.scss',
        img: 'img/**/*.{png,jpg,svg}',
        fonts: 'fonts/**/*.{woff,woff2}'
    },
    clean: './build'
};

gulp.task("html", function () {
    return gulp.src(path.src.html)
      .pipe(posthtml([
        include()
      ]))
      .pipe(gulp.dest(path.build.html))
      .pipe(server.stream());
});

gulp.task("style", function() {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest(path.build.css))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(path.build.css))
        .pipe(server.stream());
});

gulp.task('scripts', function() {
    return gulp.src(path.src.js)
      .pipe(concat('script.js'))
      .pipe(gulp.dest(path.build.js))
      .pipe(uglify())
      .pipe(rename("script.min.js"))
      .pipe(gulp.dest(path.build.js))
  });

gulp.task("copy", function () {
    return gulp.src([
      path.src.fonts,
      path.src.img
    ], {
      base: "."
    })
    .pipe(gulp.dest(path.build.html));
});

gulp.task("watch", function() {
    server.init({
      server: path.build.html
    });
    gulp.watch("scss/**/**/*.scss", ["style"]);
    gulp.watch("*.html", ["html"]);
});

gulp.task("clean", function () {
    return del(path.clean);
});

gulp.task("images", function () {
    return gulp.src(path.src.img)
        .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
        ]))
    .pipe(gulp.dest(path.build.img));
});

gulp.task("build", function (done) {
    run(
        "clean",
        "copy",
        "scripts",
        "style",
        "html",
        done
    );
});
