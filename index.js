require('es6-promise').polyfill();

const through = require('through2')
    , fetch = require('node-fetch')
    , trim = require('lodash.trim')
    , path = require('path')
    , fs = require('fs')
    , mime = require('mime')
    , gutil = require('gulp-util');

//const DATA_URI_RE = /(?:['"])?data:[^,].*,[^-A-Za-z0-9+/=]|=[^=]|={3,}$/;

module.exports = function() {
    return through.obj((file, encoding, callback) => {
        let content = file.contents.toString()
            , index = 0;

        while (true) {
            index = content.indexOf('url(', index);

            if (index == -1) break;

            let end = content.indexOf(')', index + 1);
            let url = content.substring(index + 4, end);

            index = end;
        }

        // processFile(file).then((result) => {
        //     for (let data of result) {
        //         content = content.split(data.url).join(data.content);
        //     }
        //
        //     file.contents = new Buffer(content);
        //
        //     callback(null, file);
        // });
    });
};

function processFile(file) {
    return new Promise((resolve, reject) => {
        let content = file.contents.toString();
        let urls = getURLs(content);
        let result = [];

        console.log(urls);

        for (let url of urls) {
            let filename = path.join(path.dirname(file.path), trimFilename(url));

            if (fs.existsSync(filename)) {
                let binary = fs.readFileSync(filename);

                result.push({ url: url, content: packToDataURI(mime.lookup(filename), binary) });
            }
        }

        resolve(result);
    });
}

function getURLs(content) {
    let urls = [],
        index = 0;

    while (true) {
        index = content.indexOf('url(', index);

        if (index == -1) break;

        let end = content.indexOf(')', index + 1);

        urls.push(content.substring(index + 4, end));

        index = end;
    }

    return urls;
}

function packToDataURI(mimetype, binary) {
    return ['"', 'data:', mimetype, ';base64,', binary.toString('base64'), '"'].join('');
}

function trimFilename(name) {
    return trim(name).replace(/['"]/g, '').replace(/[?#].*/, '');
}
