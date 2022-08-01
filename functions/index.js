const functions = require("firebase-functions");
 const admin = require('firebase-admin');
 admin.initializeApp();

 export const addAdminRole = functions.https.onCall((data, context) => {
    try {
        return admin.auth().getUserByEmail(data.email).then( user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            })
        }).then(()=>{
            return {
                message: `Success! ${data.email} has been made an admin`
            }
        })     
    } catch (error) {
        return error
    }
   
 })