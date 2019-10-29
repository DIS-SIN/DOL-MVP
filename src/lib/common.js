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