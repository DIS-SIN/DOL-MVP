const fs = require('fs');
let data = require('./output/data.json');

function main() {

    let tags = [];
    
    data.forEach(resource => {
        tags = tags.concat(getList(resource.Tags));
    });
    tags.sort();
    const TagSet = new Set(tags);

    console.log(TagSet);
    console.log(TagSet.size);
}

function getList(stringList) {
    if (stringList){
        let list = stringList.split(",");
        list = list.map(item => item.trim());
        return list.filter(function(listItem) {
            return listItem != "";
        });
    }
    return null;
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