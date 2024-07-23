function setupAutoCurlyBraces() {
    var element = document.getElementById('latexInput');
    var checkbox = document.getElementById('autocompleteCheck');

    function handleInput(event) {
        if (!checkbox.checked) return; // Exit if autocomplete is disabled

        const cursorPosition = event.target.selectionStart;
        const value = event.target.value;
        const lastChar = value[cursorPosition - 1];

        // Exit early if backspace was pressed and the previous character is part of our control set
        if (event.inputType === "deleteContentBackward" && (lastChar === '{' || lastChar === '}')) {
            // Prevent duplication of curly braces on backspace
            return;
        }

        // Define mappings for each special keyword and their corresponding LaTeX brackets
        const bracketMappings = {
            'curly ': '\\left\\{  \\right\\}',
            'pbracket ': '\\left(  \\right)',
            'sbracket ': '\\left[  \\right]',
            'abracket ': '\\left\\langle  \\right\\rangle',
            'vbracket ': '\\left|  \\right|',
            'dVbracket ': '\\left\\|  \\right\\|'
        };

        // Process for adding braces automatically based on specific keywords
        Object.entries(bracketMappings).forEach(([keyword, latexBrackets]) => {
            const typedWord = value.substring(cursorPosition - keyword.length, cursorPosition);
            if (typedWord === keyword) {
                event.preventDefault();
                const newText = value.slice(0, cursorPosition - keyword.length) + latexBrackets + value.slice(cursorPosition);
                event.target.value = newText;
                const newPos = cursorPosition - keyword.length + latexBrackets.indexOf('  ') + 1;
                event.target.selectionStart = newPos;
                event.target.selectionEnd = newPos;
                return; // Exit after processing to prevent further replacements
            }
        });

        // Define mappings for curly braces expansions based on specific keywords
        const curlyBraceMappings = {
            'lim{': 'lim{low value, high value}',
            'int{': 'int{low value, high value}',
            'closeintegral{': 'closeintegral{low value, high value}',
            'doubleintegral{': 'doubleintegral{low value, high value}',
            'bigcup{': 'bigcup{low value, high value}',
            'dorder{': 'dorder{variable, order}',
            'porder{': 'porder{variable, order}',
            'color{': 'color{color name, text}',
            'bigCap{': 'bigCap{low value, high value}'
        };

        // Process for expanding curly braces based on typed keywords
        Object.entries(curlyBraceMappings).forEach(([keyword, replacement]) => {
            const keywordPosition = cursorPosition - keyword.length;
            if (value.substring(keywordPosition, cursorPosition) === keyword) {
                event.preventDefault();
                const newText = value.slice(0, keywordPosition) + replacement + value.slice(cursorPosition);
                event.target.value = newText;
                const startPos = keywordPosition + replacement.indexOf('{') + 1;
                const endPos = keywordPosition + replacement.lastIndexOf('}');
                event.target.selectionStart = startPos;
                event.target.selectionEnd = endPos;
                return; // Exit after processing to prevent further replacements
            }
        });

        // Handle case when only '{' is pressed
        if (value.endsWith('{') && !Object.keys(curlyBraceMappings).some(keyword => value.endsWith(keyword))) {
            event.preventDefault();
            const newText = value.slice(0, cursorPosition - 1) + '{  }' + value.slice(cursorPosition);
            event.target.value = newText;
            event.target.selectionStart = cursorPosition;
            event.target.selectionEnd = cursorPosition + 2;
        }
    }

    // Add or remove event listener based on checkbox state
    function updateEventListener() {
        if (checkbox.checked) {
            element.addEventListener('input', handleInput);
        } else {
            element.removeEventListener('input', handleInput);
        }
    }

    checkbox.addEventListener('change', updateEventListener);
    updateEventListener();  // Ensure the event listener is properly setup on page load
}

document.addEventListener('DOMContentLoaded', setupAutoCurlyBraces);
