let shopping = []
let rowIndex = 0

function createProductContainer(id) {
    const productContainer = document.createElement('div')
    productContainer.classList.add('product-container')
    productContainer.id = `product-${id}`
    return productContainer
}

function createProductName(product) {
    const name = document.createElement('span')
    name.classList.add('product-name')
    name.textContent = product
    return name
}

function createQuantityAndPrice(quantity, price) {
    const quantityAndPrice = document.createElement('span')
    quantityAndPrice.classList.add('quantity-price')

    const formatePrice = price.toFixed(2)

    quantityAndPrice.textContent = `${quantity} x ${formatePrice}`
    return quantityAndPrice
}

function createProductTotal(total) {
    const productTotal = document.createElement('span')
    productTotal.classList.add('product-total')

    const formater = Intl.NumberFormat('pt-BR', {
        compactDisplay: 'long',
        currency: 'BRL',
        style: 'currency'
    })
    
    const formateTotal = formater.format(total)
    productTotal.textContent = `${formateTotal}`
    return productTotal
}

// ----------------------------------------------------------------------------------------

function createDeleteShoppingBtn(id) {
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>'

    deleteBtn.addEventListener('click', () => {
        deleteBtn.parentElement.remove()
        const indexToRemove = shopping.findIndex((t) => t.id === id)
        shopping.splice(indexToRemove, 1)

        updateTotal()
    })

   return deleteBtn
}

// ----------------------------------------------------------------------------------------

function renderShopping(product) {

    const container = createProductContainer(product.id)
    const name = createProductName(product.product)
    const quantityAndPrice = createQuantityAndPrice(product.quantity, product.price)
    const total = createProductTotal(product.total)
    const deleteBtn = createDeleteShoppingBtn(product.id)

    container.append(name, quantityAndPrice, total, deleteBtn)
    document.querySelector('#shopping').append(container)
}

// ----------------------------------------------------------------------------------------

function updateTotal() {
    const shoppingTotal = document.querySelector('#total')
    const totality = shopping.reduce((sum, shopping) => sum + shopping.total, 0)

    const formater = Intl.NumberFormat('pt-BR', {
        compactDisplay: 'long',
        currency: 'BRL',
        style: 'currency'
    })

    shoppingTotal.textContent = formater.format(totality)
}

// ----------------------------------------------------------------------------------------

function saveProduct(ev) {
    ev.preventDefault()

    let id = parseFloat(document.querySelector('#id').value)
    const product = document.querySelector('#product').value
    const quantity = parseFloat(document.querySelector('#quantity').value)
    const price = parseFloat(document.querySelector('#price').value)
    const total = quantity * price

    id = rowIndex
    rowIndex++
 
    let newProduct = {id, product, quantity, price, total}  
    shopping.push(newProduct) 

    renderShopping(newProduct)
    
    ev.target.reset()
    updateTotal()
}

// ----------------------------------------------------------------------------------------

document.querySelector('form').addEventListener('submit', saveProduct)
