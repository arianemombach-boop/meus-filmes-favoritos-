document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const searchInput = document.getElementById('searchInput');
  const cardsGrid = document.getElementById('cardsGrid');
  const filterChips = document.querySelectorAll('.chip');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const toast = document.getElementById('toast');

  // --- Toggle Sidebar ---
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--collapsed');
    mainContent.classList.toggle('main-content--expanded');
    
    // Mobile handling
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('active');
    }
  });

  // --- Search Functionality ---
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      const title = card.querySelector('.card__title').textContent.toLowerCase();
      const desc = card.querySelector('.card__desc').textContent.toLowerCase();
      
      if (title.includes(term) || desc.includes(term)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // --- Filter Chips ---
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Update UI
      filterChips.forEach(c => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');
      
      const filter = chip.getAttribute('data-filter');
      const cards = document.querySelectorAll('#cardsGrid .card');
      
      cards.forEach(card => {
        const genres = card.getAttribute('data-genre');
        if (filter === 'all' || genres.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Sidebar Filter Links ---
  const sidebarFilters = document.querySelectorAll('.sidebar__item[data-filter]');
  sidebarFilters.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');
      
      // Trigger chip click
      const correspondingChip = document.querySelector(`.chip[data-filter="${filter}"]`);
      if (correspondingChip) correspondingChip.click();
      
      // Scroll to grid
      document.getElementById('filterSection').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Global Functions ---
  window.openModal = (movieId) => {
    const movieData = {
      'minha-culpa-londres': {
        title: 'Minha Culpa: Londres',
        year: '2025',
        duration: '1h 58min',
        desc: 'Noah se muda para Londres e se apaixona pelo meio-irmão Nick, filho do novo marido de sua mãe. Uma história de amor proibido e intensas emoções.'
      },
      'culpa-mia': {
        title: 'Culpa Mia',
        year: '2023',
        duration: '1h 56min',
        desc: 'O início de tudo. Noah e Nick se conhecem e descobrem uma atração irresistível.'
      }
    };

    const movie = movieData[movieId] || { title: 'Filme', year: 'N/A', duration: 'N/A', desc: 'Descrição não disponível.' };

    modalContent.innerHTML = `
      <div class="video-placeholder">
        <svg viewBox="0 0 24 24" fill="white" width="80" height="80"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <p>Carregando player para: ${movie.title}...</p>
      </div>
      <div style="padding: 24px;">
        <h2 style="font-size: 28px; margin-bottom: 10px;">${movie.title}</h2>
        <p style="color: #aaa; margin-bottom: 15px;">${movie.year} &bull; ${movie.duration}</p>
        <p style="font-size: 16px; line-height: 1.6;">${movie.desc}</p>
        <div style="margin-top: 20px; display: flex; gap: 10px;">
          <button class="btn btn--primary">Continuar Assistindo</button>
          <button class="btn btn--secondary">Baixar</button>
        </div>
      </div>
    `;
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = () => {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalContent.innerHTML = '';
  };

  window.toggleFavorite = (btn) => {
    const svg = btn.querySelector('svg');
    const isFav = svg.getAttribute('fill') === 'currentColor' || svg.getAttribute('fill') === 'white';
    
    if (isFav) {
      svg.setAttribute('fill', 'none');
      showToast('Removido da sua lista');
    } else {
      svg.setAttribute('fill', 'currentColor');
      showToast('Adicionado à sua lista!');
    }
  };

  function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }
});
