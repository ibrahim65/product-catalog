// Selector 
const filterInput = document.querySelector('#filter');
const productListUL = document.querySelector('.collection')
const msg = document.querySelector('.msg');
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-prise')
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');
let id;
// if (productData.length === 0) {
//   id = 0;
// } else {
//   id = productData[productData.length - 1].id + 1;
// }


// Data /state
let productData = getDataFromLocalStore();

function getDataFromLocalStore() {
  let items = '';
  if(localStorage.getItem('productItems') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('productItems'));
  }
  return items;
}

function saveDataToLocalStorage(item) {
    let items = '';
    if(localStorage.getItem('productItems') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    }else{
        items = JSON.parse(localStorage.getItem('productItems')) 
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items))
    }
}

//Delete Data from Local Host
function deleteItemFromLocalStorage(id) {
    const items = JSON.parse(localStorage.getItem('productItems'));
    let result = items.filter(productItem => {
        return productItem.id !== id;
     });
    localStorage.setItem('productItems', JSON.stringify(result));
    if(result.length === 0) location.reload();
    console.log(items)
}

//Load all Event Listean
function loadEventListener() {
    addBtn.addEventListener('click', addItem);
    productListUL.addEventListener('click', deleteProduct);
    window.addEventListener('DOMContentLoaded', getData.bind(null, productData));
    filterInput.addEventListener('keyup', filterProduct);
}

function getData(productList) {
    // let li = '';
    if(productData.length > 0 ) {
        msg.innerHTML = '';
        productList.forEach(({id, name, price}) => {
            // const {id, name, price} = product;
            let = li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${id}`;
            li.innerHTML = ` <strong>${name}</strong><span class="price">${price}</span><i class="far fa-trash-alt float-right delete-product"></i></li> 
            `;
            productListUL.appendChild(li);

        });
    }else{
        // showMessage(true, null)
        showMessage('Please add item to your catalog.')
    }
}
getData(productData);
function showMessage(message = '') {
    msg.textcenter = message;
}
//Adding item to the productData
const addItem = e => {
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    
    let id;
    if(productData.length === 0) {
        id = 0;
    }else{
        id = productData[productData.length - 1].id + 1;
    }
    
    if (name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))) {
        alert('Please fill up necessary information!')
    }else{
        const data = {           
            id,
            name,
            price
        }
        productData.push(data);
        saveDataToLocalStorage(data);
        productListUL.innerHTML = '';
        getData(productData);
        nameInput.value = '';
        priceInput.value = '';
    }  
}

//Delete item from the UI and store
const deleteProduct = e => {
    if(e.target.classList.contains('delete-product')){
        // e.target.parentElement.remove();

        //Removing Data from the UI
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target);
        //Removing Data from the Store
        const id = parseInt(target.id.split('-')[1]);
        let result =productData.filter(productItem => {
            return productItem.id !== id;
        });
        productData = result;
        deleteItemFromLocalStorage(id);       
    }
   };
//Product filtering development
const filterProduct = e => {
    const text = e.target.value.toLowerCase();
    let itemLength = 0;
    document.querySelectorAll('.collection .collection-item').forEach(item => {
        const productName = item.firstElementChild.textContent.toLowerCase();
        if(productName.indexOf(text) === -1) {
            // showMessage(null, true)
            // showMessage('No item meet your criteria!')
            item.style.display = 'none';
        }else{
            // msg.innerHTML = '';
            item.style.display= 'block';
            ++ itemLength;
        }
    });
    itemLength > 0 ? showMessage('') : showMessage('No item found');
}

// Load all Event Listener

loadEventListener();

// function showMessage(fetchMessage, searchMessage) {
//     if(fetchMessage) {
//         msg.innerHTML = 'Please add Item to your catalog !';
//     }else if(searchMessage) {
//         msg.innerHTML = 'No item meet your criteria!'
//     }
// }
function showMessage(message) {     
    msg.innerHTML = message;
}

// Setting and getting item from Localstorage 
// JSON.stringify()
// const person = {
//     myName: 'Ibrahim Khalil',
//     yourName: 'Nayan'
// };

// localStorage.setItem('person', JSON.stringify(person));
// console.log(JSON.parse (localStorage.getItem('person', person)));

// localStorage.setItem('firstName', 'Ibrahim');
// localStorage.setItem('lastName', 'Khalil');
// console.log(localStorage.getItem('lastName'));