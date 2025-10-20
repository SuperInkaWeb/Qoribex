document.addEventListener('DOMContentLoaded', () => {
  const serviceInfo = {
    marketing: {
      title: 'Marketing 360°',
      copy: 'Campañas integradas, automatizaciones y analítica conectada para acelerar tu funnel.',
      cta: '#servicios',
    },
    branding: {
      title: 'Branding que posiciona',
      copy: 'Identidades visuales, storytelling y activaciones que diferencian tu marca en cada touchpoint.',
      cta: '#branding-exito',
    },
    web: {
      title: 'Web & Tecnología',
      copy: 'Sitios, e-commerce y landings full stack con SEO técnico y performance desde el día uno.',
      cta: '#desarrollo-exito',
    },
    comunicacion: {
      title: 'Comunicación estratégica',
      copy: 'Planes editoriales, contenidos audiovisuales y PR digital para fidelizar comunidades.',
      cta: '#audiovisuales-exito',
    },
  };

  const buttons = document.querySelectorAll('.toolbar-btn');
  const titleEl = document.getElementById('toolbar-title');
  const copyEl = document.getElementById('toolbar-copy');
  const ctaEl = document.querySelector('.toolbar-cta');

  if (!buttons.length || !titleEl || !copyEl || !ctaEl) {
    return;
  }

  const activateButton = (button) => {
    buttons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });
  };

  const updatePanel = (key) => {
    const info = serviceInfo[key];
    if (!info) {
      return;
    }

    titleEl.textContent = info.title;
    copyEl.textContent = info.copy;
    ctaEl.setAttribute('href', info.cta);
  };

  buttons.forEach((button) => {
    const key = button.dataset.key;

    button.addEventListener('click', () => {
      activateButton(button);
      updatePanel(key);
    });

    button.addEventListener('mouseenter', () => {
      updatePanel(key);
    });

    button.addEventListener('focus', () => {
      updatePanel(key);
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateButton(button);
        updatePanel(key);
      }
    });
  });
});
