/**
 * Performance Optimization Script
 * Remove access token overlay after timeout to prevent render blocking
 */

(function() {
    'use strict';
    
    // Remove overlay after 2 segundos se ainda estiver visível
    // Isso previne bloqueio de renderização enquanto a validação ocorre
    const overlayTimeout = setTimeout(() => {
        const overlay = document.getElementById('access-token-overlay');
        if (overlay && overlay.style.display !== 'none') {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease-out';
            
            setTimeout(() => {
                if (overlay && overlay.parentNode) {
                    overlay.remove();
                }
            }, 300);
        }
    }, 2000);
    
    // Se validação terminar rápido, remover timeout
    document.addEventListener('DOMContentLoaded', () => {
        clearTimeout(overlayTimeout);
        const overlay = document.getElementById('access-token-overlay');
        if (overlay) {
            // Overlay será removido pelo script de validação original
            // Se não remover em 1s, removemos forçadamente
            setTimeout(() => {
                if (overlay && overlay.parentNode) {
                    overlay.remove();
                }
            }, 1000);
        }
    });
    
    // Lazy load imagens no viewport
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Carregar 50px antes de entrar no viewport
        });
        
        // Observar todas as imagens com lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Otimizar renderização de fontes
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }
})();
