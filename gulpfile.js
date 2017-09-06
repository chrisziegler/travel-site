var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
cssnested = require('postcss-nested'),
ext_replace = require('gulp-ext-replace'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

gulp.task('default', () => console.log('hooray!'));
gulp.task('html', () => console.log('imagine something useful being done to our html here'))
gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.pcss')
        .pipe(postcss([cssImport, cssvars, cssnested, autoprefixer]))
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest('./app/temp/styles'));
})
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    watch('./app/index.html', () => {
        browserSync.reload();
    });
    watch('./app/assets/styles/**/*.pcss', () => {
        gulp.start('cssInject');
    });
    
});

gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
});
