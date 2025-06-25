
// Date and time update function
function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    const dateTimeElement = document.getElementById('dateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = formattedDateTime;
    }
}

// Initialize date/time and update every second
updateDateTime();
setInterval(updateDateTime, 1000);

document.addEventListener('DOMContentLoaded', function() {
    // Pet search form validation
    const petSearchForm = document.getElementById('pet-search-form');
    if (petSearchForm) {
        petSearchForm.addEventListener('submit', function(event) {
            // Prevent the default form submission
            event.preventDefault();

            const petTypeSelect = document.getElementById('pet-type');

            // Check if pet type is selected
            if (petTypeSelect.value === '') {
                let errorMessage = document.getElementById('error-message');

                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.id = 'error-message';
                    errorMessage.style.color = 'red';
                    errorMessage.style.marginBottom = '10px';
                    errorMessage.textContent = 'Please select a pet type (cat or dog).';

                    // Insert error message at the top of the form
                    petSearchForm.insertBefore(errorMessage, petSearchForm.firstChild);
                }
            } else {
                // If validation passes, remove any existing error message
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }

                // Submit the form
                petSearchForm.submit();
            }
        });
    }

    // User registration form validation
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            let isValid = true;
            let errorMessage = '';

            // Username validation
            const usernameRegex = /^[a-zA-Z0-9]+$/;
            if (!usernameRegex.test(username)) {
                isValid = false;
                errorMessage = 'Username can only contain letters and digits.';
            }

            // Password validation
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
            if (!passwordRegex.test(password)) {
                isValid = false;
                errorMessage = 'Password must be at least 4 characters with at least one letter and one digit.';
            }

            // Display error or submit form
            const errorDiv = document.getElementById('error-message');
            if (!isValid) {
                if (!errorDiv) {
                    const newErrorDiv = document.createElement('div');
                    newErrorDiv.id = 'error-message';
                    newErrorDiv.style.color = 'red';
                    newErrorDiv.style.marginBottom = '10px';
                    newErrorDiv.textContent = errorMessage;
                    registrationForm.insertBefore(newErrorDiv, registrationForm.firstChild);
                } else {
                    errorDiv.textContent = errorMessage;
                }
            } else {
                if (errorDiv) {
                    errorDiv.remove();
                }
                registrationForm.submit();
            }
        });
    }

    // Login form validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            let isValid = true;
            let errorMessage = '';

            // Username validation
            const usernameRegex = /^[a-zA-Z0-9]+$/;
            if (!usernameRegex.test(username)) {
                isValid = false;
                errorMessage = 'Username can only contain letters and digits.';
            }

            // Password validation
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
            if (!passwordRegex.test(password)) {
                isValid = false;
                errorMessage = 'Password must be at least 4 characters with at least one letter and one digit.';
            }

            // Display error or submit form
            const errorDiv = document.getElementById('error-message');
            if (!isValid) {
                if (!errorDiv) {
                    const newErrorDiv = document.createElement('div');
                    newErrorDiv.id = 'error-message';
                    newErrorDiv.style.color = 'red';
                    newErrorDiv.style.marginBottom = '10px';
                    newErrorDiv.textContent = errorMessage;
                    loginForm.insertBefore(newErrorDiv, loginForm.firstChild);
                } else {
                    errorDiv.textContent = errorMessage;
                }
            } else {
                if (errorDiv) {
                    errorDiv.remove();
                }
                loginForm.submit();
            }
        });
    }

    // Give away form validation
    const giveAwayForm = document.getElementById('give-away-form');
    if (giveAwayForm) {
        giveAwayForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validate required fields
            const breed = document.getElementById('breed').value;
            const email = document.getElementById('email').value;

            let isValid = true;
            let errorMessages = [];

            if (!breed.trim()) {
                isValid = false;
                errorMessages.push('Please enter the breed of your pet.');
            }

            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.trim() || !emailRegex.test(email)) {
                isValid = false;
                errorMessages.push('Please enter a valid email address.');
            }

            // Display errors or submit form
            const errorContainer = document.getElementById('error-container');
            if (!isValid) {
                errorContainer.innerHTML = '';
                errorMessages.forEach(message => {
                    const errorPara = document.createElement('p');
                    errorPara.textContent = message;
                    errorPara.style.color = 'red';
                    errorContainer.appendChild(errorPara);
                });
            } else {
                errorContainer.innerHTML = '';
                giveAwayForm.submit();
            }
        });
    }
});