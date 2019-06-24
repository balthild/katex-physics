const mix = require('laravel-mix');

mix.options({
    sourcemaps: 'source-map',
    uglify: {
        sourceMap: true
    }
});

mix.webpackConfig({
    output: {
        library: 'main',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
});

mix.js('src/main.js', 'dist/');
mix.disableNotifications();
