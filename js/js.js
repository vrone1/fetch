"use strict"

const product = document.getElementById('product');
const button = document.getElementById('button');
const main = document.getElementById('main_name');
const categories = []

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch('https://api.escuelajs.co/api/v1/categories')
  const commits = await response.json()
  console.log(commits);
  commits.forEach(element => {
    console.log(element);
    categories.push({
      id: element.id,
      name: element.name,
    })

  })

  categories.forEach(el => {

    button.insertAdjacentHTML('beforeend', `
        <button class="button-cat" data-id='${el.id}' data-name='${el.name}'>${el.name}</button>
    `)
  })
  Array.from(document.querySelectorAll(".button-cat")).forEach(el => {
    el.addEventListener("click", (event) => {
      main.innerHTML = ''
      product.innerHTML = ''
      const nameCategory = event.target.dataset.name;
      const catId = event.target.dataset.id
      main.insertAdjacentHTML('beforeend', `<p>${nameCategory}</p>`)
      fetch(`https://api.escuelajs.co/api/v1/categories/${catId}/products`)
        .then(response => response.json())
        .then(commits => {
          console.log(commits);
          commits.forEach(element => {

            product.insertAdjacentHTML('beforeend', `
                        <div class="block_product">
                            <p >${element.id}</p>
                            <p onclick="name()">${element.title}</p>
                            <a href="vivod.html?${element.id}"><img src="${element.images}" height="250px" width="250px" ></a>
                            <p>${element.price} $</p>
                            <div class="buttons">
                                <button onclick="">Добавить в корзину</button>
                            </div>
                        </div>
                    `);
          });
        });
    })
  })
})

const test = () => {
  console.log(categories[0].id);
}


fetch(`https://api.escuelajs.co/api/v1/categories/${categories.id}/products`)
  .then(response => response.json())
  .then(commits => {
    console.log(commits);
    commits.forEach(element => {
      io.insertAdjacentHTML('beforeend', `
         <p >${element.id}</p>
         <p onclick="name()">${element.title}</p>
         <a href="vivod.html?${element.id}"><img src="${element.images}" height="250px" width="250px" ></a>
         <p>${element.price} $</p>
         <p onclick="del(${element.id})" class="del">X</p>
     `);

    });
  });



fetch(`https://api.escuelajs.co/api/v1/categories/${categories.school}/products`)
  .then(response => response.json())
  .then(commits => {
    console.log(commits);
    commits.forEach(element => {
      io.insertAdjacentHTML('beforeend', `
             <p >${element.id}</p>
             <p onclick="name()">${element.title}</p>
             <a href="vivod.html?${element.id}"><img src="${element.images}" height="250px" width="250px" ></a>
             <p>${element.price} $</p>
             <p onclick="del(${element.id})" class="del">X</p>
         `);

    });
  });
fetch('https://api.escuelajs.co/api/v1/categories')
  .then(response => response.json())
  .then(comment => console.log(comment))

function clickAdd() {
  fetch('https://api.escuelajs.co/api/v1/products/', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "title": "Что-то",
      "price": 100,
      "description": "Зачем",
      "categoryId": 27,
      "images": ["https://upload.wikimedia.org/wikipedia/commons/b/bc/Kenyan_man_2.jpg"]
    })
  })
    .then(response => response.json())
    .then(comment => console.log(comment))
}



