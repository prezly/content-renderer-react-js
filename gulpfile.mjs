// General imports
import autoprefixer from 'autoprefixer';
import branch from 'branch-pipe';
import gulp from 'gulp';
import * as sassBackend from 'sass';
import { Transform } from 'stream';

// Processors
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import map from 'gulp-map';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import createSassProcessor from 'gulp-sass';

const sass = createSassProcessor(sassBackend);

const SASS_SOURCES = 'src/**/*.scss';
const SASS_DECLARATIONS = 'src/styles/**/*.scss';
const SASS_MODULES_STYLESHEETS = ['src/**/*.scss', '!src/styles/**/*.scss'];
const SVG_ICONS = 'src/**/*.svg';
const TYPESCRIPT_SOURCES = ['src/**/*.{ts,tsx}', '!src/**/*.test.*'];

const createCommonjsCompiler = () => babel({ extends: './babel.commonjs.config.mjs' });
const createEsmCompiler = () => babel({ extends: './babel.esm.config.mjs' });

gulp.task('build:cjs', function () {
    return gulp
        .src([...TYPESCRIPT_SOURCES, SVG_ICONS])
        .pipe(
            branch.obj((src) => [
                src
                    .pipe(filter(TYPESCRIPT_SOURCES))
                    .pipe(createCommonjsCompiler())
                    .pipe(rename((file) => (file.extname = '.cjs'))),

                src
                    .pipe(filter(SVG_ICONS))
                    .pipe(createCommonjsCompiler())
                    .pipe(rename((file) => (file.extname = '.svg.cjs'))),
            ]),
        )
        .pipe(gulp.dest('build/cjs/'));
});

gulp.task('watch:cjs', watch([...TYPESCRIPT_SOURCES, SVG_ICONS], 'build:cjs'));

gulp.task('build:esm', function () {
    return gulp
        .src([...TYPESCRIPT_SOURCES, SVG_ICONS])
        .pipe(
            branch.obj((src) => [
                src
                    .pipe(filter(TYPESCRIPT_SOURCES))
                    .pipe(createEsmCompiler())
                    .pipe(rename((file) => (file.extname = '.mjs'))),

                src
                    .pipe(filter(SVG_ICONS))
                    .pipe(createEsmCompiler())
                    .pipe(rename((file) => (file.extname = '.svg.mjs'))),
            ]),
        )
        .pipe(gulp.dest('build/esm/'));
});

gulp.task('watch:esm', watch([...TYPESCRIPT_SOURCES, SVG_ICONS], 'build:esm'));

gulp.task('build:sass', function () {
    return gulp
        .src(SASS_SOURCES)
        .pipe(branch.obj((src) => [copySassDeclarations(src), compileComponentsStylesheets(src)]))
        .pipe(gulp.dest('build/'));
});

gulp.task('watch:sass', watch(SASS_SOURCES, 'build:sass'));

/**
 * @param {string|string[]}files
 * @param {string} build
 * @returns {*}
 */
function watch(files, build) {
    return gulp.series(build, function () {
        return gulp
            .watch(files, gulp.series(build))
            .on('ready', () => console.log('Watching files'))
            .on('all', (event, path) => console.log(`[${event}] ${path}`));
    });
}

/**
 * @param {Transform} stream
 * @returns {Transform}
 */
function copySassDeclarations(stream) {
    return stream.pipe(filter(SASS_DECLARATIONS));
}

/**
 * @param {Transform} stream
 * @returns {Transform}
 */
function compileComponentsStylesheets(stream) {
    /**
     * @param {vinyl:File} file
     * @returns {vinyl:File}
     */
    function toSassIndex(file) {
        const path = file.path.replace(file.base, '.').replace(/\.scss$/, '');
        const index = file.clone({ contents: false });
        index.contents = Buffer.from(`@import "${path}";\n`);
        return index;
    }

    return stream
        .pipe(filter(SASS_MODULES_STYLESHEETS))
        .pipe(map(toSassIndex))
        .pipe(concat('styles.scss'))
        .pipe(sass({ importPath: 'src/' }))
        .pipe(postcss([autoprefixer({ grid: true })]))
        .pipe(rename({ extname: '.css', dirname: 'styles/' }));
}
