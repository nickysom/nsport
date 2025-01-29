// Path to your PDF file (Make sure this is correct)
const url = 'assets/resumes/som_resume.pdf'; // Adjust path as needed

// Load PDF.js
const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(pdf => {
    pdf.getPage(1).then(page => {
        const scale = 1.5; // Adjust for better quality
        const viewport = page.getViewport({ scale });

        // Get the canvas element
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page to canvas
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
}).catch(error => {
    console.error('Error loading PDF:', error);
});

