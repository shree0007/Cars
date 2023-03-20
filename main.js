
//form
const form = document.querySelector('form')
const carLicence = document.querySelector('#licence')
const carMake = document.querySelector('#maker')
const carModel = document.querySelector('#model')
const carOwner = document.querySelector('#owner')
const carPrice = document.querySelector('#price')
const carColor = document.querySelector('#color')
const addCar = document.querySelector('#addCar')

//Table
const tbl = document.querySelector('#details');

//Search
const searchData = document.querySelector('#search-input');
const displaySearch = document.querySelector('#search-result');

//Discount
const discountedPrice = document.querySelector('#discountedprice-result')



let addedCarInfo = [];

form.addEventListener('submit', function () {


  // form inputs values
  let licence = carLicence.value;
  let make = carMake.value;
  let model = carModel.value;
  let owner = carOwner.value;
  let price = carPrice.value;
  let color = carColor.value;




  //if values are not valid
  if (!licence || !make || !model || !owner || !price || !color) {
    return alert('please fill all the inputs');

  }

  // **save input values in the local storage**

  let carInfo = {
    licence: licence,
    make: make,
    model: model,
    owner: owner,
    price: price,
    color: color,
  }

  // changing object into array of objects
  addedCarInfo.push(carInfo);

  localStorage.setItem('carInfo', JSON.stringify(addedCarInfo))

});


//**Obtaining data from local storage**

const getData = () => {
  let str = localStorage.getItem('carInfo');
  if (str != null) {
    addedCarInfo = JSON.parse(str);
  }
}

// **clear -- local storage data and displayed table data**

const resetData = () => {
  localStorage.clear();
  document.location.reload();

}


//**Displaying data in the table**

const displayData = () => {
  getData();
  for (i = 0; i < addedCarInfo.length; i++) {


    let row = tbl.insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();
    let cell6 = row.insertCell();
    cell1.innerHTML = addedCarInfo[i].licence;
    cell2.innerHTML = addedCarInfo[i].make;
    cell3.innerHTML = addedCarInfo[i].model;
    cell4.innerHTML = addedCarInfo[i].owner;
    cell5.innerHTML = addedCarInfo[i].price;
    cell6.innerHTML = addedCarInfo[i].color;
  }

}
form.addEventListener('submit', displayData());


//**Search Car**

const searchCar = () => {

  const searchValue = searchData.value;
  addedCarInfo.forEach((element) => {

    if (searchValue == element.licence) {
      displaySearch.textContent = `Licence number: ${element.licence} is ${element.make},${element.model} and it belongs to ${element.owner}`

    }
  });


  //Discount Method
  addedCarInfo.forEach((element) => {
    if (element.licence == searchValue && element.price > 20000) { discountedPrice.textContent = ` The car with licence number: '${element.licence}' has 25% discount. Price of the car after discount is only ${(element.price - (25 / 100 * element.price))} euros` }
    else if (element.licence == searchValue && element.price < 5000) { discountedPrice.textContent = `The car with licence number: '${element.licence}' has 10% discount. Price of the car after discount is only ${element.price - (10 / 100 * (element.price))} euros` }
    else if (element.licence == searchValue && 5000 < element.price < 20000) { discountedPrice.textContent = `The car with licence number: '${element.licence}' has 15% discount. Price of the car after discount is only ${element.price - (15 / 100 * (element.price))} euros` }
  })
}


// Reset search area

const resetSearch = () => {
  document.location.reload();
}



























