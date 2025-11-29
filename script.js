// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to element
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ===================================
// NAVIGATION & MENU
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
    
    // Navigation links - smooth scroll and active state
    const navLinks = document.querySelectorAll('.nav-link');
    const tocLinks = document.querySelectorAll('.toc-item a');
    const allLinks = [...navLinks, ...tocLinks];
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
                
                // Close mobile menu after clicking
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('open');
                }
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                if (link.classList.contains('nav-link')) {
                    link.classList.add('active');
                }
            }
        });
    });
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('.content-section[id]');
    
    function highlightNavigation() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', debounce(highlightNavigation, 100));
    highlightNavigation(); // Initial call
});

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        const searchHandler = debounce((e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm.length === 0) {
                // Clear all highlights
                clearHighlights();
                return;
            }
            
            if (searchTerm.length < 3) {
                return; // Wait for at least 3 characters
            }
            
            // Perform search
            performSearch(searchTerm);
        }, 300);
        
        searchInput.addEventListener('input', searchHandler);
    }
    
    function performSearch(term) {
        clearHighlights();
        
        const contentSections = document.querySelectorAll('.content-section');
        let firstMatch = null;
        
        contentSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(term)) {
                section.style.backgroundColor = '#fef3c7';
                section.style.transition = 'background-color 0.3s ease';
                
                if (!firstMatch) {
                    firstMatch = section;
                }
            }
        });
        
        // Scroll to first match
        if (firstMatch) {
            smoothScrollTo(`#${firstMatch.id}`);
            
            // Reset background after a moment
            setTimeout(() => {
                firstMatch.style.backgroundColor = '';
            }, 2000);
        }
    }
    
    function clearHighlights() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.backgroundColor = '';
        });
    }
});

// ===================================
// BACK TO TOP BUTTON
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ===================================
// PRINT FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const printBtn = document.getElementById('printBtn');
    
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
});

// ===================================
// DOWNLOAD PDF FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            // Check if html2pdf library is available
            if (typeof html2pdf === 'undefined') {
                alert('Pentru a descărca PDF-ul, va trebui să printați pagina folosind funcția de print a browser-ului și să selectați "Salvează ca PDF".');
                window.print();
                return;
            }
            
            try {
                downloadBtn.disabled = true;
                downloadBtn.textContent = 'Se generează PDF...';
                
                const element = document.querySelector('.main-content');
                
                const opt = {
                    margin: [15, 10, 15, 10],
                    filename: 'Manual-Totem-Digital-Romania.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                };
                
                await html2pdf().set(opt).from(element).save();
                
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Descarcă PDF
                `;
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('A apărut o eroare la generarea PDF-ului. Vă rugăm încercați să printați pagina.');
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Descarcă PDF
                `;
            }
        });
    }
});

// ===================================
// RESPONSIVE TABLE HANDLING
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // Add touch scroll hint for mobile
        if (window.innerWidth <= 768) {
            const wrapper = table.closest('.table-responsive');
            if (wrapper) {
                wrapper.style.position = 'relative';
                
                // Add scroll indicator
                const scrollHint = document.createElement('div');
                scrollHint.className = 'table-scroll-hint';
                scrollHint.textContent = '← Glisează pentru a vedea mai mult →';
                scrollHint.style.cssText = `
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s;
                `;
                
                wrapper.appendChild(scrollHint);
                
                // Show hint on first scroll
                let hintShown = false;
                wrapper.addEventListener('scroll', () => {
                    if (!hintShown && wrapper.scrollLeft > 10) {
                        hintShown = true;
                        scrollHint.style.opacity = '0';
                    }
                });
                
                // Show hint initially
                setTimeout(() => {
                    scrollHint.style.opacity = '1';
                    setTimeout(() => {
                        scrollHint.style.opacity = '0';
                    }, 3000);
                }, 1000);
            }
        }
    });
});

// ===================================
// IMAGE OPTIMIZATION FOR RESPONSIVE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" for better performance
        img.loading = 'lazy';
        
        // Handle image load errors
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = '📷 Imaginea nu poate fi încărcată';
            placeholder.style.cssText = `
                padding: 2rem;
                background: #f1f5f9;
                text-align: center;
                color: #64748b;
                border-radius: 0.5rem;
                margin: 1rem 0;
            `;
            this.parentNode.insertBefore(placeholder, this.nextSibling);
        });
    });
});

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.component-card, .tip-card, .contact-item');
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
            }
        });
    });
    
    // Skip to main content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Sari la conținut';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ===================================
// COPYRIGHT YEAR AUTO-UPDATE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('#copyrightYear, #footerCopyrightYear');
    
    copyrightElements.forEach(element => {
        element.textContent = `2000-${currentYear}`;
    });
});

// ===================================
// PERFORMANCE MONITORING
// ===================================

window.addEventListener('load', () => {
    // Log page load time
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ===================================
// PREVENT LAYOUT SHIFT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Add min-height to images based on aspect ratio
    const images = document.querySelectorAll('img[width][height]');
    
    images.forEach(img => {
        const width = parseInt(img.getAttribute('width'));
        const height = parseInt(img.getAttribute('height'));
        const aspectRatio = (height / width) * 100;
        
        img.style.aspectRatio = `${width} / ${height}`;
    });
});
