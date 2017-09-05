var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
cssnested = require('postcss-nested'),
ext_replace = require('gulp-ext-replace'),
cssimport = require('postcss-import');

gulp.task('default', () => console.log('hooray!'));
gulp.task('html', () => console.log('imagine something useful being done to our html here'))
gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.pcss')
        .pipe(postcss([cssimport, cssvars, cssnested, autoprefixer]))
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest('./app/temp/styles'));
})
gulp.task('watch', function() {
    watch('./app/index.html', () => {
        gulp.start('html');
    })
    watch('./app/assets/styles/**/*.pcss', () => {
        gulp.start('styles');
    })
    
})
