// NEO4J URI

module.exports.neoj_URI = process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4001/graphql'

module.exports.postData = (url, query, variables) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables
            })
        })
        .then(r => r.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

module.exports.prepData = (data) => {
    let resourceList = []
    data.map(resource => {
        // Reformat neo4j Json output to DOL json
        let {title, url, description, endorsements, difficulty, cost, dateAdded, uid, image, timeEstimate} = resource

        let creationYear = resource.creationYear.formatted
        let practices = resource.practiced_as.map(practice => practice.name)
        let skills = resource.resource_skill.map(skill => skill.name)
        let tags = resource.tagged.map(tag => tag.name)
        let types = resource.type_of.map(a_type => a_type.name)
        let useCases = resource.secondary_used_as.map(sec_usage => sec_usage.name)
        let digitalStandards = resource.resource_dig_standard.map(standard => standard.name)
        let resourceOrg = resource.resource_org[0] ?  resource.resource_org[0]['name'] : "";

        let topic = resource.topic_of.map(t => t.name) ? resource.topic_of.map(t => t.name)[0] : null
        let language = resource.resource_lang.map(l => l.name) ? resource.resource_lang.map(l => l.name)[0] : null  
        let format = resource.primary_used_as.map(f => f.name) ? resource.primary_used_as.map(f => f.name)[0] : null  

        let featuredEndorsers = resource.endorsed_by.map(endorser => {
            let {firstName, lastName, profilePic} = endorser 
            let name = firstName + " " + lastName
            return {name, profilePic}
        })

        let new_resource = {title, url, description, difficulty, cost, dateAdded, uid, image, timeEstimate, creationYear, practices, skills, tags, types, useCases, digitalStandards, topic, language, format, endorsements: {featuredEndorsers, endorsements}, resourceOrg}

        resourceList.push(new_resource)
    })

    return resourceList
}


