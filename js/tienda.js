const productos = {
    Galon: [
        { name: "Galón A", price: 10.00 },
        { name: "Galón B", price: 12.00 }
    ],
    Caneca: [
        { name: "Caneca A", price: 15.00 },
        { name: "Caneca B", price: 18.00 }
    ]
};

document.getElementById('Galon').addEventListener('click', () => showProductList('Galon'));
document.getElementById('Caneca').addEventListener('click', () => showProductList('Caneca'));

function showProductList(productType) {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';

    products[productType].forEach(product => {
        const productButton = document.createElement('button');
        productButton.className = 'btn btn-info m-2';
        productButton.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productButton.addEventListener('click', () => addProductToTable(product));
        productListDiv.appendChild(productButton);
    });
}

function addProductToTable(product) {
    const tbody = document.getElementById('tbody');
    const row = document.createElement('tr');

    const productCell = document.createElement('td');
    productCell.textContent = product.name;

    const quantityCell = document.createElement('td');
    quantityCell.innerHTML = '<input type="number" value="1" min="1" class="form-control quantity">';

    const priceCell = document.createElement('td');
    priceCell.textContent = product.price.toFixed(2);

    const totalCell = document.createElement('td');
    totalCell.textContent = product.price.toFixed(2);
    totalCell.classList.add('total');

    const actionCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.classList.add('btn', 'btn-danger', 'btn-sm');
    removeButton.addEventListener('click', () => {
        row.remove();
        updateTotal();
    });
    actionCell.appendChild(removeButton);

    row.appendChild(productCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(totalCell);
    row.appendChild(actionCell);

    tbody.appendChild(row);

    quantityCell.querySelector('input').addEventListener('input', (event) => {
        const quantity = event.target.value;
        totalCell.textContent = (product.price * quantity).toFixed(2);
        updateTotal();
    });

    updateTotal();
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.total').forEach(cell => {
        total += parseFloat(cell.textContent);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}