document.addEventListener('DOMContentLoaded', function() {
    // Track clicks on the hero "Learn More" button
    const heroButton = document.getElementById('heroLearnMoreButton');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            gtag('event', 'click', {
                'event_category': 'CTA',
                'event_label': 'Hero Learn More Button'
            });
        });
    }

    // Track clicks on the Calendar Invite button
    const calendarButton = document.getElementById('calendarInviteButton');
    if (calendarButton) {
        calendarButton.addEventListener('click', function() {
            gtag('event', 'click', {
                'event_category': 'CTA',
                'event_label': 'Calendar Invite Button'
            });
        });
    }

    // Track clicks on the Donate Now button
    const donateButton = document.getElementById('donateButton');
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            gtag('event', 'click', {
                'event_category': 'CTA',
                'event_label': 'Donate Now Button'
            });
        });
    }

    // Lightbox functionality for gallery images
    const galleryItems = document.querySelectorAll('.gallery a');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal .close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const imgSrc = this.getAttribute('href');
            modal.style.display = 'block';
            modalImg.src = imgSrc;
        });
    });

    // Close modal when the close span is clicked
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
