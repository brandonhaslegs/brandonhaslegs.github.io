document.addEventListener('DOMContentLoaded', () => {
    // Fetch the nav.html file and insert it into the placeholder
    fetch('../partials/nav.html')
        .then((response) => response.text())
        .then((data) => {
            // Insert the fetched navigation HTML into the placeholder
            document.getElementById('nav-placeholder').innerHTML = data;

            // Highlight the current page link
            highlightCurrentPage();

            // Call the random logo function after the nav is loaded
            displayRandomLogo();
        })
        .catch((error) => {
            console.error('Error loading navigation:', error);
        });
});

function displayRandomLogo() {
    // Define the list of logo image URLs
    const logos = [
        'images/logo1.png',
        'images/logo2.png',
        'images/logo3.png',
        'images/logo4.png',
        'images/logo5.png',
        'images/logo6.png',
        'images/logo7.png',
        'images/logo8.png',
        'images/logo9.png',
        'images/logo10.png',
        'images/logo11.png',
        'images/logo12.png',
        'images/logo13.png',
    ];

    // Select a random logo
    const randomLogo = logos[Math.floor(Math.random() * logos.length)];

    // Update the header logo
    const logoElement = document.getElementById('header-logo');
    if (logoElement) {
        logoElement.src = randomLogo;
        logoElement.alt = 'Random Logo';
    }
}

function highlightCurrentPage() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop(); // e.g., "about.html" or ""

    // Select all navigation links
    const navLinks = document.querySelectorAll('#nav-placeholder a');

    // Loop through each link and add the "current" class to the matching link
    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('current'); // Add the "current" class
        }
    });
}
