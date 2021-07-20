const fs = require('fs');
const { resolve } = require('path');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            
            // alls well
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

const copyFile = fileCopy => {
    return new Promise((resolve, reject) => {
        fs.copyFileSync('./dist/index.html', fileCopy =>{
            resolve({
                ok: true,
                message: 'File Copied'
            })
        })
    })
};

module.exports = {writeFile, copyFile};