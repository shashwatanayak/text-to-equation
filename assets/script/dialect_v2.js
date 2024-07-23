document.getElementById('latexInput').addEventListener('input', function() {
    var latexCode = this.value;
    // Conversion rules
    latexCode = latexCode.replace(/\+/g, '+');
    latexCode = latexCode.replace(/-/g, '-');
    latexCode = latexCode.replace(/\*/g, '\\times');
    latexCode = latexCode.replace(/÷/g, '\\div');
    latexCode = latexCode.replace(/int\\/g, '\\int');
    latexCode = latexCode.replace(/int{(.+?),(.+?)}/g, '\\int_{$1}^{$2}');
    latexCode = latexCode.replace(/lim\\/g, '\\lim');
    latexCode = latexCode.replace(/lim{(.+?),(.+?)}/g, '\\lim_{$1 \\to $2}');
    // Replace simple LaTeX commands
    latexCode = latexCode.replace(/closeintegral\\/g, '\\oint');
    latexCode = latexCode.replace(/closeintegral{([^,}]+),([^}]+)}/g, '\\oint_{$1}^{$2}');
    latexCode = latexCode.replace(/doubleintegral\\/g, '\\iint');
    latexCode = latexCode.replace(/doubleint{([^,}]+),([^}]+)}/g, '\\iint_{$1}^{$2}');
    latexCode = latexCode.replace(/(dou|partial)\\/g, '\\partial');
    latexCode = latexCode.replace(/angle\\/g, '\\angle');
    latexCode = latexCode.replace(/measuredangle\\/g, '\\measuredangle');
    latexCode = latexCode.replace(/(triangle|triangleup)\\/g, '\\triangle');
    latexCode = latexCode.replace(/triangleright\\/g, '\\triangleright');
    latexCode = latexCode.replace(/triangleleft\\/g, '\\triangleleft');
    latexCode = latexCode.replace(/triangledown\\/g, '\\triangledown');
    latexCode = latexCode.replace(/bar{([^}]+)}/g, '\\overline{$1}');
    latexCode = latexCode.replace(/vector{([^}]+)}/g, '\\overrightarrow{$1}');
    latexCode = latexCode.replace(/cap{([^}]+)}/g, '\\hat{$1}');
    // Additional replacements for inequality symbols and negations
    latexCode = latexCode.replace(/lt\\/g, '\\lt');
    latexCode = latexCode.replace(/gt\\/g, '\\gt');
    latexCode = latexCode.replace(/leq\\/g, '\\leq');
    latexCode = latexCode.replace(/geq\\/g, '\\geq');
    latexCode = latexCode.replace(/valuenot\\/g, '\\not');
    latexCode = latexCode.replace(/anot\\/g, 'a^\\circ');  
    //Matrix Handling
    latexCode = latexCode.replace(/beginmatrix/g, '\\begin{matrix}');
    latexCode = latexCode.replace(/endmatrix/g, '\\end{matrix}');
    latexCode = latexCode.replace(/beginpmatrix/g, '\\begin{pmatrix}');
    latexCode = latexCode.replace(/endpmatrix/g, '\\end{pmatrix}');
    latexCode = latexCode.replace(/begin(?:bmatrix|smatrix)/g, '\\begin{bmatrix}');
    latexCode = latexCode.replace(/end(?:bmatrix|smatrix)/g, '\\end{bmatrix}');
    latexCode = latexCode.replace(/begindeterminant/g, '\\begin{vmatrix}');
    latexCode = latexCode.replace(/enddeterminant/g, '\\end{vmatrix}');
    //Common Symbols
    latexCode = latexCode.replace(/psi\\/g, '\\psi');
    latexCode = latexCode.replace(/fi\\/g, '\\phi');
    latexCode = latexCode.replace(/theta\\/g, '\\theta');
    latexCode = latexCode.replace(/lambda\\/g, '\\lambda');
    latexCode = latexCode.replace(/\n/g, ' \\\\ ');
    latexCode = latexCode.replace(/(\w+)\/(\w+)/g, '\\frac{$1}{$2}');
    latexCode = latexCode.replace(/alpha\\/g, '\\alpha');
    latexCode = latexCode.replace(/beta\\/g, '\\beta');
    latexCode = latexCode.replace(/gamma\\/g, '\\gamma');
    latexCode = latexCode.replace(/delta\\/g, '\\delta');
    latexCode = latexCode.replace(/epsilon\\/g, '\\epsilon');
    latexCode = latexCode.replace(/zeta\\/g, '\\zeta');
    latexCode = latexCode.replace(/eta\\/g, '\\eta');
    latexCode = latexCode.replace(/iota\\/g, '\\iota');
    latexCode = latexCode.replace(/kappa\\/g, '\\kappa');
    latexCode = latexCode.replace(/mu\\/g, '\\mu');
    latexCode = latexCode.replace(/nu\\/g, '\\nu');
    latexCode = latexCode.replace(/xi\\/g, '\\xi');
    latexCode = latexCode.replace(/omicron\\/g, '\\omicron');
    latexCode = latexCode.replace(/pi\\/g, '\\pi');
    latexCode = latexCode.replace(/rho\\/g, '\\rho');
    latexCode = latexCode.replace(/sigma\\/g, '\\sigma');
    latexCode = latexCode.replace(/tau\\/g, '\\tau');
    latexCode = latexCode.replace(/upsilon\\/g, '\\upsilon');
    latexCode = latexCode.replace(/chi\\/g, '\\chi');
    latexCode = latexCode.replace(/omega\\/g, '\\omega');
    latexCode = latexCode.replace(/Alpha\\/g, '\\Alpha');
    latexCode = latexCode.replace(/Beta\\/g, '\\Beta');
    latexCode = latexCode.replace(/Gamma\\/g, '\\Gamma');
    latexCode = latexCode.replace(/Delta\\/g, '\\Delta');
    latexCode = latexCode.replace(/Epsilon\\/g, '\\Epsilon');
    latexCode = latexCode.replace(/Zeta\\/g, '\\Zeta');
    latexCode = latexCode.replace(/Eta\\/g, '\\Eta');
    latexCode = latexCode.replace(/Iota\\/g, '\\Iota');
    latexCode = latexCode.replace(/Kappa\\/g, '\\Kappa');
    latexCode = latexCode.replace(/Mu\\/g, '\\Mu');
    latexCode = latexCode.replace(/Nu\\/g, '\\Nu');
    latexCode = latexCode.replace(/Xi\\/g, '\\Xi');
    latexCode = latexCode.replace(/Omicron\\/g, '\\Omicron');
    latexCode = latexCode.replace(/Pi\\/g, '\\Pi');
    latexCode = latexCode.replace(/Rho\\/g, '\\Rho');
    latexCode = latexCode.replace(/Tau\\/g, '\\Tau');
    latexCode = latexCode.replace(/Upsilon\\/g, '\\Upsilon');
    latexCode = latexCode.replace(/Chi\\/g, '\\Chi');
    latexCode = latexCode.replace(/Omega\\/g, '\\Omega');
    latexCode = latexCode.replace(/sigma\\/g, '\\sigma');
    latexCode = latexCode.replace(/Sigma\\/g, '\\Sigma');
    latexCode = latexCode.replace(/sum\{([^\}]+),([^\}]+)\}/g, '\\sum_{$1}^{$2}');
    latexCode = latexCode.replace(/infinity\\/g, '\\infty');

    //New Dialect Pack
    latexCode = latexCode.replace(/because\\/g, '\\because');
    latexCode = latexCode.replace(/downarrow\\/g, '\\downarrow');
    latexCode = latexCode.replace(/uparrow\\/g, '\\uparrow');
    latexCode = latexCode.replace(/(doublerightarrow\\|Rightarrow\\|implies\\)/g, '\\Rightarrow');
    latexCode = latexCode.replace(/(doubleleftarrow\\|Leftarrow\\)/g, '\\Leftarrow');
    latexCode = latexCode.replace(/leftrightarrow\\/g, '\\leftrightarrow');
    latexCode = latexCode.replace(/leftarrow\\/g, '\\leftarrow');
    latexCode = latexCode.replace(/rightarrow\\/g, '\\rightarrow');
    latexCode = latexCode.replace(/mapsto\\/g, '\\mapsto');

    latexCode = latexCode.replace(/bold{([^}]*)}/g, '\\mathbf{$1}');
    latexCode = latexCode.replace(/italic{([^}]*)}/g, '\\textit{$1}');
    latexCode = latexCode.replace(/color{([^,]*),([^}]*)}/g, '{\\color{$1} {$2}}');
    latexCode = latexCode.replace(/doubleintegral{([^,]*),([^}]*)}/g, '\\iint_{$1}^{$2}');
    latexCode = latexCode.replace(/left{([^,]*),([^,]*),([^}]*)}/g, '_{$1}^{$2}\\textrm{$3}');
    latexCode = latexCode.replace(/partial{([^}]*)}/g, '\\frac{\\partial}{\\partial $1}');
    latexCode = latexCode.replace(/(partialorder|porder){([^,]*),([^}]*)}/g, '\\frac{\\partial^{$3}}{\\partial $2^{$3}}');
    latexCode = latexCode.replace(/derivative{([^}]*)}/g, '\\frac{d}{d $1}');
    latexCode = latexCode.replace(/(derivativeorder|dorder){([^,]*),([^}]*)}/g, '\\frac{d^{$3}}{d $2^{$3}}');
    latexCode = latexCode.replace(/bigCap{([^,]*),([^}]*)}/g, '\\bigcap_{$1}^{$2}');
    latexCode = latexCode.replace(/BigCap\\/g, '\\bigcap');
    latexCode = latexCode.replace(/Bigcup\\/g, '\\bigcup');
    latexCode = latexCode.replace(/bigcup{([^,]*),([^}]*)}/g, '\\bigcup_{$1}^{$2}');
    latexCode = latexCode.replace(/intersection\\/g, '\\cap');
    latexCode = latexCode.replace(/union\\/g, '\\cup');

    //Set Operations
    latexCode = latexCode.replace(/notbelongsto\\/g, '\\not\\in');
    latexCode = latexCode.replace(/belongsto\\/g, '\\in');
    latexCode = latexCode.replace(/nsubseteq\\/g, '\\nsubseteq');
    latexCode = latexCode.replace(/notsubset/g, '\\not\\subset');
    latexCode = latexCode.replace(/subseteq\\/g, '\\subseteq');
    latexCode = latexCode.replace(/subset\\/g, '\\subset');

    //Brackets Not Working
    latexCode = latexCode.replace(/anglebracket{([^}]*)}/g, '\\langle $1 \\rangle');
    







    























    var renderedEquation = document.getElementById('renderedEquation');
    renderedEquation.innerHTML = '\\[' + latexCode + '\\]';
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, renderedEquation]);
});

function convertToPng() {
const equation = document.getElementById('renderedEquation');
html2canvas(equation).then(canvas => {
const link = document.createElement('a');

// Get the current date and time
const now = new Date();
const day = now.getDate().toString().padStart(2, '0');
const month = (now.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-indexed
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');

// Create filename in the format 'equation-ddmm-hhmm.png'
link.download = `equation-${day}${month}-${hours}${minutes}.png`;

link.href = canvas.toDataURL('image/png');
link.click();
});
}