// Configuración de imágenes por sección
const galleries = {
    fachada: [
        'IMG-20251005-WA0032.jpg',
        'IMG-20251005-WA0033.jpg',
        'IMG-20251005-WA0039.jpg',
        'IMG-20251005-WA0042.jpg',
        'IMG-20251005-WA0043.jpg',
        'IMG-20251005-WA0044.jpg',
        'IMG-20251005-WA0045.jpg',
        'IMG-20251005-WA0046.jpg',
        'IMG-20251005-WA0047.jpg',
        'IMG-20251005-WA0048.jpg',
        'IMG-20251005-WA0049.jpg',
        'IMG-20251005-WA0050.jpg',
        'IMG-20251005-WA0051.jpg',
        'IMG-20251005-WA0055.jpg'
    ],
    cocina: [
        'IMG-20251005-WA0032.jpg',
        'IMG-20251005-WA0033.jpg',
        'IMG-20251005-WA0034.jpg',
        'IMG-20251005-WA0035.jpg',
        'IMG-20251005-WA0036.jpg',
        'IMG-20251005-WA0037.jpg',
        'IMG-20251005-WA0038.jpg',
        'IMG-20251005-WA0040.jpg',
        'IMG-20251005-WA0041.jpg'
    ],
    'recamara-principal': [
        'IMG-20251005-WA0013.jpg',
        'IMG-20251005-WA0018.jpg',
        'IMG-20251005-WA0022.jpg',
        'IMG-20251005-WA0023.jpg',
        'IMG-20251005-WA0024.jpg',
        'IMG-20251005-WA0025.jpg',
        'IMG-20251005-WA0026.jpg',
        'IMG-20251005-WA0027.jpg',
        'IMG-20251005-WA0028.jpg',
        'IMG-20251005-WA0029.jpg',
        'IMG-20251005-WA0030.jpg',
        'IMG-20251005-WA0031.jpg'
    ],
    'recamara-visita': [
        'IMG-20251013-WA0003.jpg',
        'IMG-20251013-WA0004.jpg',
        'IMG-20251013-WA0005.jpg',
        'IMG-20251013-WA0006.jpg',
        'IMG-20251013-WA0007.jpg'
    ],
    terraza: [
        'IMG-20251005-WA0013.jpg',
        'IMG-20251005-WA0014.jpg',
        'IMG-20251005-WA0015.jpg',
        'IMG-20251005-WA0016.jpg',
        'IMG-20251005-WA0017.jpg',
        'IMG-20251005-WA0019.jpg',
        'IMG-20251005-WA0020.jpg',
        'IMG-20251005-WA0021.jpg'
    ]
};

// Variable para almacenar todas las imágenes de la galería actual
let currentGallery = [];
let currentImageIndex = 0;

// Función para cargar las galerías
function loadGalleries() {
    Object.keys(galleries).forEach(section => {
        const container = document.getElementById(`gallery-${section}`);
        if (container) {
            galleries[section].forEach((image, index) => {
                const imgPath = `img/${section}/${image}`;
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.setAttribute('data-section', section);
                galleryItem.setAttribute('data-index', index);

                const img = document.createElement('img');
                img.src = imgPath;
                img.alt = `${section} - Imagen ${index + 1}`;
                img.loading = 'lazy';

                galleryItem.appendChild(img);
                container.appendChild(galleryItem);

                // Event listener para abrir lightbox
                galleryItem.addEventListener('click', () => {
                    openLightbox(section, index);
                });
            });
        }
    });
}

// Función para abrir el lightbox
function openLightbox(section, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    currentGallery = galleries[section].map(img => `img/${section}/${img}`);
    currentImageIndex = index;

    lightbox.style.display = 'block';
    lightboxImg.src = currentGallery[currentImageIndex];
    caption.textContent = `${section.replace('-', ' ')} - Imagen ${currentImageIndex + 1} de ${currentGallery.length}`;

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para navegar a la imagen anterior
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
}

// Función para navegar a la siguiente imagen
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    updateLightboxImage();
}

// Función para actualizar la imagen del lightbox
function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    lightboxImg.src = currentGallery[currentImageIndex];
    caption.textContent = `Imagen ${currentImageIndex + 1} de ${currentGallery.length}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar galerías
    loadGalleries();

    // Cerrar lightbox
    const closeBtn = document.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);

    // Navegación del lightbox
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Cerrar lightbox al hacer click fuera de la imagen
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    // Smooth scroll para la navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ahora, solo mostramos un mensaje
        alert('¡Gracias por tu interés! Te contactaremos pronto.');

        // Limpiar el formulario
        contactForm.reset();
    });
});

// Animación de aparición de elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.info-card, .gallery-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
