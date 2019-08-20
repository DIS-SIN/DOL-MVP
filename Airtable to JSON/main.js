const CSVToJSON =require("csvtojson/v2");
const fs = require('fs');

const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const fetch = require('node-fetch');

async function main() {
    //convertCSVToJSON('csv/For Jordan.csv');
    convertCSVToJSON("csv/MVP1 content.csv")
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function convertCSVToJSON(csvFilePath){
    CSVToJSON()
    .fromFile(csvFilePath)
    .then(async (jsonObj)=>{
        //writeToFile("For Jordan.json", jsonObj);

        await asyncForEach(jsonObj, async resource => {
            resource.scrapedData = await scrapeSite(resource.URL);
            if (resource["Resource name"].length > 50){
                resource["Too Long"] = true;
            }
        });

        writeToFile("data.json", jsonObj);

    })
}

async function scrapeSite(url) {
    console.log(`Scraping ${url}`);
    let response = await fetch(url);
    let html = await response.text();
    let doc = domino.createWindow(html).document;
    let metadata = getMetadata(doc, url);
    //writeToFile("metaData.json", metadata)
    //console.log(metadata);
    return metadata;
}

function writeToFile(fileName, fileContent) {
    fs.writeFile(`output/${fileName}`, JSON.stringify(fileContent), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
}

main();