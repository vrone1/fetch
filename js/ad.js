fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(commits => { console.log(commits); });
fetch('https://api.escuelajs.co/api/v1/categories')
    .then(response => response.json())
    .then(commits => { console.log(commits); });

let category = document.querySelectorAll('.category')
const pop = document.getElementById('pop')
console.log(category);
// fetch('https://api.escuelajs.co/api/v1/categories') 
//     .then(response => response.json())
//     .then(commits => {
//         commits.forEach(commit => {
//             for (let index = 0; index < category.length; index++) {
//                 category[index].insertAdjacentHTML('beforeend', `<option value="${commit.id}">${commit.name}</option>`)
//             }
//         })
//     })

let i = 0;
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories')
    const commits = await response.json()
    commits.forEach(commit => {
        for (let index = 0; index < category.length; index++) {
            category[index].insertAdjacentHTML('beforeend', `<option value="${commit.id}">${commit.name}</option>`)
        }
    })
    const categoryVibor = document.querySelector('.category_vibor');
    console.log(categoryVibor);
    categoryVibor.addEventListener('change', (e) => {
        e.preventDefault();
        pop.innerHTML = ''
        console.log(categoryVibor.value);
        fetch(`https://api.escuelajs.co/api/v1/categories/${categoryVibor.value}/products`)
            .then(response => response.json())
            .then(commits => {
                commits.forEach(commit => {
                    pop.insertAdjacentHTML(`beforeend`, `
                        <p>${commit.id}</p>
                        <p onclick="name()">${commit.title}</p>
                        <img src="${commit.images}" height="250px" width="250px" >
                        <p>${commit.price} $</p>
                        <div id="bottom-button-${i}"class="bottom_button">
                            <button onclick="onChange(${commit.id},${i})">Редактировать</button>
                            <button onclick="del(${commit.id})">Удалить</button>
                        </div>
                    `)
                    console.log(commit);
                    i++;
                })
            })
    })
})

function onChange(id, i) {
    console.log(id, i);
    let bottomButton = document.getElementById(`bottom-button-${i}`)
    bottomButton.innerHTML = ''
    bottomButton.insertAdjacentHTML(`beforeend`, `
    <p>Изменить название</p>
    <input type="text" name="priceText" id="priceText">
    <p>Изменить цену</p>
    <input type="number" name="prices" id="prices">
    <button onclick="changeProduct(${id})">Редактировать</button>
    `)
}

function changeProduct(id) {
    let prices = document.getElementById('prices').value
    let priceText = document.getElementById('priceText').value
    console.log(prices, priceText);
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": priceText,
            "price": prices
        })
    }).then(response => console.log(response))
}

function del(id) {
    console.log(id);
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    })

}
function delcategory(params) {
    let categoryId = document.getElementById('categoryDel').value;
    console.log(categoryId);
    fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
        method: "DELETE"
        
    })
        .then(response => response.json())
        .then(comment => console.log(comment))
}

document.getElementById('button').addEventListener('click', (e) => { 
    e.preventDefault;
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let file = document.getElementById('foto').value;
    let categoryId = document.getElementById('category').value;
    fetch('https://api.escuelajs.co/api/v1/products/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": `${title}`,
            "price": `${price}`,
            "description": `${description}`,
            "categoryId": `${categoryId}`,
            "images": [`${file}`]
        })
    })
        .then(response => response.json())
        .then(comment => console.log(comment))

})
document.getElementById('button1').addEventListener('click', (e) => { 
    e.preventDefault;
    let catrerogy = document.getElementById('catrerogy').value;
    let image = document.getElementById('image').value;
    fetch('https://api.escuelajs.co/api/v1/categories/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "name": `${catrerogy}`,
            "image": `${image}`
        })
    })
        .then(response => response.json())
        .then(comment => console.log(comment))
})