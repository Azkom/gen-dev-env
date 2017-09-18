var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify');

const destFolder = './docs';
/* The task below initializes the environment:
deletes the docs folder, before the new build. */
gulp.task('deleteDocsFolder', function(){
  return del(destFolder);
});

gulp.task('copyFontFiles',['deleteDocsFolder'], function(){
    pathToFontCopy = [
      'node_modules/font-awesome/fonts/**/*'
    ]
    return gulp.src(pathToFontCopy)
    .pipe(gulp.dest("./docs/assets/fonts"));
});

gulp.task('useminTrigger', ['deleteDocsFolder'], function(){
  gulp.start('usemin');
});

/* The gulp task below minimize the images in the
 app/assets/images folder. The list below contains the
 source folder and the folders which are excluded
 from the task (starts with !).
 The minimized files stored in the destination folder.
 In this case it is the /docs/assets/images.
 It has dependency. deleteDocsFolder. */
gulp.task('optimizeImages', ['deleteDocsFolder'], function(){
    gulp.src('./app/assets/images/**/*')
    /*There is no, presently, subfolder in the
    app/assets/images folder, therefore there no
    need to exclude any folder. When there is(are) subfolder(s),
    the example below shows the way of exclusion.  */
  //gulp.src([
  //  './app/assets/images/**/*',
  //  '!./app/assets/icons',
  //  '!./app/assets/icons/**/*'
  //])
  .pipe(imagemin({
    progressive: true,
    interlaced : true,
    multipass: true
  }))
  .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('usemin',['styles', 'scripts'], function(){
  pathToHTMLCopy =[
    './app/index.html',
    './app/about.html',
    './app/contact.html',
    './app/events.html',
    './app/programok.html',
    './app/recommendation.html',
    './app/testimonials.html'
  ];
  return gulp.src(pathToHTMLCopy)
  .pipe(usemin({
    css: [function(){return rev()}, function(){ return cssnano()}],
    js: [function(){ return rev()}, function(){ return uglify()}]
  }))
  .pipe(gulp.dest(destFolder));
});

/* The task below builds the revised and minimalized
version of the webpage. A version copied into the
destination folder, named docs. */

gulp.task('build', ['deleteDocsFolder','copyFontFiles', 'optimizeImages', 'useminTrigger']);
