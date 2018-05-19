const fs = require('fs');
const path = require('path');
const pkgjson = require('cocos-pkgjson');

const res_dir = 'res/';
const common_pkgjson_file = 'common.pkgJson';
const project_json_file = './project.json';

const projec_json = JSON.parse(fs.readFileSync(project_json_file).toString());

const resources_list = [];
const json = {};
for (let file of projec_json.CocosSrcConfig.pre_resources) {
    if (require('yargs').argv.ignore_plist) {
        resources_list.push(res_dir + file);
    } else {
        if (/plist$/.test(file)) {
            let content = fs.readFileSync(res_dir + file, "utf8");

            json[file] = pkgjson.parseFrameConfig(content);
        } else {
            resources_list.push(res_dir + file);
        }
    }
}

if (! require('yargs').argv.ignore_plist) {
    fs.writeFileSync(res_dir + common_pkgjson_file, JSON.stringify(json));
    resources_list.push(res_dir + common_pkgjson_file);
}

projec_json.CocosSrcConfig.resources = resources_list;
fs.writeFileSync(project_json_file, JSON.stringify(projec_json));