// Display current date
document.addEventListener('DOMContentLoaded', function() {
    const dateText = document.getElementById('dateText');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateText.textContent = new Date().toLocaleDateString('en-US', options);
});

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('updateForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

    // Replace with your Google Apps Script deployment URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbytq0TwNxcUvJaz27SzNMDkJ-y0jcLlTafBc_-8NmuHO5pqWqwAnXVfXeixFqJlINyQ/exec';
    
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
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error!', error.message);
        alert('Error submitting form. Please try again.');
    }

    // Reset button state
    submitButton.disabled = false;
    submitButton.innerHTML = 'Submit Update';
}

// Add form submit event listener
document.getElementById('updateForm').addEventListener('submit', handleSubmit);

// The Spread Sheet Code

// function doPost(e) {
//     try {
//         const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//         const data = e.parameter;
        
//         // Get current timestamp
//         const timestamp = new Date();
        
//         // Append data to sheet
//         sheet.appendRow([
//             timestamp,
//             data.employeeName,
//             data.task,
//             data.blockers,
//             data.status,
//             data.help,
//             data.notes
//         ]);
        
//         return ContentService.createTextOutput(JSON.stringify({
//             'status': 'success',
//             'message': 'Data successfully recorded'
//         })).setMimeType(ContentService.MimeType.JSON);
        
//     } catch (error) {
//         return ContentService.createTextOutput(JSON.stringify({
//             'status': 'error',
//             'message': error.toString()
//         })).setMimeType(ContentService.MimeType.JSON);
//     }
// }

// // Add this function to handle CORS
// function doGet(e) {
//     return HtmlService.createHtmlOutput('Success');
// }