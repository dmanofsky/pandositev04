const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Log Message
gulp.task('message', () =>
    console.log('Gulp is running...')
);

// -------------------------------prototype tasks ----------------------------------------

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src",
        port: 3000
    })

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass'])
    gulp.watch("src/*.html").on('change', browserSync.reload)
});

// -------------------------------image tasks ----------------------------------------

// Optimize images for public/assets
gulp.task('imageMin', function() {
	gulp.src('src/assets/icons/*')
		.pipe(imagemin())
        .pipe(gulp.dest('public/assets/icons'));
    gulp.src('src/assets/images/*')
		.pipe(imagemin())
        .pipe(gulp.dest('public/assets/images'));
    gulp.src('src/assets/logos/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/assets/logos'));
});

// -------------------------------build tasks ----------------------------------------

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>
    gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
);

// Move the HTML files into the /public folder
gulp.task('html', () =>
    gulp.src('src/*.html')
        .pipe(gulp.dest("public/"))
        .pipe(browserSync.stream())
);

// Move the CSS files into the /public/css folder
gulp.task('css', ['sass'], () =>
    gulp.src('src/css/*')
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream())
);

// Move the javascript files into the /public/js folder
gulp.task('js', () =>
    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("public/js"))
        .pipe(browserSync.stream())
);

//-----------------------------------high level tasks------------------------------------

gulp.task('default', ['message','serve']);

gulp.task('build', ['message','html','css','js']);

gulp.task('images', ['imageMin']);