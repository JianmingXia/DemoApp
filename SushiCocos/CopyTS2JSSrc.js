const fs = require('fs');
const path = require('path');

const build_dir = './src/';

function getFilePrefix() {
    return "./publish/html5/src/";
}

function copyIt(from, to) {
    fs.writeFileSync(to, fs.readFileSync(from));
    //fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
}

fs.readdir(path.resolve(build_dir), (err, files) => {
    if (fs.existsSync(getFilePrefix())) {
        console.log(getFilePrefix() + " exist!");
    } else {
        console.log("mkdir" + getFilePrefix());
        fs.mkdirSync(getFilePrefix());
    }

    files.forEach(file => {
        copyIt(build_dir + file, getFilePrefix() + file);
    });
});
