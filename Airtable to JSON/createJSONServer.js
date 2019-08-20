const fs = require('fs');
const Currency = require('currency.js');
let data = require('./output/data.json');

function createDB(){
    let dolDB = [];

    data.forEach(resource => {
        dolDB.push({
            title: resource["Resource name"],
            endorsements: getEndorsements(resource),
            description: resource["Why is this a good resource?"],
            url: resource.URL,
            types: getResourceTypes(resource),
            format: getResourceFormat(resource),
            useCases: getList(resource["How is this resource best used?"]),
            useConditions: resource["Conditions of use"],
            languages: getResourceLanguages(resource),
            difficulty: getResourceDifficulty(resource["Primary resource skill level for tag display"]),
            difficultyRange: getResourceDifficultyRange(resource),
            timeEstimate: getTimeEstimate(resource),
            dateAdded: resource["Date resource was added"],
            creationYear: resource["Year of resource creation"],
            tags: getList(resource.Tags),
            topic: resource["Primary Topic"],
            practices: getList(resource.Practices),
            skills: getList(resource.Skills),
            digitalStandards: getList(resource["Digital Standards"]),
            author: getAuthor(resource),
            organizationalAffiliation: resource["Organizational affiliation of this resource"],
            image: getImage(resource),
            cost: getCost(resource),
            comments: randomNumber(0, 300)
        });

    });

    console.log(dolDB);
    writeToFile("dolDB.json", dolDB);
}

function getEndorser(resource) {
    let name = resource["Endorsed by"];
    if (!name){
        return "Ksenia Cheinman";
    }
    name = JSON.parse(name);
    //name = `${name.split(",")[1].trim()} ${name.split(",")[0].trim()[0]}`;
    name = `${name.split(",")[1].trim()} ${name.split(",")[0].trim()}`;

    return name;
}

function getEndorsements(resource) {
    let endorsements = {
            featuredEndorsers: [
                {
                    name: getEndorser(resource), 
                    profilePic: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 10000)}`
                },
                {
                    name: "Firstname Lastname", 
                    profilePic: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 10000)}`
                }
            ],
            endorsements: randomNumber(0, 10000)
        }
    return endorsements;
}

function getResourceTypes(resource) {
    let types = []

    resource["What type of resource is this?"].split(",").forEach(type => {
        types.push(type.trim());
    });
    
    return types;
}

function getResourceFormat(resource) {
    if (resource["Primary format for icons"] != ""){
        return resource["Primary format for icons"];
    }
    if (!resource["Primary format for icons"] && !resource["Resource format"]){
        return "read";
    }
    else{
        let format = resource["Resource format"].split(",")[0].trim();
        switch (format) {
            case "Read":
                return "read";
                break;

            case "Watch":
                return "watch";
                break;

            case "Attend":
                return "course";
                break;

            case "Listen":
                return "listen";
                break;

            default:
                return "read";
                break;
        }
    }
}

function getResourceLanguages(resource) {
    let languages = {
        english: false,
        french: false
    }

    if (resource["Languages"].toLowerCase().includes("english")){
        languages.english = true;
    }
    if (resource["Languages"].toLowerCase().includes("french")){
        languages.french = true;
    }
    return languages;
}

function getResourceDifficulty(resource) {
    // resource = resource["Resource skill level"].split(",")[0].trim().toLowerCase();
    switch (resource) {
        case "Beginner/ Débutant":
            return 1;
            break;
        case "Intermediate/ Intermédiaire":
            return 2;
            break;
        case "Advanced/ Avancé":
            return 3;
            break;
        default:
            return 1;
            break;
    }
}

function getResourceDifficultyRange(resource) {
    let skillLevels = getList(resource["Resource skill level"]);
    return skillLevels.map(level => {
        return getResourceDifficulty(level);
    })
}

function getTimeEstimate(resource) {
    let timeString = resource["Time to use the resource"];
    timeString = timeString.toLowerCase();
    if (timeString.includes("hours")){
        return parseInt(timeString) * 60;
    }
    else{
        return parseInt(timeString);
    }
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

function getAuthor(resource) {
    let author = resource["Resource author"];
    // try {
    //     return JSON.parse(author).trim();
    // } catch (error) {
    //     return author.trim();
    // }
    if (!author){
        return null;
    }

    if (author.includes(`","`)){
        // More than one author
        author = author.replace(`","`, "+");
        author = JSON.parse(author);
        author = author.split("+");

        // Just use the first author for now
        author = JSON.stringify(author[0]);
    }

    author = JSON.parse(author);
    author = author.split(",");
    return `${author[1]} ${author[0]}`.trim();

    // author = author.replace(" , ", "+");
    // author = author.replace('","', ",");
    // authors = author.split(",");
    // authors.map(author => {
    //     author = author.split("+");
    //     console.log(author);
    //     return `${author[1].trim()} ${author[0].trim()}`;
    // })
    // return authors;
}

function getImage(resource) {
    if (resource["Image for curation"] != ""){
        return resource["Image for curation"];
    }
    return resource.scrapedData.image;
}

function getCost(resource) {
    if (resource["Cost"] == ""){
        return 0;
    }
    return Currency(resource["Cost"]);
}

function writeToFile(fileName, fileContent) {
    fs.writeFile(`output/${fileName}`, JSON.stringify(fileContent), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

createDB();