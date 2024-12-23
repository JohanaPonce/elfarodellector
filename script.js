

let carrito = [];


function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    actualizarCarrito();
    actualizarVistaCarrito();
}


function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function agregarAlCarrito(nombre, precio, boton) {

    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const nuevoProducto = { nombre, precio, cantidad: 1 };
        carrito.push(nuevoProducto);
    }
    
   
    guardarCarritoEnLocalStorage();
    

    actualizarCarrito();
    

    boton.textContent = "Agregado";
    boton.disabled = true;  
    
    
    setTimeout(() => {
        boton.textContent = "Comprar";
        boton.disabled = false; 
    }, 2000); 
}


function actualizarCarrito() {
    const carritoCount = document.getElementById('carrito-count');
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    carritoCount.textContent = totalProductos;
}


document.getElementById('abrir-carrito').addEventListener('click', function() {
    const productosCarrito = document.getElementById('productos-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    productosCarrito.innerHTML = ''; 
    
    if (carrito.length === 0) {
        productosCarrito.innerHTML = '<li>No hay productos en el carrito.</li>';
        totalCarrito.innerHTML = '<p><strong>Total: $0.00</strong></p>';
    } else {
        let total = 0;
        
        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.classList.add('d-flex', 'justify-content-between', 'align-items-center');
            
            li.innerHTML = `
                ${producto.nombre} - $${(producto.precio * producto.cantidad).toFixed(2)}
                <div class="d-flex align-items-center">
                    <button class="btn btn-secondary btn-sm" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span class="mx-2">${producto.cantidad}</span>
                    <button class="btn btn-secondary btn-sm" onclick="cambiarCantidad(${index}, 1)">+</button>
                    <button class="btn btn-danger btn-sm ml-2" onclick="eliminarProducto(${index})">Eliminar</button>
                </div>
            `;
            
            productosCarrito.appendChild(li);
            total += producto.precio * producto.cantidad;
        });
        
        totalCarrito.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    }
    
    $('#modalCarrito').modal('show'); 
});


function cambiarCantidad(index, cantidad) {
    const producto = carrito[index];
    producto.cantidad += cantidad;
    
    
    if (producto.cantidad <= 0) {
        carrito.splice(index, 1);
    }
    
    
    guardarCarritoEnLocalStorage();
    
    actualizarCarrito();
    actualizarVistaCarrito(); 
}


function eliminarProducto(index) {
    carrito.splice(index, 1); 
    
   
    guardarCarritoEnLocalStorage();
    
    actualizarCarrito();
    actualizarVistaCarrito(); 
}


function vaciarCarrito() {
    carrito = [];
    
   
    guardarCarritoEnLocalStorage();
    
    actualizarCarrito();
    $('#modalCarrito').modal('hide');
}


function realizarCompra() {
    alert('Gracias por tu compra');
    carrito = []; 
    
  
    guardarCarritoEnLocalStorage();
    
    actualizarCarrito();
    $('#modalCarrito').modal('hide');
}


document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        
        const nombreProducto = this.closest('.book-card').querySelector('.card-title').textContent;
        const precioProducto = parseFloat(this.getAttribute('data-precio'));
        
        agregarAlCarrito(nombreProducto, precioProducto, this);
    });
});

function actualizarVistaCarrito() {
    const productosCarrito = document.getElementById('productos-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    productosCarrito.innerHTML = ''; 
    if (carrito.length === 0) {
        productosCarrito.innerHTML = '<li>No hay productos en el carrito.</li>';
        totalCarrito.innerHTML = '<p><strong>Total: $0.00</strong></p>';
    } else {
        let total = 0;
        
        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.classList.add('d-flex', 'justify-content-between', 'align-items-center');
            
            li.innerHTML = `
                ${producto.nombre} - $${(producto.precio * producto.cantidad).toFixed(2)}
                <div class="d-flex align-items-center">
                    <button class="btn btn-secondary btn-sm" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span class="mx-2">${producto.cantidad}</span>
                    <button class="btn btn-secondary btn-sm" onclick="cambiarCantidad(${index}, 1)">+</button>
                    <button class="btn btn-danger btn-sm ml-2" onclick="eliminarProducto(${index})">Eliminar</button>
                </div>
            `;
            
            productosCarrito.appendChild(li);
            total += producto.precio * producto.cantidad;
        });
        
        totalCarrito.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    }
}


window.onload = cargarCarritoDesdeLocalStorage;
