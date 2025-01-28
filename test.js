
// Add mobile number validation
document.querySelector('input[name="mobile"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 10) {
        value = value.slice(0, 10); // Limit to 10 digits
    }
    e.target.value = value;
});

async function submitRSVP(event) {
    event.preventDefault();
    
    const form = document.getElementById('rsvpForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate mobile number
    const mobileInput = form.querySelector('input[name="mobile"]');
    if (mobileInput.value.length !== 10) {
        errorMessage.textContent = 'Please enter a valid 10-digit mobile number';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
        return false;
    }

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

    // Google Apps Script URL - Replace with your deployed Web App URL
   // const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   // const scriptURL = 'https://script.google.com/macros/s/AKfycbwjLFRvfNlHff9qGoWtz8ApjCCTdlL6qZ6aRJW0CjvrkH9vRTUWVGv9yarRIEUBv-B-/exec';

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyq8GztyvO6OCHoEaIq-jmhi2UhKJTUg0DuC9mYQJkdp4DmBDXRNqnY8tXHDbzTrbZw/exec';
    
    try {
        const formData = new FormData(form);
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Show success message
            form.reset();
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error!', error.message);
        errorMessage.textContent = 'Oops! Something went wrong. Please try again later.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.innerHTML = 'Submit';
    
    return false;
}






/////////////

function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(JSON.stringify(e.parameter));

    // Append the data to the sheet
    sheet.appendRow([data.name, data.mobile, data.guests, data.attending, data.message, new Date()]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}


//https://script.google.com/macros/s/AKfycbytq0TwNxcUvJaz27SzNMDkJ-y0jcLlTafBc_-8NmuHO5pqWqwAnXVfXeixFqJlINyQ/exec