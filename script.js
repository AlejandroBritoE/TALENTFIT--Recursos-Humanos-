// Menu Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierta
        document.querySelector('.nav-links').classList.remove('active');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// envío de formularios
//document.getElementById('contactForm').addEventListener('submit', function(e) {
//   e.preventDefault();
    
    // enviar los datos del formulario a un servidor.
    // For now, we'll just show an alert
//    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
//    this.reset();
//});

//document.getElementById('contactForm').addEventListener('submit', function(e) {
//    e.preventDefault();
//    fetch(this.action, {
//        method: 'POST',
//        body: new FormData(this),
//        headers: { 'Accept': 'application/json' }
//    })
//    .then(response => {
//        if (response.ok) {
//            alert('Mensaje enviado. ¡Gracias!');
//            this.reset();
//        } else {
//            throw new Error('Error en el envío');
//        }
//    })
//    .catch(error => {
//        alert('Error al enviar. Por favor, inténtalo de nuevo.');
//        console.error(error);
//    });
//});

//document.getElementById('newsletterForm').addEventListener('submit', function(e) {
//    e.preventDefault();
    
//    const email = this.querySelector('input[type="email"]').value;
//    alert(`Gracias por suscribirte con el correo: ${email}`);
//    this.reset();
//});


// Configuración de EmailJS (debes registrarte en https://www.emailjs.com/)
// Configuración de EmailJS (debes registrarte en https://www.emailjs.com/)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Inicializa EmailJS con tu User ID (debe comenzar con "user_", no "service_")
    emailjs.init('TU_USER_ID_AQUI'); // Reemplaza con tu User ID real
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Envía el correo usando EmailJS - CORRECCIÓN DE PARÉNTESIS Y COMILLAS
        emailjs.send("service_7g18o9h", "template_mmkwdey", {
            from_name: document.getElementById('nombre').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('telefono').value,
            service: document.getElementById('servicio').value,
            message: document.getElementById('mensaje').value
        })
        .then(function(response) {
            alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
            document.getElementById('contactForm').reset();
        }, function(error) {
            throw new Error('Error al enviar el mensaje: ' + JSON.stringify(error));
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});




// Formulario de newsletter
document.getElementById('newsletterForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const email = form.querySelector('input[type="email"]').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    if (!validateEmail(email)) {
        showAlert('Por favor ingresa un email válido', 'error');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Suscribiendo...';
        
        const response = await fetch(API_ENDPOINTS.newsletter, {
            method: 'POST',
            body: JSON.stringify({
                type: 'newsletter',
                email: email
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert(`¡Gracias por suscribirte con ${email}!`, 'success');
            form.reset();
        } else {
            throw new Error(result.error || 'Error en el servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Hubo un error al procesar la suscripción.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});

// Funciones auxiliares
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, type = 'success') {
    // Puedes implementar un sistema de notificaciones más elegante
    alert(message);
    
    // Ejemplo con un div de notificaciones:
    /*
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
    */
}

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Simple Testimonial Slider (would be enhanced with a proper slider library in production)
let currentTestimonial = 0;
const testimonials = [
    {
        text: '"Con TalentFit redujimos la rotación en un 40% y encontramos líderes clave para nuestra expansión internacional. Su enfoque estratégico marcó la diferencia."',
        author: "María González",
        company: "CEO, TechStart Inc."
    },
    {
        text: '"La metodología de TalentFit nos ayudó a identificar habilidades críticas en nuestro equipo que no sabíamos que existían. Increíble trabajo."',
        author: "Carlos Mendoza",
        company: "Director de RH, FinanzasGlobal"
    },
    {
        text: '"El proceso de selección fue tan preciso que el candidato que nos presentaron encajó perfectamente desde el primer día. Altamente recomendados."',
        author: "Ana Lucía Ramírez",
        company: "Gerente General, RetailPro"
    }
];

function showTestimonial(index) {
    const testimonial = testimonials[index];
    const testimonialElement = document.querySelector('.testimonial');
    
    testimonialElement.querySelector('.testimonial-text').textContent = testimonial.text;
    testimonialElement.querySelector('.testimonial-author').textContent = testimonial.author;
    testimonialElement.querySelector('.testimonial-company').textContent = testimonial.company;
}

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Initialize first testimonial
showTestimonial(0);