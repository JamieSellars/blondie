/**
*   IMPORT NODE REQUIRED NODE PACKAGES
**/
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    mainBowerFiles = require("main-bower-files"),
    inject = require('gulp-inject'),
    del = require('del');

  /**
  *   SET PATH VARIABLES
  **/
var paths = {
  temp: 'temp',
  tempVendor: 'temp/vendor',
  tempIndex:  'temp/index.html',

  index: 'app/index.html',
  appSrc:  ['app/js/**/*.js', '!app/index.html'],
  bowerSrc: 'bower_components/**/*',
};

/**
*   INITIALISE THE GULP TASKS
**/
gulp.task('default', ['watch']);

/**
*   WATCHER
*   Watch files and dependencies
**/
gulp.task('watch', ['serve'], function(){
  gulp.watch(paths.app, ['scripts']);
  gulp.watch(paths.bower + '/**/*', ['vendors']);
  gulp.watch(paths.index, ['copy']);
});

/**
*   SERVE FILES
*   @description: use gulp-webserver
**/
gulp.task('serve', ['copy'], function(){
  gulp.src(paths.temp)
  .pipe(webserver({
    //open: true
    livereload: true,

    // Path to Sails Web API
    proxies: [{
      source: '/api',
      target: 'http://localhost:1337'
    }]
  }));
});


/**
*   COPY
**/
gulp.task('copy', function(){

  var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));
  var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));
  return gulp.src(paths.index)
    .pipe(gulp.dest(paths.temp))
    .pipe(inject(tempVendors, {
      relative: true,
      name: 'vendorinject'
    }))
    .pipe(inject(appFiles, {
      relative: true
    }))
    .pipe(gulp.dest(paths.temp));

});

/**
*   VENDORS
**/
gulp.task('vendors', function(){
  var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));

  return gulp.src(paths.tempIndex)
    .pipe(inject(tempVendors, {
      relative: true,
      name: 'vendorinject'
    }))
    .pipe(gulp.dest(paths.temp));
});


/**
*   SCRIPTS
**/
gulp.task('scripts', function(){

  var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

  return gulp.src(paths.tempIndex)
    .pipe(inject(appFiles, {
      relative: true
    }))
    .pipe(gulp.dest(paths.temp));
});


/**
*   CLEAN UP
**/
gulp.task('clean', function(){
  del([paths.temp]);
});
