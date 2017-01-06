require('es6-promise').polyfill();

const through = require('through2')
    , fetch = require('node-fetch')
    , trim = require('lodash.trim')
    , path = require('path')
    , fs = require('fs')
    , mime = require('mime')
    , gutil = require('gulp-util')
    , PLUGIN_NAME = 'gulp-css-datauri'
    , RE_DATA_URI = /^data:(?:[a-z0-9-\.]+\/[a-z0-9-\.]+;base64)?,/
    , RE_EXTERNAL = /^(?:https?:)?\/\//;

let cache = new Map()
    , index = new Map();

module.exports = function() {
    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) return callback(null, file);

        let content = file.contents.toString()
            , i = 0
            , promises = [];

        while (true) {
            i = content.indexOf('url(', i);

            if (i == -1) break;

            let end = content.indexOf(')', i + 1)
                , url = content.substring(i + 4, end)
                , trimmed = trim(url.replace(/['"]/g, '')).replace(/[?#].*/, '');

            if (!RE_DATA_URI.test(trimmed)) {
                if (cache.has(trimmed)) {
                    if (!index.has(url)) index.set(url, trimmed);

                    i = end;

                    continue;
                }

                index.set(url, trimmed);

                promises.push(new Promise((resolve, reject) => {
                    let filename = path.join(path.dirname(file.path), trimmed);

                    if (fs.existsSync(filename)) {
                        let binary = fs.readFileSync(filename);

                        cache.set(trimmed, packToDataURI(mime.lookup(filename), binary));

                        resolve();
                    } else {
                        gutil.log(gutil.colors.cyan(PLUGIN_NAME), 'can\'t open file', gutil.colors.red(filename));

                        resolve();
                    }
                }));
            }

            i = end;
        }

        Promise.all(promises).then(result => {
            //file.contents = new Buffer(content);

            //content = content.split(url).join(packToDataURI(mime.lookup(filename), binary));

            callback(null, file);
        });
    });
};

function packToDataURI(mimetype, binary) {
    return ['"', 'data:', mimetype, ';base64,', binary.toString('base64'), '"'].join('');
}
