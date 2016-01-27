var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var notify = require("gulp-notify");
var exorcist = require('exorcist');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');

var config = {
    publicPath: __dirname + '/web/js',
    app: {
        path: __dirname + '/src/client',
        main: 'app.tsx',
        result: 'app.bundle.js'
    }
};

/**
 * Build the client Typescript app.
 */
gulp.task('client-ts-build', function() {
	var bundler = browserify({
		basedir: config.app.path,
		debug: true
	})
		.add(config.app.path + '/' + config.app.main)
		.plugin(tsify);

	return bundler.bundle()
			.pipe(exorcist(config.publicPath + '/application.js.map'))
			.pipe(source(config.app.result))
			.pipe(gulp.dest(config.publicPath))
			.pipe(notify("Typescript Built"));
})

/**
 * Build the clinet Stylus styles.
 */
gulp.task('client-stylus-build', function() {
  return gulp.src('stylus/app.styl')
		.pipe(sourcemaps.init())
    .pipe(stylus())
		.pipe(sourcemaps.write('.'))
		.pipe(concat('app.bundle.css'))
    .pipe(gulp.dest('web/css'))
		.pipe(notify("Stylus Built"));
});

/**
 * Build everything for the client.
 */
gulp.task('client-build', ['client-ts-build', 'client-stylus-build']);

gulp.task('default', ['client-build']);

gulp.task('watch', ['client-ts-build', 'client-stylus-build'], function() {
	gulp.watch('src/client/**/*', ['client-ts-build']);
  gulp.watch('stylus/**/*', ['client-stylus-build']);
});
