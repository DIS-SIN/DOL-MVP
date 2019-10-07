const fs = require('fs');
const Currency = require('currency.js');
const uuidv4 = require('uuid/v4');
let data = require('./output/data.json');

function createDB(){
    let dolDB = [];

    data.forEach(resource => {
        dolDB.push({
            id: uuidv4(),
            title: resource["Resource name"],
            endorsements: getEndorsements(resource),
            description: resource["Why is this a good resource?"],
            url: resource.URL,
            types: getResourceTypes(resource),
            format: getResourceFormat(resource),
            useCases: getList(resource["How is this resource best used?"]),
            useConditions: resource["Conditions of use"],
            language: getResourceLanguage(resource),
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
            organizationalAffiliation: getOrg(resource),
            image: getImage(resource),
            cost: getCost(resource),
            comments: randomNumber(0, 300),
            scrapedData: resource.scrapedData
        });

    });

    console.log(dolDB);
    writeToFile("dol-neo4j.json", dolDB);
}

function getEndorser(resource) {
    let name = resource["Endorsed by"];
    if (!name){
        return "Ksenia Cheinman";
    }
    name = JSON.parse(name);

    name = {
        firstName: name.split(",")[1].trim(),
        lastName: name.split(",")[0].trim()
    }

    return name;
}

function getEndorsements(resource) {
    let endorser = getEndorser(resource);
    let endorsements = {
            featuredEndorsers: [
                {
                    firstName: endorser.firstName,
                    lastName: endorser.lastName, 
                    profilePic: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 10000)}`
                },
                {
                    firstName: "firstname",
                    lastName: "lastname", 
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

function getResourceLanguage(resource) {

    return resource["Languages"].toLowerCase().includes("english") ? "english" : "french";
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
    if (timeString.includes(" h")){
        return parseInt(timeString) * 60**2;
    }
    else{
        return parseInt(timeString) * 60;
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
        author = author.split(`","`).join("+");
        console.log("AUTHOR:", author);
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

function getOrg(resource) {
    let org = resource["Organizational affiliation of this resource"];
    if (org == ""){
        return null;
    }
    return org;
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