const fetch = require('node-fetch');
const fs = require('fs');
const key = require('../src/unsplashAPI/unsplash.js');
const faker = require('faker');
const _ = require('lodash');

const tag = [
  'Hookah', 'pot', 'Donut', 'Sandwich', 'Pizza', 'Burgers', 'Coffee & Tea', 'Bread', 'Light bulb', 'Vitamin',
  'Apple chips', 'Tire', 'Bubble Tea', 'Wine', 'Noodles', 'Beer', 'Cupcakes', 'Shaved Ice', 'Salad', 'Board Game',
  'Chocolate', 'Soap', 'Desserts', 'Yogurt', 'Ice Cream', 'Soup', 'Macarons', 'Wraps', 'Hat', 'Toy',
  'Chair', 'Dog food', 'Tacos', 'Microphone', 'Acai Bowls', 'Cocktail', 'Gelato', 'Shirt', 'Jeans', 'TV',
  'Coffee bean', 'Macbook', 'Shoes', 'Delis', 'Sausages', 'Pants', 'Mouse', 'Gloves', 'Table', 'Cabinet',
  'black tea', 'lemon', 'Water', 'book', 'post card', 'letter', 'skirt', 'tissue', 'spray', 'water filter',
  'pen', 'pencil', 'water bottle', 'pan', 'wallet', 'coach', 'kate spade', 'pillow', 'pad', 'fan',
  'water heater', 'coffee machine', 'coffee grinder', 'Milk', 'juice', 'candies', 'paneer', 'cookies', 'cottage cheese', 'Ham',
  'luggage', 'backpack', 'air filter', 'flag', 'pineapple', 'apple', 'glue', 'sofa', 'curtain', 'toner',
  'detergent', 'hand soap', 'shampoo', 'napkin', 'glasses', 'window', 'iphone', 'ipad', 'Fish', 'car',
  'toast', 'croissant', 'ps4', 'xbox', 'water melon', 'basketball', 'Bacon', 'nuts', 'chair', 'sushi' 
];


const photoGenerator = () => {
  let photoData = [];
 products = tag;
  // console.log(products.length)
  for (let i = 0; i < products.length; i++) {
    fetch(
      `https://api.unsplash.com/search/photos/?query=${products[i]}&client_id=${key.accessKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then(async (data) => {
        let tId = i;
        for (let k = 0; k < 10; k++) {
          if (k >= 5) {
            tId = i + products.length;
          }
          photoData.push({
            photoid: data.results[k].id, 
            username: data.results[k].user.username, 
            link: data.results[k].urls.full,
            productTag: products[i],
            tagID: tId
          });
        }
      })
      .then(() => {
        fs.writeFileSync(__dirname+'/photos.js', JSON.stringify(photoData, null, '\t'));
      })
      .catch(err => console.log(err));
     
  }
  return;
}

photoGenerator();
module.exports = {
  photoGenerator
}