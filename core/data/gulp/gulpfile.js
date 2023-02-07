const {
    buildOutputDirectory,
    buildSourceFile,
    buildIndexHtml,
    buildSizeReport,
    buildLayouts,
    copyData,
    audioSprite
} = require(`./gulpFunction`);
const gulp = require('gulp');


gulp.task('buildOutputDirectory', buildOutputDirectory);
gulp.task('buildSourceFile', buildSourceFile);
gulp.task('buildIndexHtml', buildIndexHtml);
gulp.task('buildSizeReport', buildSizeReport);
gulp.task('buildLayouts', buildLayouts);
gulp.task('copyData', copyData);

// --- Main gulp tasks ---
gulp.task(
    'default',
    gulp.series(
        'buildOutputDirectory',
        gulp.parallel(
            'buildSourceFile',
            'buildIndexHtml',
            'buildSizeReport',
            'buildLayouts',
            'copyData'
        )
    )
);
gulp.task('audioSprite', audioSprite);