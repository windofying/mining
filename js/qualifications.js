// Image Modal Functionality for Qualifications
function openImageModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-image');
    
    // Close modal when clicking on X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add loading state for images
    const licenseImages = document.querySelectorAll('.license-image img');
    licenseImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // If image fails to load, show a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEzOC45NTQgMTAwIDEzMCA5MS4wNDU3IDEzMCA4MEMxMzAgNjguOTU0MyAxMzguOTU0IDYwIDE1MCA2MEMxNjEuMDQ2IDYwIDE3MCA2OC45NTQzIDE3MCA4MEMxNzAgOTEuMDQ1NyAxNjEuMDQ2IDEwMCAxNTAgMTAwWiIgZmlsbD0iIzlDQTBBNiIvPjxwYXRoIGQ9Ik0xNTAgMTEwQzEzOC45NTQgMTEwIDEzMCAxMDEuMDQ2IDEzMCA5MEMxMzAgNzguOTU0MyAxMzguOTU0IDcwIDE1MCA3MEMxNjEuMDQ2IDcwIDE3MCA3OC45NTQzIDE3MCA5MEMxNzAgMTAxLjA0NiAxNjEuMDQ2IDExMCAxNTAgMTEwWiIgZmlsbD0iIzlDQTBBNiIvPjxwYXRoIGQ9Ik0xNTAgMTIwQzEzOC45NTQgMTIwIDEzMCAxMTEuMDQ2IDEzMCAxMDBDMTMwIDg4Ljk1NDMgMTM4Ljk1NCA4MCAxNTAgODBDMTYxLjA0NiA4MCAxNzAgODguOTU0MyAxNzAgMTAwQzE3MCAxMTEuMDQ2IDE2MS4wNDYgMTIwIDE1MCAxMjBaIiBmaWxsPSIjOUNBMEE2Ii8+PC9zdmc+';
            this.alt = 'Image not available';
        });
    });
});


