const mix = require('laravel-mix');

mix.options({
    sourcemaps: 'source-map',
    uglify: {
        sourceMap: true
    }
});

mix.js('src/main.js', 'dist/');
mix.disableNotifications();
