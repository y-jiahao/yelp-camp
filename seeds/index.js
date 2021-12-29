const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('Database connected');
})
.catch(err => {
    console.log(err);
    console.log('Connection error');
})

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 100; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61c992aac6ad00406fa77a84',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil at obcaecati aliquid rem repudiandae neque sint animi nam fuga, aperiam quia quis voluptates officiis voluptas beatae est exercitationem maxime maiores!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/eclipser/image/upload/v1640686556/YelpCamp/awu8zenq4z0yq6z7dhdx.jpg',
                  filename: 'YelpCamp/awu8zenq4z0yq6z7dhdx'
                },
                {
                  url: 'https://res.cloudinary.com/eclipser/image/upload/v1640686559/YelpCamp/lerijxq3nfawajqrtwff.jpg',
                  filename: 'YelpCamp/lerijxq3nfawajqrtwff'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})