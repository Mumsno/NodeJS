// Object property shorthand

const name = 'Andrew'
const userAge = 27

const user = {
    name,
    age: userAge,
    location: 'Gan Yavne'
}

console.log(user);

// Object destructurign
const product = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
// const {label:productLabel, stock} = product
// console.log(productLabel, stock);

// const transcation = (type, {label, stock}) => {
//     console.log(label, stock, type);
    
// }

// transcation('order', product)