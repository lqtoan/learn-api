const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomCategoryList = (numberOfCategories) => {
  const categoryList = [];

  Array.from(new Array(numberOfCategories)).forEach(() => {
    const category = {
      id: faker.datatype.number(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
    };
    categoryList.push(category);
  });
  //
  return categoryList;
};

const randomProductList = (categoryList) => {
  const productList = [];

  for (const category of categoryList) {
    let numberOfProducts = Math.floor(Math.random() * 10000);
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.number(),
        name: faker.commerce.productName(),
        price: Number.parseFloat(faker.commerce.price(1, 100000) * 1000),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        imgUrl: 'https://source.unsplash.com/random/'.concat(
          faker.datatype.number()
        ),
      };
      productList.push(product);
    });
  }
  //
  return productList;
};

(() => {
  // random data
  const categoryList = randomCategoryList(Math.floor(Math.random() * 8) + 2);
  const productList = randomProductList(categoryList);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('db.json written');
  });
})();
