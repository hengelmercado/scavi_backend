
const admin = require('firebase-admin');

const obtenerDatos = async(req, res) => {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: "https://scavi-plataform.firebaseio.com"
      });
    
    const db = admin.database();
    
    const scoresRef = db.ref('users');
        scoresRef.orderByValue().limitToLast(3).on('value', (snapshot)  =>{
        snapshot.forEach((data) => {
            console.log('The ' + data.key + ' dinosaur\'s score is ' + data.val());
        });
    });


}

module.exports = {
    obtenerDatos
}