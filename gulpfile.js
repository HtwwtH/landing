const { src, dest, parallel, watch, series, lastRun } = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const include = require('gulp-include');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const debug = require('gulp-debug');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const inlineSVG = require('postcss-inline-svg');

const dist = './dist';

const source = {
  pages: './src/pug/*.pug',
  styles: './src/scss/**/*.scss',
  scripts: './src/js/*.js',
  blocks: {
    dir: './src/blocks',
    html: './src/blocks/**/*.pug',
    styles: './src/blocks/**/*.scss',
    scripts: './src/blocks/**/*.js',
  },
  assets: ['./src/img/**/*', './src/fonts/*'],
};

const postCssPlugins = [autoprefixer(), inlineSVG()];

function clearBuildDir() {
  return del(`${dist}/**/*`);
}

function reload(done) {
  browserSync.reload();
  done();
}

function styles(cb) {
  src(source.styles)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.message);
          this.emit('end');
        },
      })
    )
    .pipe(debug({ title: 'Compiles:' }))
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(dest(`${dist}/css`))
    .pipe(browserSync.stream());
  cb();
}

function scripts(cb) {
  src(source.scripts)
    .pipe(include())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(dest(`${dist}/js`));
  cb();
}

function blockStyles(cb) {
  src(source.blocks.styles, { base: source.blocks.dir })
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.message);
          this.emit('end');
        },
      })
    )
    .pipe(debug({ title: 'Compiles:' }))
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(dest(`${dist}/blocks`))
    .pipe(concat('blocks.css'))
    .pipe(dest(`${dist}/css`))
    .pipe(browserSync.stream());
  cb();
}

function blockJs(cb) {
  src(source.blocks.scripts, { base: source.blocks.dir })
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(dest(`${dist}/blocks`))
    .pipe(concat('blocks.js'))
    .pipe(dest(`${dist}/js`));
  cb();
}

function blockHtml(cb) {
  src(source.blocks.html, { base: source.blocks.dir })
    .pipe(pug({ pretty: true }))
    .pipe(dest(`${dist}/blocks`));
  cb();
}

function compilePugFast() {
  const fileList = source.pages;
  return src(fileList, { since: lastRun(compilePugFast) })
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.message);
          this.emit('end');
        },
      })
    )
    .pipe(debug({ title: 'Compiles ' }))
    .pipe(pug({ pretty: true }))
    .pipe(dest(dist));
}

function compilePug() {
  const fileList = source.pages;
  return src(fileList)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.message);
          this.emit('end');
        },
      })
    )
    .pipe(debug({ title: 'Compiles ' }))
    .pipe(pug({ pretty: true }))
    .pipe(dest(dist));
}

function copyAssets(cb) {
  src(source.assets, { base: './src' }).pipe(dest(dist));
  cb();
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    },
    open: false,
    notify: false,
  });
}

function startWatch(cb) {
  watch(source.blocks.scripts, series(blockJs, reload));
  watch(source.blocks.styles, series(blockStyles, reload));
  watch(source.blocks.html, series(blockHtml, compilePug, reload));
  watch(source.styles, series(styles, reload));
  watch(source.scripts, series(scripts, reload));
  watch(
    source.pages,
    { events: ['change', 'add'], delay: 100 },
    series(compilePugFast, reload)
  );
  watch(source.assets, copyAssets);
  cb();
}

exports.build = series(
  clearBuildDir,
  parallel(
    blockStyles,
    blockHtml,
    blockJs,
    compilePugFast,
    styles,
    scripts,
    copyAssets
  )
);

exports.default = series(
  clearBuildDir,
  parallel(
    blockStyles,
    blockHtml,
    blockJs,
    compilePugFast,
    styles,
    scripts,
    copyAssets
  ),
  parallel(browsersync, startWatch)
);
