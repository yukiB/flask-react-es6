var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var browserSync = require('browser-sync');

var dependencies = [
	'react',
  	'react-dom'
];
var scriptsCount = 0;

gulp.task('browser-sync', function() {
  browserSync({
    proxy: {
      target: 'http://localhost:5000'
    },
    port: 8080
  });
});

gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function (){
	bundleApp(true);
});

gulp.task('watch', function () {
	gulp.watch(['./app/*.js'], ['scripts']);
	gulp.watch(['./templates/*.html'], ['scripts']);
});

gulp.task('default', ['scripts','watch', 'browser-sync']);

function bundleApp(isProduction) {
	scriptsCount++;
	var appBundler = browserify({
    	entries: './app/app.js',
    	debug: true
  	})

  	if (!isProduction && scriptsCount === 1){
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./static/scripts/js/'));
  	}
  	if (!isProduction){
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

  	appBundler
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('./static/scripts/js/'))
        .pipe(browserSync.reload({stream: true}));
}
