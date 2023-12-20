/**
* Template Name: Day
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/day-multipurpose-html-template-for-free/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

/// QUE APAREZCA EL BTN WHATSAPP CON SCROLL ////
// Obtén una referencia al elemento del botón de WhatsApp
const whatsappButton = document.querySelector('.whatsapp');

// Obtén una referencia al div con el id "about"
const aboutSection = document.querySelector('#about');

// Función para verificar si el usuario ha desplazado hasta la sección "about"
function checkScroll() {
  const scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition >= aboutSection.offsetTop) {
    // Si el desplazamiento es mayor o igual a la parte superior de la sección "about", muestra el botón de WhatsApp
    whatsappButton.style.display = 'block';
  } else {
    // De lo contrario, oculta el botón de WhatsApp
    whatsappButton.style.display = 'none';
  }
}

// Agrega un detector de eventos para el evento de desplazamiento (scroll)
window.addEventListener('scroll', checkScroll);

// Llama a la función inicialmente para comprobar el estado al cargar la página
checkScroll();

//SWEETALERT

// document.addEventListener('DOMContentLoaded', function () {
//   const myForm = document.getElementById('myForm');

//   myForm.addEventListener('submit', function (event) {
//       event.preventDefault(); // Evitar que el formulario se envíe normalmente

//       const nombre = myForm.querySelector('[name="Nombre"]').value;
//       const email = myForm.querySelector('[name="E-mail"]').value;
//       const telefono = myForm.querySelector('[name="Teléfono"]').value;
//       const asunto = myForm.querySelector('[name="Asunto"]').value;
//       const mensaje = myForm.querySelector('[name="Mensaje"]').value;

//       if (!nombre || !email || !telefono || !asunto || !mensaje) {
//           // Si algún campo está vacío, muestra un mensaje de error
//           Swal.fire({
//               title: 'Error',
//               text: 'Por favor, completa todos los campos del formulario.',
//               icon: 'error',
//               confirmButtonText: 'OK',
//               customClass: {
//                   confirmButton: 'swal-confirm-button-error'
//               }
//           });
//       } else {
//           // Si todos los campos están llenos, muestra un mensaje de éxito
//           Swal.fire({
//               // imageUrl: "img/logo-head.png",
//               title: 'TEMPORARIOS DEL KEMPES',
//               text: 'Gracias por tu mensaje.',
//               icon: 'success',
//               confirmButtonText: 'OK',
//               customClass: {
//                   title: 'swal-title-success',
//                   text:  'swal-text-success'
//               }
//           }).then(() => {
//               // Después de hacer clic en OK, reinicia el formulario
//               myForm.reset();
//           });
//       }
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('miFormularioSweetAlert');

  formulario.addEventListener('submit', function (event) {
      event.preventDefault();

      const nombre = formulario.querySelector('[name="Nombre"]').value;
      const email = formulario.querySelector('[name="E-mail"]').value;
      const telefono = formulario.querySelector('[name="Teléfono"]').value;
      const asunto = formulario.querySelector('[name="Asunto"]').value;
      const mensaje = formulario.querySelector('[name="Mensaje"]').value;

      if (!nombre || !email || !telefono || !asunto || !mensaje) {
          mostrarError();
      } else {
          mostrarAgradecimiento();
      }
  });

  function mostrarAgradecimiento() {
      Swal.fire({
          title: 'TEMPORARIOS DEL KEMPES',
          text: 'Mensaje Enviado ¡Muchas Gracias!',
          icon: 'success',
          confirmButtonText: 'OK'
      }).then(() => {
          formulario.reset();
      });
  }

  function mostrarError() {
      Swal.fire({
          title: 'Error',
          text: 'Por favor, completa todos los campos del formulario.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
              confirmButton: 'swal-confirm-button-error'
          }
      });
  }
});