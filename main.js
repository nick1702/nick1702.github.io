//main.js

// Wait for the DOM to load before attaching event handlers
document.addEventListener('DOMContentLoaded', function() {
    // "I'm Interested" button functionality using localStorage for unique (per browser) clicks
    let interestedCount = localStorage.getItem('interestedCount') || 0;
    document.getElementById('interestedCount').innerText = interestedCount;

    document.getElementById('imInterestedBtn').addEventListener('click', function() {
        if (!localStorage.getItem('imInterestedClicked')) {
            localStorage.setItem('imInterestedClicked', 'true');
            interestedCount = parseInt(interestedCount) + 1;
            localStorage.setItem('interestedCount', interestedCount);
            document.getElementById('interestedCount').innerText = interestedCount;
            alert("Thank you for your interest!");
        } else {
            alert("You've already indicated your interest. Thank you!");
        }
    });
});
