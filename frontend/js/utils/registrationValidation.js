

const registrationValidation = {
    /**
     * Validates email format
     * @param {string} email 
     * @returns {string|null} Error message or null if valid
     */
    validateEmail: (email) => {
        if (!email) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? null : "Please fill a valid email address";
    },

    /**
     * Validates password length
     * @param {string} password 
     * @returns {string|null} Error message or null if valid
     */
    validatePassword: (password) => {
        if (!password) return "Password is required";
        return password.length >= 6 ? null : "Password must be at least 6 characters long";
    },

    /**
     * Validates age range
     * @param {number|string} age 
     * @returns {string|null} Error message or null if valid
     */
    validateAge: (age) => {
        if (!age) return "Age is required";
        const val = Number(age);
        return (val >= 15 && val <= 70) ? null : "Age must be between 15 and 70";
    },

    /**
     * Validates height range
     * @param {number|string} height 
     * @returns {string|null} Error message or null if valid
     */
    validateHeight: (height) => {
        if (!height) return "Height is required";
        const val = Number(height);
        return (val >= 120 && val <= 250) ? null : "Height must be between 120cm and 250cm";
    },

    /**
     * Validates weight range
     * @param {number|string} weight 
     * @returns {string|null} Error message or null if valid
     */
    validateWeight: (weight) => {
        if (!weight) return "Weight is required";
        const val = Number(weight);
        return (val >= 30 && val <= 200) ? null : "Weight must be between 30kg and 200kg";
    },

    /**
     * Validates required text fields
     * @param {string} value 
     * @param {string} fieldName 
     * @returns {string|null} Error message or null if valid
     */
    validateRequired: (value, fieldName) => {
        return (value && value.trim() !== "") ? null : `${fieldName} is required`;
    }
};

// Export for use in other modules if using modules, otherwise attach to window
if (typeof module !== 'undefined' && module.exports) {
    module.exports = registrationValidation;
} else {
    window.RegistrationValidation = registrationValidation;
}
