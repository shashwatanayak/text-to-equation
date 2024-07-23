// session.js

// Load any saved text from sessionStorage when the page loads
window.onload = function() {
    const savedText = sessionStorage.getItem('latexInput');
    if (savedText) {
        document.getElementById('latexInput').value = savedText;
    }
};

// Save the text to sessionStorage every time it changes
document.getElementById('latexInput').addEventListener('input', function() {
    sessionStorage.setItem('latexInput', this.value);
});

// Function to clear the textarea and the sessionStorage
function resetInput() {
    document.getElementById('latexInput').value = '';
    sessionStorage.removeItem('latexInput');
}
