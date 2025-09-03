// Project Modal with Image Gallery Functionality
let currentProject = null;
let currentImageIndex = 0;
let projectImages = [];

// Project details data with image arrays
const projectDetails = {
    'texas-20mw': {
        title: 'Texas 20MW Construction',
        folder: 'texas-20mw-site',
        images: ['101.png', '1.png', '102.png', '103.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
        description: 'A large-scale crypto mining center with local political and power support, demonstrating our capability to handle major infrastructure projects.',
        details: [
            '20MW total capacity',
            'Strategic Texas location',
            'Local government support',
            'Advanced cooling systems',
            '24/7 monitoring capabilities',
            'Scalable infrastructure design'
        ],
        stats: {
            'Capacity': '20MW',
            'Location': 'Texas, USA',
            'Status': 'Completed',
            'Timeline': '2023'
        }
    },
    'texas-8mw': {
        title: 'Texas 8MW Construction',
        folder: 'texas-8mw-interior',
        images: ['101.png', '1.png', '2.png', '3.jpg', '4.jpg', '5.png', '6.png', '7.jpg', '8.png'],
        description: 'Another robust mining facility in Texas, showcasing our expertise in efficient facility design and construction.',
        details: [
            '8MW operational capacity',
            'Interior facility design',
            'Energy-efficient systems',
            'Modular construction approach',
            'Comprehensive security features',
            'Future expansion ready'
        ],
        stats: {
            'Capacity': '8MW',
            'Location': 'Texas, USA',
            'Status': 'Operational',
            'Timeline': '2023'
        }
    },
    'georgia-15mw': {
        title: 'Georgia 15MW Construction',
        folder: 'georgia-15mw-exterior',
        images: ['101.png', '1.png', '2.png'],
        description: 'Expanding our footprint in the Southeast U.S. with this comprehensive mining facility project.',
        details: [
            '15MW total capacity',
            'Southeast U.S. expansion',
            'Regional energy partnerships',
            'Climate-optimized design',
            'Local workforce development',
            'Community integration'
        ],
        stats: {
            'Capacity': '15MW',
            'Location': 'Georgia, USA',
            'Status': 'In Progress',
            'Timeline': '2024'
        }
    },
    'solar-container': {
        title: 'Solar-Powered Mining Container Project',
        folder: 'solar-container-farm',
        images: ['101.jpg', '1.jpg'],
        description: 'A 10MW solar farm with integrated bitcoin mining, demonstrating our commitment to sustainable energy solutions.',
        details: [
            '10MW solar capacity',
            'Sustainable energy integration',
            'Container-based mining units',
            'Green energy certification',
            'Carbon footprint reduction',
            'Innovative energy storage'
        ],
        stats: {
            'Capacity': '10MW Solar',
            'Location': 'Multiple Sites',
            'Status': 'Operational',
            'Timeline': '2023'
        }
    },
    'kansas-oil': {
        title: 'Kansas Oil Field Project',
        folder: 'kansas-oil-field-site',
        images: ['101.jpg', '2.png'],
        description: 'Utilizing existing wells in a 4000-acre oil field for energy-based mining operations, showcasing innovative energy integration.',
        details: [
            '4000-acre facility',
            'Oil field energy integration',
            'Waste energy utilization',
            'Environmental compliance',
            'Local economic impact',
            'Innovative energy solutions'
        ],
        stats: {
            'Capacity': 'Variable',
            'Location': 'Kansas, USA',
            'Status': 'Planning',
            'Timeline': '2024-2025'
        }
    }
};

function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalStats = document.getElementById('modalStats');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    
    currentProject = projectDetails[projectId];
    if (!currentProject) return;
    
    // Set project images array
    projectImages = currentProject.images;
    currentImageIndex = 0;
    
    // Set modal content
    modalTitle.textContent = currentProject.title;
    modalDescription.innerHTML = `<p>${currentProject.description}</p>`;
    
    // Set stats
    modalStats.innerHTML = `
        <div class="modal-stats">
            ${Object.entries(currentProject.stats).map(([key, value]) => `
                <span class="stat">${key}: ${value}</span>
            `).join('')}
        </div>
    `;
    
    // Set main image (always start with 101 image)
    const mainImagePath = `images/projects/${currentProject.folder}/${projectImages[0]}`;
    modalImage.src = mainImagePath;
    modalImage.alt = currentProject.title;
    
    // Create thumbnails
    createThumbnails();
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function createThumbnails() {
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    galleryThumbnails.innerHTML = '';
    
    projectImages.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = `images/projects/${currentProject.folder}/${image}`;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage();
            updateThumbnails();
        });
        
        galleryThumbnails.appendChild(thumbnail);
    });
}

function updateMainImage() {
    const modalImage = document.getElementById('modalImage');
    const imagePath = `images/projects/${currentProject.folder}/${projectImages[currentImageIndex]}`;
    modalImage.src = imagePath;
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function changeImage(direction) {
    if (!currentProject || projectImages.length === 0) return;
    
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex >= projectImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = projectImages.length - 1;
    }
    
    updateMainImage();
    updateThumbnails();
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = function() {
        closeModal();
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (event.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
});

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentImageIndex = 0;
    projectImages = [];
}