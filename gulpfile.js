var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsconfig = require("./tsconfig.json");

gulp.task('client-ts-build', function() {
	return gulp.src('src/client/**/*.ts')
		.pipe(ts(tsconfig.compilerOptions))
		.pipe(gulp.dest('web/js'));
})

gulp.task('client-build', ['client-ts-build']);

gulp.task('default', ['client-build']);
