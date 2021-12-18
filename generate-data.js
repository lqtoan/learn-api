const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomCategoryList = (n) => {
  // if (n <= 0) return [];
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
    let numberOfProducts = Math.floor(Math.random() * 10000);
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.number(),
        name: faker.commerce.productName(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        imgUrl: 'https://source.unsplash.com/random/'.concat(
          faker.datatype.number()
        ),
      };
      productList.push(product);
    });
  }

  return productList;
};

(() => {
  // random data
  const categoryList = randomCategoryList(Math.ceil(Math.random() * 12) + 8);
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
