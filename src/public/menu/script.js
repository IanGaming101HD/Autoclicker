const balance = document.getElementById('balance')

balance.innerText = `${(await electron.getBalance() ? await electron.getBalance() : 0).toFixed(2)} €`

const container = document.getElementsByClassName('container')[0]
const services = await electron.services

services.forEach(function(service) {
    let div = document.createElement('div');
    container.appendChild(div);
    div.classList.add('options')

    let id = document.createElement('p')
    let name = document.createElement('p')
    let description = document.createElement('p')
    let price = document.createElement('p')
    let viewButton = document.createElement('button')
    
    div.appendChild(id);
    div.appendChild(name);
    div.appendChild(description);
    div.appendChild(price);
    div.appendChild(viewButton);

    [id, name, description, price].forEach(function(element) {
        element.classList.add('info')
    })
    id.classList.add('id')
    name.classList.add('name')
    description.classList.add('description')
    price.classList.add('price')
    viewButton.classList.add('view_button')

    price.classList.add('right')
    viewButton.classList.add('right')

    id.innerText = service.id
    name.innerText = service.name
    description.innerText = service.description
    // description.innerHTML = service.description
    price.innerText = `${service.price.toFixed(2)} €`
    viewButton.innerText = 'View'

    description.hidden = true
})

const viewButtons = document.getElementsByClassName('view_button')
const closeButton = document.getElementById('close_button')
const orderButton = document.getElementById('order_btn')


Array.from(viewButtons).forEach(function (viewButton) {
    viewButton.addEventListener('click', function () {
        viewButtonEvent(viewButton);
    })
})

async function viewButtonEvent(button) {
    let popupContainer = document.getElementById('popup_container')
    let popupName = document.getElementById('popup_name')
    let popupDescription = document.getElementById('popup_description')

    popupContainer.hidden = false
    popupName.innerText = button.parentNode.getElementsByClassName('name')[0].innerText
    popupDescription.innerHTML = button.parentNode.getElementsByClassName('description')[0].innerHTML

    // window.open('../profile/index.html', '_blank', 'width=500, height=400, autoHideMenuBar=true, resizable=false, webPreferences={ devTools: false }')
}

closeButton.addEventListener('click', function () {
    let popupContainer = document.getElementById('popup_container')
    popupContainer.hidden = true;
})

orderButton.addEventListener('click', async function () {
    location.href = '../order/index.html'
    await electron.centreWindow()

    console.log(1)
    // const { setService } = await electron.require('../order/script.js')
    setService(7)
    console.log(2)
})