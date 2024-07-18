let productos = [];

const agregarProducto = async (id, producto, precio) => {
    let indice = productos.findIndex(p => p.id == id);

    if (indice != -1) {
        productos[indice].cantidad++;
        await putJSON(productos[indice]);
    } else {
        let nuevoProducto = {
            id: id,
            producto: producto,
            precio: precio,
            cantidad: 1
        };
        productos.push(nuevoProducto);
        await postJSON(nuevoProducto);
    }

    actualizarTabla();
};

const actualizarTabla = () => {
    let tbody = document.getElementById('tbody');
    let total = 0;

    tbody.innerHTML = '';

    for (let item of productos) {
        let fila = tbody.insertRow();

        let celdaProducto = fila.insertCell(0);
        let celdaCantidad = fila.insertCell(1);
        let celdaPrecio = fila.insertCell(2);
        let celdaTotal = fila.insertCell(3);
        let celdaBoton = fila.insertCell(4);

        celdaProducto.textContent = item.producto;
        celdaCantidad.textContent = item.cantidad;
        celdaPrecio.textContent = item.precio;
        celdaTotal.textContent = item.precio * item.cantidad;

        let boton = document.createElement('button');
        boton.textContent = 'Borrar';
        celdaBoton.append(boton);

        boton.addEventListener("click", function () {
            eliminar(item.id);
        });

        total += item.precio * item.cantidad;
    }

    document.getElementById('total').textContent = total.toFixed(2);
};

const eliminar = async (id) => {
    let indice = productos.findIndex(p => p.id == id);

    if (indice != -1) {
        productos.splice(indice, 1);
        await deleteJSON(id); // Llama a la función para eliminar el producto del servidor
        actualizarTabla(); // Actualiza la tabla después de eliminar el producto
    }
};

const postJSON = async (data) => {
    try {
        const response = await fetch("http://localhost:3000/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
};

const getJSON = async () => {
    try {
        const response = await fetch("http://localhost:3000/productos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        productos = result;
        actualizarTabla();
    } catch (error) {
        console.error("Error:", error);
    }
};

const putJSON = async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/productos/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
};

const deleteJSON = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        console.log("Success:", result); // Verifica en la consola que se eliminó correctamente
    } catch (error) {
        console.error("Error:", error);
    }
};

window.onload = function () {
    getJSON();
};
