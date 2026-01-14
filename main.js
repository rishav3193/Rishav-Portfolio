document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(7px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
      navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.glass-card, .skill-card, .project-card, .cert-card, .contact-card');

  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fillBar 1.5s ease forwards';
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const cursor = document.createElement('div');
  cursor.classList.add('cursor-glow');
  document.body.appendChild(cursor);

  const style = document.createElement('style');
  style.textContent = `
    .cursor-glow {
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 9999;
      transition: width 0.2s, height 0.2s;
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
    });
  });
});
