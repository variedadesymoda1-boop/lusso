let carrito = [];
let contadorAdmin = 0;

// FUNCIÓN PARA EL PUNTO OCULTO (5 clics)
function clickAdmin() {
    contadorAdmin++;
    if (contadorAdmin === 5) {
        window.location.href = "admin.html"; // O la página donde tengas tu login
    }
    setTimeout(() => { contadorAdmin = 0; }, 3000); // Se reinicia si no haces los 5 clics rápido
}

function toggleCarrito() {
    document.getElementById('modal-carrito').classList.toggle('active');
}

// Agregar al carrito con suma
function agregarAlCarrito(nombre, precio) {
    const itemExistente = carrito.find(i => i.nombre === nombre);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarDibujoCarrito();
}

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(i => i.nombre !== nombre);
    actualizarDibujoCarrito();
}

function actualizarDibujoCarrito() {
    const contenedor = document.getElementById('items-carrito');
    let total = 0;
    contenedor.innerHTML = '';

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        contenedor.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; align-items:center;">
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>${item.cantidad} x $${item.precio}</small>
                </div>
                <button onclick="eliminarDelCarrito('${item.nombre}')" style="color:red; border:none; background:none;">&times;</button>
            </div>
        `;
    });
    document.getElementById('total-precio').innerText = '$' + total;
}

function enviarWhatsApp() {
    let mensaje = "Hola Lusson! ✨ Quiero comprar:\n";
    carrito.forEach(i => mensaje += `- ${i.nombre} (x${i.cantidad})\n`);
    mensaje += `Total: ${document.getElementById('total-precio').innerText}`;
    window.open(`https://wa.me/TUNUMERO?text=${encodeURIComponent(mensaje)}`);
}

