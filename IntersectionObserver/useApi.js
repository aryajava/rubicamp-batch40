// Use API
let currentPage = 1;
const cardContainer = document.querySelector('.card-container');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
});

const lastCardObserver = new IntersectionObserver(entries => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  lastCardObserver.unobserve(lastCard.target);
  loadNewCards();
});

const loadNewCards = async () => {
  const response = await fetch(`http://localhost:3001/api/phonebooks/?page=${currentPage}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  data.phonebooks.forEach(phonebook => {
    const card = document.createElement('div');
    card.textContent = phonebook.name;
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  });
  currentPage++;
  const newLastCard = document.querySelector('.card:last-child');
  if (newLastCard) {
    lastCardObserver.observe(newLastCard);
  }
};

// Initial load
loadNewCards();