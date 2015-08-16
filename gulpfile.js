/**
*   IMPORT NODE REQUIRED NODE PACKAGES
**/
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    mainBowerFiles = require("main-bower-files"),
		fileSort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    angularFileSort = require('gulp-angular-filesort'),
    del = require('del');

  /**
  *   SET PATH VARIABLES
  **/
var paths = {
  // Destinations
  temp: 'temp',
  tempVendor: 'temp/resources/js/vendor',
  tempStyles: 'temp/resources/css',
  tempStylesVendor: 'temp/resources/css/vendor',
  tempStylesFonts: 'temp/resources/css/fonts',

  tempIndex:  'temp/index.html',

  // Source
  index: 'app/index.html',
  appSrc:  ['app/**/*.js', '!app/index.html'],
  appStyles: 'app/resources/styles/**/*.css',
  bowerSrc: 'bower_components/**/*'

};

gulp.task('default', ['watch']);

/*Watch Files*/
gulp.task('watch', ['serve'], function(){
	gulp.watch(paths.appSrc, ['scripts']);
  gulp.watch(paths.appStyles, ['styles']);
	gulp.watch(paths.bowerSrc, ['vendors']);
	gulp.watch(paths.index, ['copyAll']);
});

/* Serving Files */
gulp.task('serve', ['copyAll'], function(){

	return gulp.src(paths.temp)
			.pipe(webserver({
				livereload: true,
				proxies: [{
						source: '/api',
						target: 'http://localhost:1337'
				}]
			}));
});

gulp.task('copyAll', function(){

    // Scripts
		var tempVendors = gulp.src(mainBowerFiles({ filter: /.*\.js$/i  })).pipe(gulp.dest(paths.tempVendor));
		var appFiles =		gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

    // Styles
    var tempStyles =          gulp.src(paths.appStyles).pipe(gulp.dest(paths.tempStyles));
    var tempStylesVendors =   gulp.src(mainBowerFiles({ filter: /.*\.css$/i  })).pipe(gulp.dest(paths.tempStylesVendor));
    var tempFontsVendors =    gulp.src(mainBowerFiles({ filter: /.*\.(tff|woff2|woff)$/i  })).pipe(gulp.dest(paths.tempStylesFonts));


		return gulp.src(paths.index)

				.pipe(gulp.dest(paths.temp))

          // inject vendor styles into index file
          .pipe(inject(tempStylesVendors, {
            relative: true,
            name: 'vendorInject'
          }))

          // inject vendor styles into index file
          .pipe(inject(tempFontsVendors, {
            relative: true,
            name: 'vendorInject'
          }))

          // inject styles into index file
          .pipe(inject(tempStyles, {
            relative: true
          }))

          // inject vendor specific JavaSript files into index file
  				.pipe(inject(tempVendors, {
  						relative: true,
  						name: 'vendorInject'
  				}))

          // inject angular app files into index file
  				.pipe(inject(appFiles, {
  						relative: true
  				}))

        // copy to destination
				.pipe(gulp.dest(paths.temp));

});

gulp.task('vendors', function(){

  var tempVendors = gulp.src(mainBowerFiles({ filter: /.*\.js$/i  })).pipe(gulp.dest(paths.tempVendor));
  var tempStylesVendors =  gulp.src(mainBowerFiles({ filter: /.*\.css$/i  })).pipe(gulp.dest(paths.tempStylesFonts));

	return gulp.src(paths.tempIndex)

      .pipe(inject(tempStylesVendors, {
        relative: true,
        name: 'vendorInject'
      }))


			.pipe(inject(tempVendors, {
				relative: true,
				name: 'vendorInject'
			}))
			.pipe(gulp.dest(paths.temp));
});

gulp.task('styles', function(){

	var tempStyles =         gulp.src(paths.appStyles).pipe(gulp.dest(paths.tempStyles));
  var tempStylesVendors =  gulp.src(mainBowerFiles({ filter: /.*\.css$/i  })).pipe(gulp.dest(paths.tempStylesVendor));
  var tempFontsVendors =    gulp.src(mainBowerFiles({ filter: /.*\.(tff|woff2|woff)$/i  })).pipe(gulp.dest(paths.tempStylesVendor));

	return gulp.src(paths.tempIndex)

      .pipe(inject(tempStylesVendors, {
        relative: true,
        name: 'vendorInject'
      }))
      .pipe(inject(tempFontsVendors, {
        relative: true,
        name: 'vendorInject'
      }))
			.pipe(inject(tempStyles, {
				relative: true
			}))
			.pipe(gulp.dest(paths.temp));
});

gulp.task('scripts', function(){

	var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

	return gulp.src(paths.tempIndex)
		.pipe(inject(appFiles, {
			relative: true
		}).pipe(angularFileSort()))
		.pipe(gulp.dest(paths.temp));

});

gulp.task('clean', function(){
		del([paths.temp]);
});
