document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const inputs = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        age: document.getElementById('age')
    };
    
    const errors = {
        fullNameError: document.getElementById('fullNameError'),
        emailError: document.getElementById('emailError'),
        passwordError: document.getElementById('passwordError'),
        confirmPasswordError: document.getElementById('confirmPasswordError'),
        ageError: document.getElementById('ageError')
    };
    
    // Real-time validation (as the user types)
    for (const input in inputs) {
        inputs[input].addEventListener('input', function() {
            validateField(input);
        });
        
        // Also validate when field loses focus
        inputs[input].addEventListener('blur', function() {
            validateField(input);
        });
    }
    
    // Form submission validation
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        let isValid = true;
        for (const input in inputs) {
            if (!validateField(input)) {
                isValid = false;
            }
        }
        
        if (isValid) {
            alert("Form submitted successfully!");
            form.reset();
            
            // Clear all error messages and remove invalid classes
            for (const error in errors) {
                errors[error].textContent = '';
            }
            for (const input in inputs) {
                inputs[input].classList.remove('invalid');
            }
        }
    });
    
    function validateField(fieldName) {
        let isValid = true;
        
        switch(fieldName) {
            case 'fullName':
                if (inputs.fullName.value.trim() === '') {
                    showError('fullNameError', 'Full Name is required');
                    isValid = false;
                } else {
                    clearError('fullNameError');
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (inputs.email.value.trim() === '') {
                    showError('emailError', 'Email Address is required');
                    isValid = false;
                } else if (!emailRegex.test(inputs.email.value)) {
                    showError('emailError', 'Please enter a valid email address (e.g., example@domain.com)');
                    isValid = false;
                } else {
                    clearError('emailError');
                }
                break;
                
            case 'password':
                if (inputs.password.value === '') {
                    showError('passwordError', 'Password is required');
                    isValid = false;
                } else if (inputs.password.value.length < 8) {
                    showError('passwordError', 'Password must be at least 8 characters long');
                    isValid = false;
                } else {
                    clearError('passwordError');
                }
                
                // Also validate confirmPassword if it's not empty
                if (inputs.confirmPassword.value !== '') {
                    validateField('confirmPassword');
                }
                break;
                
            case 'confirmPassword':
                if (inputs.confirmPassword.value === '') {
                    showError('confirmPasswordError', 'Confirm Password is required');
                    isValid = false;
                } else if (inputs.confirmPassword.value !== inputs.password.value) {
                    showError('confirmPasswordError', 'Passwords do not match');
                    isValid = false;
                } else {
                    clearError('confirmPasswordError');
                }
                break;
                
            case 'age':
                if (inputs.age.value === '') {
                    showError('ageError', 'Age is required');
                    isValid = false;
                } else if (isNaN(inputs.age.value) || parseInt(inputs.age.value) < 18) {
                    showError('ageError', 'Age must be a number greater than or equal to 18');
                    isValid = false;
                } else {
                    clearError('ageError');
                }
                break;
        }
        
        return isValid;
    }
    
    function showError(errorId, message) {
        errors[errorId].textContent = message;
        const inputField = errorId.replace('Error', '');
        inputs[inputField].classList.add('invalid');
    }
    
    function clearError(errorId) {
        errors[errorId].textContent = '';
        const inputField = errorId.replace('Error', '');
        inputs[inputField].classList.remove('invalid');
    }
});