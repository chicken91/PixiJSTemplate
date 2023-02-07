const yargs = require('yargs');
const rootDirectory = process.cwd();
process.env.NODE_ENV = yargs.argv.env || 'development';
process.env.PLATFORM = yargs.argv.platform || 'desktop';
const nodeEnv = process.env.NODE_ENV || 'development';
const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const webpackConfig = require(`${rootDirectory}/webpack.${nodeEnv}.config.js`);
const webpackStream = require('webpack-stream');
const merge = require('gulp-merge-json');
const audiosprite = require('gulp-audiosprite');
const dataDirectory = path.join(rootDirectory, 'data');
const soundFolder = 'data/assets/sounds/sprite/';
const soundFiles = [`${soundFolder}/*.wav`, `${soundFolder}/*.mp3`];
const buildDirectory = webpackConfig.output.path;
const dataFiles = [`${dataDirectory}/**/*`, `!${dataDirectory}/layouts/**/*`, `!${dataDirectory}/layouts`];
const layoutFiles = [`${dataDirectory}/layouts/**/*.json`, `!${dataDirectory}/layouts/**/@${process.env.PLATFORM}/**/*.json`];
const layoutMergedName = `layout-${process.env.PLATFORM}.json`;


const buildOutputDirectory = (resolve) => {
    fs.existsSync(buildDirectory) || mkdirp.sync(buildDirectory);
    resolve();

};
const buildSourceFile = (resolve) => {
    gulp.src('src/index.ts')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(buildDirectory)).on('finish', () => resolve())
};
const buildIndex = (resolve) => {
    const config = JSON.parse(fs.readFileSync(`${dataDirectory}/config.json`, 'utf8'));
    const htmlFile = fs.readFileSync(`${rootDirectory}/core/data/html/index.html`, 'utf8');
    const indexHtml = htmlFile.replace('{{NAME}}', config.gameName);
    fs.writeFileSync(`${buildDirectory}/index.html`, indexHtml);
    resolve();
};
const buildSizeReport = (resolve) => {
    const fileSizeMap = {};
    const assetsPath = path.join(dataDirectory, 'assets');
    addFileSize(assetsPath, fileSizeMap);
    fs.writeFileSync(`${buildDirectory}/size-report.json`, JSON.stringify(fileSizeMap));
    resolve();
};
const buildLayouts = () => gulp.src(layoutFiles)
    .pipe(merge({ fileName: layoutMergedName }))
    .pipe(gulp.dest(`${buildDirectory}`));

const copyData = () => gulp.src(dataFiles)
    .pipe(gulp.dest(buildDirectory));

const audioSprite = () => gulp.src(soundFiles)
    .pipe(audiosprite({ format: 'sound', export: "ogg,m4a,mp4", output: "template_audio" }))
    .pipe(gulp.dest('data/assets/sounds'));

function addFileSize(directoryPath, fileSizeMap) {
    const fileList = fs.readdirSync(directoryPath);
    for (const file of fileList) {
        const filePath = path.join(directoryPath, file);
        let stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            addFileSize(filePath, fileSizeMap)
        }
        if (stat.isFile()) {
            fileSizeMap[file] = stat.size / 1000;
        }
    }
}

exports.buildOutputDirectory = buildOutputDirectory;
exports.buildSourceFile = buildSourceFile;
exports.buildIndexHtml = buildIndex;
exports.buildSizeReport = buildSizeReport;
exports.buildLayouts = buildLayouts;
exports.copyData = copyData;
exports.audioSprite = audioSprite;


