
// Validate password strength and match
function validatePasswords() {
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;
    const userid = document.getElementById("userid").value.toLowerCase();

    const specialChars = /[!@#%^&*()\-_=+\\/><.,`~]/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const digit = /[0-9]/;

    if (password.length < 8 || password.length > 30) {
        alert("Password must be between 8 and 30 characters.");
        return false;
    }
    if (!upperCase.test(password) || !lowerCase.test(password) || !digit.test(password) || !specialChars.test(password)) {
        alert("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
        return false;
    }
    if (password.includes("\"")) {
        alert("Password cannot include double quotes (").");
        return false;
    }
    if (password.toLowerCase().includes(userid)) {
        alert("Password should not include or match your User ID.");
        return false;
    }
    if (password !== repassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

// Convert User ID to lowercase on blur
function normalizeUserID() {
    const uidField = document.getElementById("userid");
    uidField.value = uidField.value.toLowerCase();
}

// Truncate ZIP+4 code and re-display only 5 digits
function truncateZip(zipInputId) {
    const zipInput = document.getElementById(zipInputId);
    if (zipInput) {
        const zipValue = zipInput.value.trim();
        const zipMatch = zipValue.match(/^\d{5}/);
        if (zipMatch) {
            zipInput.value = zipMatch[0];
            return zipMatch[0];
        } else {
            alert("Please enter a valid ZIP code (e.g., 77002 or 77002-1234)");
            zipInput.focus();
            return null;
        }
    }
    return null;
}

// Show a review summary of the form inputs
function reviewFormData() {
    const zipClean = truncateZip("zip");
    if (!zipClean) return;

    const formElements = document.querySelectorAll("#profileForm input, #profileForm select, #profileForm textarea");
    let reviewHTML = '<h3>Review Your Information:</h3><ul>';
    const illnessCheckboxes = document.querySelectorAll('input[name="illness"]:checked');
    if (illnessCheckboxes.length > 0) {
        reviewHTML += '<li><strong>Medical History:</strong> ';
        illnessCheckboxes.forEach((box, idx) => {
            reviewHTML += box.value + (idx < illnessCheckboxes.length - 1 ? ', ' : '');
        });
        reviewHTML += '</li>';
    }
    
    formElements.forEach(el => {
        if ((el.type !== "radio" && el.type !== "checkbox") || el.checked) {
            const label = el.name || el.id;
            const value = el.type === "password" ? "***" : el.value;
            reviewHTML += `<li><strong>${label}:</strong> ${value}</li>`;
        }
    });
    reviewHTML += '</ul>';
    document.getElementById("reviewBox").innerHTML = reviewHTML;
}

// Attach all validation handlers
window.onload = function () {
    document.getElementById("userid").addEventListener("blur", normalizeUserID);
    document.getElementById("profileForm").addEventListener("submit", function (event) {
        if (!validatePasswords()) {
            event.preventDefault();
        }
    });
};
