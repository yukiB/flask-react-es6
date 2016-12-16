import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import gutil from 'gulp-util'
import babelify from 'babelify'
import browserSync from 'browser-sync'

const dependencies = [
	'react',
  	'react-dom'
];
let scriptsCount = 0;

gulp.task('browser-sync', () =>
  browserSync({
    proxy: {
      target: 'http://localhost:5000'
    },
    port: 5001
  }))

gulp.task('scripts', () =>
    bundleApp(false))

gulp.task('deploy', () =>
	bundleApp(true))

gulp.task('watch',  () => {
	gulp.watch(['./app/*.js'], ['scripts']);
	gulp.watch(['./app/components/*.js'], ['scripts']);
	gulp.watch(['./templates/*.html'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch', 'browser-sync']);

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
