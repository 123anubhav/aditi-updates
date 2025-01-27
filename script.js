

// Enhanced date formatting
function formatDate(date) {
    const options = { 
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

document.getElementById('dateText').textContent = formatDate(new Date());

document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    this.reset();
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});
