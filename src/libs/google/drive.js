"use strict";

/**
 * https://developers.google.com/drive/v2/reference/
 * https://developers.google.com/drive/v3/web/quickstart/nodejs
 */
const fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
const path = require('path');
const conf = require(path.join(__dirname,"../../config"));

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive.appfolder','https://www.googleapis.com/auth/drive.appdata'];
var TOKEN_DIR = path.join(__dirname,"libs/google/credentials/");
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';


var fileMetadata = {
    'name': 'config.json',
    'parents': [ 'appDataFolder']
};
var media = {
    mimeType: 'application/json',
    body: fs.createReadStream('files/config.json')
};
drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
}, function(err, file) {
    if(err) {
        // Handle error
        console.log(err);
    } else {
        console.log("Folder Id: ", file.id);
    }
});

