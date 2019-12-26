const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');
 
// gulp.task('back-js', function () {    
//     return gulp.src(['public/js/*.js'])
//         .pipe(concat('bundle.js'))
//         .pipe(minify({
//             ext:{
//                 min:'.js'
//             },
//             noSource: true
//         }))
//         .pipe(gulp.dest('public/build/js'));
// });
 
gulp.task('back-css', function () {    
    return gulp.src(['public/css/*.css'])
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('public/build/css'));
});

gulp.task('default',  gulp.parallel('back-css'));