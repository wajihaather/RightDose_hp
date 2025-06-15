// DOM Elements
const loginBtn = document.querySelector('.login-btn');
const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');

// Event Listeners
loginBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Functions
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}