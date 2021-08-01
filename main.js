// Selector 
const filterInput = document.querySelector('#filter');
const productListUL = document.querySelector('.collection')
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-prise')
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');

// Data /state
const productData = [
    {   
        id: 0,
        name: 'Microphone',
        price: 30
    },
    {
        id: 1,
        name: 'Sneakers',
        price: 50
    }
];

function getData(productList) {
    let li = '';
    productList.forEach(product => {
        li = document.createElement('li');
        li.className = 'list-group-item collection-item';
        li.id = `product-${product.id}`;
        li.innerHTML = ` <strong>${product.name}</strong><span class="price">${product.price}</span><i class="far fa-trash-alt float-right delete-product"></i></li> 
        `;
        productListUL.appendChild(li);

    });
}
getData(productData);

addBtn.addEventListener('click', e => {
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    if(name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))
    
    ) {
        alert('Please fill up necessary information!')
    }else{
        productData.push({
            id: 0,
            name,
            price
        });
        productListUL.innerHTML = '';
        getData(productData);
        nameInput.value = '';
        priceInput.value = '';
    }
    
});