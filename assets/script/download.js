document.getElementById('download-png').addEventListener('click', () => {
    // Create a popup dialog
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.innerHTML = `
        <h3>Select Download Format</h3>
        <label><input type="checkbox" id="format-png" checked> PNG</label><br>
        <label><input type="checkbox" id="format-svg"> SVG</label><br>
        <label><input type="checkbox" id="format-pdf"> PDF</label><br>
        <button id="download-confirm">Download</button>
        <button id="download-cancel">Cancel</button>
    `;
    document.body.appendChild(popup);

    document.getElementById('download-confirm').addEventListener('click', () => {
        const formatPNG = document.getElementById('format-png').checked;
        const formatSVG = document.getElementById('format-svg').checked;
        const formatPDF = document.getElementById('format-pdf').checked;
        document.body.removeChild(popup);

        MathJax.typesetPromise().then(() => {
            const mathContainer = document.getElementById('renderedEquation');
            const svgs = mathContainer.getElementsByTagName('svg');
            if (svgs.length > 0) {
                const svg = svgs[0];
                svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                const svgData = new XMLSerializer().serializeToString(svg);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(svgBlob);

                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = now.getFullYear();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                const fileNameBase = `equation-${day}${month}${year}-${hours}${minutes}${seconds}`;

                if (formatPNG || formatPDF) {
                    const img = new Image();
                    img.onload = () => {
                        const scaleFactor = 5;  // Increase this factor to improve quality further
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width * scaleFactor;
                        canvas.height = img.height * scaleFactor;
                        const ctx = canvas.getContext('2d');
                        ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
                        ctx.drawImage(img, 0, 0);
                        URL.revokeObjectURL(url);

                        if (formatPNG) {
                            canvas.toBlob((blob) => {
                                const pngUrl = URL.createObjectURL(blob);
                                const downloadLink = document.createElement('a');
                                downloadLink.href = pngUrl;
                                downloadLink.download = `${fileNameBase}.png`;
                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                            }, 'image/png');
                        }

                        if (formatPDF) {
                            const { jsPDF } = window.jspdf;
                            const pdf = new jsPDF({
                                orientation: 'portrait',
                                unit: 'pt',
                                format: 'a4'
                            });
                            const imgData = canvas.toDataURL('image/png');
                            const margin = 20;
                            const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
                            const pageHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
                            const imgWidth = canvas.width / scaleFactor;
                            const imgHeight = canvas.height / scaleFactor;
                            const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
                            const x = margin;  // Align to the left margin
                            const y = (pdf.internal.pageSize.getHeight() - imgHeight * ratio) / 2;

                            pdf.addImage(imgData, 'PNG', x, y, imgWidth * ratio, imgHeight * ratio);
                            pdf.save(`${fileNameBase}.pdf`);
                        }
                    };
                    img.src = url;
                }

                if (formatSVG) {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.download = `${fileNameBase}.svg`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            } else {
                console.error('No SVG found in the container.');
            }
        }).catch((error) => {
            console.error('MathJax typeset error:', error);
        });
    });

    document.getElementById('download-cancel').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
});
