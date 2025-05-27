// Configuración de EmailJS
const EMAILJS_CONFIG = {
  publicKey: "oXuCofiZojInLu4qK",
  serviceID: "service_7g18o9h",
  templateID: "template_mmkwdey"
};

// Función para manejar el envío del formulario
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Asegúrate que estos nombres coincidan con tu plantilla en EmailJS
    const templateParams = {
      to_name: "Equipo TalentFit", // Nombre del destinatario
      from_name: form.nombre.value.trim(),
      from_email: form.email.value.trim(),
      phone: form.fono.value.trim() || 'No proporcionado',
      service: form.servicio.value,
      message: form.mensaje.value.trim() || 'Sin mensaje adicional'
    };

    //console.log("Enviando con parámetros:", templateParams);

    // >>> AQUÍ AGREGA EL CONSOLE.LOG <<<
    console.log("Parámetros que se enviarán:", {
      serviceID: EMAILJS_CONFIG.serviceID,
      templateID: EMAILJS_CONFIG.templateID,
      publicKey: EMAILJS_CONFIG.publicKey,
      templateParams: templateParams
    });

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      templateParams
    );
    
    console.log('Email enviado:', response);
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
    form.reset();
  } catch (error) {
    console.error('Error completo:', error);
    alert('Error al enviar: ' + error.text || error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await emailjs.init(EMAILJS_CONFIG.publicKey);
    document.getElementById('contactForm')?.addEventListener('submit', handleSubmit);
    console.log('EmailJS inicializado correctamente');
  } catch (error) {
    console.error('Error inicializando EmailJS:', error);
  }
});
