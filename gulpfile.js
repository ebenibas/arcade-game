const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const imageMin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("autoprefix", () =>
  gulp
.src("./src/css/*.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("./src/css"))
);
gulp.task("images", () => {
  return gulp
    .src("./src/images")
    .pipe(imageMin())
    .pipe(gulp.dest("./src/images"));
});
gulp.task("javascript", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./src/js"));
});
gulp.task("copy-index", () => {
  return gulp.src("./index.html").pipe(gulp.dest("./dest"));
});

gulp.task(
  "all",
  gulp.series("copy-index", "javascript", "images", "autoprefix", () => {
    gulp.watch("./src/js/**/*.js", gulp.series("javascript"));
    gulp.watch("./src/css/**/*.css", gulp.series("autoprefix"));
    gulp.watch("./src/index.html", gulp.series("copy-index"));
  })
);
