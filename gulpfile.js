const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const config = {
  mode: {
    stack: {
      sprite: "../sprite.svg"
    }
  }
};

const cleanDist = () => del('build/**/*', { force: true });

const buildHtml = () => src('app/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(dest('build'));

const buildCss = () => src(['app/scss/app.scss'])
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(concat('style.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(sourcemaps.write())
	.pipe(dest('build'));

const buildSvg = () => src('app/images/icons/*.svg')
  .pipe(svgSprite(config))
  .pipe(dest('build/images'));

const buildImages = () => src('app/images/*.*')
  .pipe(imagemin())
  .pipe(dest('build/images'));

const buildTtf = () => src('app/fonts/*.ttf')
  .pipe(dest('build/fonts'));

const buildWoff = () => src('app/fonts/*.ttf')
  .pipe(ttf2woff())
  .pipe(dest('build/fonts'));

const buildWoff2 = () => src('app/fonts/*.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('build/fonts'));

const copyJs = () => src(['node_modules/jquery/dist/jquery.min.js', 'app/js/*.js'])
  .pipe(dest('build/js'));

const startWatch = () => {
	watch('app/**/*.pug', buildHtml);
  watch('app/scss/**/*.scss', buildCss);
  watch('app/images/icons/*.svg', buildSvg);
  watch('app/images/*', buildImages);
  watch('app/fonts/*.ttf', buildTtf);
  watch('app/fonts/*.ttf', buildWoff);
  watch('app/fonts/*.ttf', buildWoff2);
  watch('app/js/*.js', copyJs);
};

exports.default = series(cleanDist, parallel(buildHtml, buildCss, buildSvg, buildImages, buildTtf, buildWoff, buildWoff2, copyJs), startWatch);
