const fs = require('fs');
const path = require('path');

const build_dir = './src/';
const project_json_file = './project.json';

function getFilePrefix() {
    return "/src/";
}

var projec_json = JSON.parse(fs.readFileSync(project_json_file).toString());
if (require('yargs').argv.watch) {
    console.log("watch")
    projec_json.CocosSrcConfig.index_src = getFilePrefix() + "index.js";
    projec_json.CocosSrcConfig.vendor_src = getFilePrefix() + "vendor.js";

    fs.writeFileSync(project_json_file, JSON.stringify(projec_json));
} else {
    console.log("nowatch")
    fs.readdir(path.resolve(build_dir), (err, files) => {
        var index_reg = /^index/;
        var vendor_reg = /^vendor/;

        files.forEach(file => {
            if (index_reg.test(file)) {
                projec_json.CocosSrcConfig.index_src = getFilePrefix() + file;
            } else if (vendor_reg.test(file)) {
                projec_json.CocosSrcConfig.vendor_src = getFilePrefix() + file;
            }
        });

        fs.writeFileSync(project_json_file, JSON.stringify(projec_json));
    });
}
