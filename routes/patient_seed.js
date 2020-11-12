let Patient = require('../models/Patient');
// Patient.remove(err =>{
//     console.log(err)
// })
// let names = [
//     'Rishab Lamba',
//     'Salonoi Kalra',
//     'Akansha',
//     'Harshit Batra',
//     'Pranika Massey',
//     'Ekagrata Sharma',
//     'Rajat Sharma',
//     'Snehil Arun',
//     'Lokesh Kumar',
//     'Barbie',
// ];

// function getRandomArbitrary(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }
let seedDB = () => {
//     for (i = 1; i <= 10; i++) {
//         let newPatient = {
//             aadhaar: getRandomArbitrary(100000000000, 1000000000000) + '',
//             name: names[i - 1],
//             password: 'abc',
//             email: 'rishablamba407@gmail.com',
//             gender: i % 2 == 0 ? 'female' : 'male',
//             age: getRandomArbitrary(20, 80),
//             phone: 8178003966,
//             image: `../data/profile/avatar-${i}.png`,
//         };

//         Patient.create(newPatient, (err, patient) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(patient);
//             }
//         });
//     }
};
module.exports = seedDB;
