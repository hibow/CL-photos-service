const fs = require('fs');
const performance = require('perf_hooks').performance;
//seeding into a json file
//photoGenerator();
const contents = fs.readFileSync('helper/photos.js');
// Define to JSON type
const jsonContent = JSON.parse(contents);
console.log(jsonContent.length)
function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

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
const newarr = removeDuplicates(jsonContent, 'tagID');
console.log(newarr.length);
const arr = newarr.map((item) => {
  return item.productTag;
})
for (let i in tag) {
  if (arr.indexOf(tag[i]) === -1) {
    console.log(tag[i]);
  }
}
