document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const submitBtn = registerForm?.querySelector('button[type="submit"]');
    const validation = window.RegistrationValidation;

    if (!registerForm || !validation) return;

    // Form fields to validate
    const fields = {
        name: {
            el: document.getElementById('name'),
            errorEl: document.getElementById('name-error'),
            validate: (val) => validation.validateRequired(val, 'Name')
        },
        email: {
            el: document.getElementById('email'),
            errorEl: document.getElementById('email-error'),
            validate: (val) => validation.validateEmail(val)
        },
        password: {
            el: document.getElementById('password'),
            errorEl: document.getElementById('password-error'),
            validate: (val) => validation.validatePassword(val)
        },
        'confirm-password': {
            el: document.getElementById('confirm-password'),
            errorEl: document.getElementById('confirm-password-error'),
            validate: (val) => {
                const password = document.getElementById('password').value;
                if (!val) return "Please confirm your password";
                return val === password ? null : "Passwords do not match";
            }
        },
        age: {
            el: document.getElementById('age'),
            errorEl: document.getElementById('age-error'),
            validate: (val) => validation.validateAge(val)
        },
        height: {
            el: document.getElementById('height'),
            errorEl: document.getElementById('height-error'),
            validate: (val) => validation.validateHeight(val)
        },
        weight: {
            el: document.getElementById('weight'),
            errorEl: document.getElementById('weight-error'),
            validate: (val) => validation.validateWeight(val)
        },
        goal: {
            el: document.getElementById('goal'),
            errorEl: document.getElementById('goal-error'),
            validate: (val) => validation.validateRequired(val, 'Goal')
        },
        gender: {
            el: document.getElementById('gender'),
            errorEl: document.getElementById('gender-error'),
            validate: (val) => validation.validateRequired(val, 'Gender')
        }
    };

    // Track field validity
    const fieldStatus = {};
    Object.keys(fields).forEach(key => {
        fieldStatus[key] = false;
    });

    /**
     * Updates the UI for a specific field based on validation result
     */
    const updateFieldUI = (fieldId, errorMessage) => {
        const field = fields[fieldId];
        if (!field) return;

        if (errorMessage) {
            field.el.classList.add('invalid');
            field.errorEl.textContent = errorMessage;
            field.errorEl.classList.add('visible');
            fieldStatus[fieldId] = false;
        } else {
            field.el.classList.remove('invalid');
            field.errorEl.classList.remove('visible');
            setTimeout(() => {
                if (!field.errorEl.classList.contains('visible')) {
                    field.errorEl.textContent = '';
                }
            }, 300);
            fieldStatus[fieldId] = true;
        }
        
        checkFormValidity();
    };

    /**
     * Checks if the entire form is valid and toggles the submit button
     */
    const checkFormValidity = () => {
        const isTermsAccepted = document.getElementById('terms')?.checked;
        const allFieldsValid = Object.values(fieldStatus).every(status => status === true);
        
        if (submitBtn) {
            submitBtn.disabled = !(allFieldsValid && isTermsAccepted);
        }
    };

    // Attach event listeners to fields
    Object.keys(fields).forEach(fieldId => {
        const field = fields[fieldId];
        
        const triggerValidation = () => {
            const val = field.el.value;
            const error = field.validate(val);
            updateFieldUI(fieldId, error);
        };

        // Create debounced version of validation for typing
        const debouncedValidation = window.FitAIUI.debounce(triggerValidation, 400);

        // Input event triggers debounced validation (typing)
        field.el.addEventListener('input', debouncedValidation);

        // Blur and change events trigger validation immediately
        field.el.addEventListener('blur', triggerValidation);
        field.el.addEventListener('change', triggerValidation);
    });

    // Special handling for terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', checkFormValidity);
    }

    // Initialize button state
    checkFormValidity();

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Final check before submission
        let isFormValid = true;
        Object.keys(fields).forEach(fieldId => {
            const field = fields[fieldId];
            const error = field.validate(field.el.value);
            if (error) {
                updateFieldUI(fieldId, error);
                isFormValid = false;
            }
        });

        const termsAccepted = document.getElementById('terms')?.checked;
        if (!termsAccepted) {
            window.FitAIUI.showToast('Please agree to the Terms of Service.', 'error');
            isFormValid = false;
        }

        if (!isFormValid) return;

        const payload = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            age: document.getElementById('age').value.trim(),
            height: document.getElementById('height').value.trim(),
            weight: document.getElementById('weight').value.trim(),
            goal: document.getElementById('goal').value,
            gender: document.getElementById('gender').value,
            preference: document.getElementById('preference')?.value,
            dietPreference: document.getElementById('diet-preference')?.value,
            cuisinePreference: document.getElementById('cuisine-preference')?.value
        };

        window.FitAIUI.setButtonLoading(submitBtn, true, 'CREATING ACCOUNT...');

        try {
            const data = await window.FitAIApi.auth.register(payload);

            window.FitAIAuth.setSession({
                token: data.token,
                user: data.user
            });

            window.FitAIUI.showToast(data.message || 'Account created successfully.', 'success');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Registration error:', error);
            window.FitAIUI.showToast(error.message || 'Unable to create your account right now.', 'error');
            window.FitAIUI.setButtonLoading(submitBtn, false);
            checkFormValidity();
        }
    });
});
