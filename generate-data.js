const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.number(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
    };
    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList) => {
  // if (numberOfProducts <= 0) return [];
  const productList = [];

  for (const category of categoryList) {
    let numberOfProducts = Math.floor(Math.random() * 20);
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number.parseFloat(faker.commerce.price()),
        createdAt: Date.now(),
        imgUrl: 'https://source.unsplash.com/random/320x160/',
      };
      productList.push(product);
    });
  }

  return productList;
};

(() => {
  // random data
  const categoryList = randomCategoryList(Math.floor(Math.random() * 10) + 2);
  const productList = randomProductList(categoryList);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
  };

  // write db object db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('db.json written');
  });
})();
