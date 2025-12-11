// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Package selection & Modal Logic
function selectPackage(packageName, price) {
    // 1. Preseleccionar en el formulario
    document.getElementById('paquete').value = `${packageName} - ${price} ARS`;
    
    // 2. Preparar el modal
    document.getElementById('modalTitle').textContent = `Has elegido: ${packageName}`;
    // Mantenemos el signo $ y especificamos ARS en el modal
    document.getElementById('modalText').innerHTML = `Precio: <strong>${price}/mes ARS</strong>. <br>Para continuar, completá el formulario. Te responderé al email en menos de 1 hora`;
    
    // 3. Mostrar modal
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Hacemos que la función selectPackage esté disponible globalmente
window.selectPackage = selectPackage;
window.closeModal = closeModal;