const functions = require('firebase-functions');
const axios = require('axios');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// exports.createDynamicLink = functions.firestore
//     .document('resources/{ID}')
//     .onWrite((change, context) => {
//     // Get an object with the current document value.
//     // If the document does not exist, it has been deleted.
//     const document = change.after.exists ? change.after.data() : null;

//     // Get an object with the previous document value (for update or delete)
//     const oldDocument = change.before.data();

//     // perform desired operations ...
//     if (document){
//         axios.post('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCEjvQBNLH87Y5d-eCy4JAR8HAMUmUs-uc', {
//             dynamicLinkInfo: {
//                 domainUriPrefix: "https://dol-test.ca/resource",
//                 link: `https://dol-test.ca/res/${document.id}`,
//                 socialMetaTagInfo: {
//                     socialTitle: document.title,
//                     socialDescription: document.description,
//                     socialImageLink: document.image
//                 }
//             }
//         })
//         .then(function (response) {
//             console.log(response);
//             return response;
//         })
//         .catch(function (error) {
//             console.log(error);
//             throw error;
//         });
//     }
// });