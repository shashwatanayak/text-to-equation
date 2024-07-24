document.addEventListener('DOMContentLoaded', function() {
    // Create the popup and its elements
    const popup = document.createElement('div');
    popup.className = 'suggestions-popup';
    popup.style.position = 'fixed';
    popup.style.top = '10px';
    popup.style.left = '10px';
    popup.style.background = '#f9f9f9';
    popup.style.border = '1px solid #ccc';
    popup.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.style.width = '300px';
    popup.style.zIndex = '1000';
    popup.style.display = 'none'; // initially hidden
    document.body.appendChild(popup);

    // Title
    const title = document.createElement('div');
    title.textContent = 'Find Shortcodes:';
    title.className = 'suggestions-title';
    title.style.fontWeight = 'bold';
    popup.appendChild(title);

    // Close button
    const closeButton = document.createElement('span');
    closeButton.textContent = '×';
    closeButton.className = 'suggestions-close-btn';
    closeButton.style.float = 'right';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#ff4747';
    closeButton.style.fontSize = '24px'; // Larger close button
    closeButton.style.lineHeight = '20px'; // Adjust line height for vertical alignment
    closeButton.onclick = () => popup.style.display = 'none';
    popup.appendChild(closeButton);

    // Input box with placeholder
    const inputBox = document.createElement('input');
    inputBox.className = 'suggestions-input';
    inputBox.placeholder = 'Type shortcode here'; // Placeholder text added
    inputBox.style.width = '100%';
    inputBox.style.padding = '8px';
    inputBox.style.marginTop = '5px';
    inputBox.style.border = '1px solid #ddd';
    inputBox.style.borderRadius = '4px';
    popup.appendChild(inputBox);

    // Suggestions container
    const suggestionsBox = document.createElement('div');
    suggestionsBox.className = 'suggestions-box';
    popup.appendChild(suggestionsBox);

    // Suggestion item style
    const suggestionStyle = {
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '3px',
        marginTop: '2px',
        transition: 'background-color 0.3s',
        backgroundColor: '#fff',
        ':hover': {
            backgroundColor: '#e0e0e0'
        }
    };

    // Function to show suggestions and implement click-to-copy
    inputBox.addEventListener('input', function() {
        const inputText = inputBox.value.toLowerCase().trim();
        suggestionsBox.innerHTML = '';
        if (!inputText) return;

        const shortcodes = [
           'int\\',
'int{low, high}',
'lim\\',
'lim{low, high}',
'closeintegral\\',
'closeintegral{low, high}',
'doubleintegral\\',
'doubleint{low, high}',
'dou\\',
'partial\\',
'angle\\',
'measuredangle\\',
'triangle\\',
'triangleup\\',
'triangleright\\',
'triangleleft\\',
'triangledown\\',
'bar{variable}',
'vector{variable}',
'cap{variable}',
'lt\\',
'gt\\',
'leq\\',
'geq\\',
'valuenot\\',
'anot\\',
'beginmatrix',
'endmatrix',
'beginpmatrix',
'endpmatrix',
'beginbmatrix',
'endbmatrix',
'begindeterminant',
'enddeterminant',
'psi\\',
'fi\\',
'theta\\',
'lambda\\',
'alpha\\',
'beta\\',
'gamma\\',
'delta\\',
'epsilon\\',
'zeta\\',
'eta\\',
'iota\\',
'kappa\\',
'mu\\',
'nu\\',
'xi\\',
'omicron\\',
'pi\\',
'rho\\',
'sigma\\',
'tau\\',
'upsilon\\',
'chi\\',
'omega\\',
'Alpha\\',
'Beta\\',
'Gamma\\',
'Delta\\',
'Epsilon\\',
'Zeta\\',
'Eta\\',
'Iota\\',
'Kappa\\',
'Mu\\',
'Nu\\',
'Xi\\',
'Omicron\\',
'Pi\\',
'Rho\\',
'Tau\\',
'Upsilon\\',
'Chi\\',
'Omega\\',
'Sigma\\',
'sum{low, high}',
'infinity\\',
'because\\',
'downarrow\\',
'uparrow\\',
'doublerightarrow\\',
'Rightarrow\\',
'implies\\',
'doubleleftarrow\\',
'Leftarrow\\',
'leftrightarrow\\',
'leftarrow\\',
'rightarrow\\',
'mapsto\\',
'bold{variable}',
'italic{variable}',
'color{color, variable}',
'left{low, high, variable}',
'partial{variable}',
'porder{variable, order}',
'derivative{variable}',
'dorder{variable, order}',
'bigCap{low, high}',
'BigCap\\',
'Bigcup\\',
'bigcup{low, high}',
'intersection\\',
'union\\',
'notbelongsto\\',
'belongsto\\',
'nsubseteq\\',
'notsubset\\',
'subseteq\\',
'subset\\',
'anglebracket{variable}',
'{variable}/{variable}'

        ];

        shortcodes.forEach(code => {
            if (code.startsWith(inputText)) {
                const suggestion = document.createElement('div');
                suggestion.textContent = code;
                suggestion.className = 'suggestions-item';
                Object.assign(suggestion.style, suggestionStyle);
                suggestion.onclick = () => {
                    navigator.clipboard.writeText(code).then(() => {
                        suggestion.textContent += ' - Copied!';
                        setTimeout(() => suggestion.textContent = code, 2000); // Reset text
                    }).catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
                };
                suggestionsBox.appendChild(suggestion);
            }
        });
    });

    // Make the popup draggable
    popup.onmousedown = function(event) {
        let shiftX = event.clientX - popup.getBoundingClientRect().left;
        let shiftY = event.clientY - popup.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            popup.style.left = pageX - shiftX + 'px';
            popup.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        popup.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            popup.onmouseup = null;
        };
    };

    popup.ondragstart = function() {
        return false;
    };

    // Event to open the suggestion panel
    document.querySelectorAll('.openSuggestions').forEach(button => {
        button.addEventListener('click', () => {
            popup.style.display = 'block';
            inputBox.focus();
        });
    });
});
