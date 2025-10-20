// DisasterGuardian.ai - Main Application Script

class DisasterGuardian {
    constructor() {
        this.init();
    }

    init() {
        console.log('🚀 DisasterGuardian.ai initialized');
        
        // Initialize all components
        this.initNavigation();
        this.initAlertSystem();
        this.initEmergencyButton();
        this.initSmoothScrolling();
        this.initAnimations();
        this.initRealTimeUpdates();
    }

    // Navigation Management
    initNavigation() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navItems = document.querySelectorAll('.nav-item');

        // Mobile menu toggle
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on items
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.querySelector('i').classList.remove('fa-times');
            });
        });

        // Update active nav item on scroll
        window.addEventListener('scroll', this.throttle(() => {
            this.updateActiveNavItem();
        }, 100));
    }

    // Alert System
    initAlertSystem() {
        // Simulate real-time alert updates
        this.simulateAlertUpdates();
        
        // Initialize alert interactions
        this.initAlertInteractions();
    }

    // Emergency Button Handler
    initEmergencyButton() {
        const emergencyButtons = document.querySelectorAll('.btn-emergency');
        
        emergencyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleEmergencyClick();
            });
        });
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animations on Scroll
    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.stats-grid, .alerts-grid, .features-grid');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Real-time Data Updates
    initRealTimeUpdates() {
        // Update stats every 30 seconds
        setInterval(() => {
            this.updateLiveStats();
        }, 30000);

        // Initial update
        this.updateLiveStats();
    }

    // Utility Methods
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        let currentSection = '';
        const scrollY = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.includes(currentSection)) {
                item.classList.add('active');
            }
        });
    }

    handleEmergencyClick() {
        // Show emergency modal/notification
        this.showEmergencyModal();
        
        // Log emergency event
        this.logEmergencyEvent();
        
        // Vibrate if supported
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    }

    showEmergencyModal() {
        // Create emergency modal
        const modal = document.createElement('div');
        modal.className = 'emergency-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header emergency">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>EMERGÊNCIA - PRECISA DE AJUDA?</h3>
                </div>
                <div class="modal-body">
                    <p>Estamos acionando os serviços de emergência para sua localização.</p>
                    <div class="emergency-options">
                        <button class="btn btn-emergency" onclick="disasterGuardian.callEmergencyServices()">
                            <i class="fas fa-phone"></i>
                            Chamar Emergência (190/192)
                        </button>
                        <button class="btn btn-alert" onclick="disasterGuardian.showNearestShelters()">
                            <i class="fas fa-map-marker-alt"></i>
                            Abrigos Mais Próximos
                        </button>
                        <button class="btn btn-primary" onclick="disasterGuardian.closeEmergencyModal()">
                            <i class="fas fa-times"></i>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const styles = `
            .emergency-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fade-in 0.3s ease;
            }
            .modal-content {
                background: var(--card);
                border-radius: var(--radius-lg);
                max-width: 500px;
                width: 90%;
                animation: slide-up 0.3s ease;
            }
            .modal-header {
                padding: var(--spacing-4);
                border-bottom: 1px solid var(--border);
                display: flex;
                align-items: center;
                gap: var(--spacing-3);
            }
            .modal-header.emergency {
                background: var(--emergency-10);
                color: var(--emergency);
            }
            .modal-body {
                padding: var(--spacing-6);
            }
            .emergency-options {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-3);
                margin-top: var(--spacing-4);
            }
        `;

        // Inject styles
        if (!document.querySelector('#emergency-modal-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'emergency-modal-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(modal);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeEmergencyModal();
            }
        });
    }

    closeEmergencyModal() {
        const modal = document.querySelector('.emergency-modal');
        if (modal) {
            modal.remove();
        }
    }

    callEmergencyServices() {
        // Simulate emergency call
        alert('📞 Conectando com os serviços de emergência...\n\nPor favor, mantenha a calela e aguarde instruções.');
        
        // In a real app, this would trigger actual emergency services
        console.log('🚨 Emergency services contacted');
        
        this.closeEmergencyModal();
    }

    showNearestShelters() {
        // Simulate showing shelters
        alert('🏠 Buscando abrigos mais próximos da sua localização...\n\nEm desenvolvimento: Integração com mapa em tempo real.');
        
        // In a real app, this would show actual shelters on map
        console.log('📍 Showing nearest shelters');
    }

    logEmergencyEvent() {
        const event = {
            type: 'emergency_button_click',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            location: 'unknown' // Would be geolocation in real app
        };
        
        console.log('🚨 Emergency event:', event);
        
        // In a real app, this would send to analytics/emergency services
        // fetch('/api/emergency-events', { method: 'POST', body: JSON.stringify(event) });
    }

    simulateAlertUpdates() {
        // Simulate changing alert status
        setInterval(() => {
            const alerts = document.querySelectorAll('.alert-card');
            alerts.forEach(alert => {
                if (Math.random() < 0.1) { // 10% chance to update
                    this.animateAlertUpdate(alert);
                }
            });
        }, 10000);
    }

    animateAlertUpdate(alert) {
        alert.style.transform = 'scale(1.02)';
        setTimeout(() => {
            alert.style.transform = 'scale(1)';
        }, 300);
    }

    initAlertInteractions() {
        const alertButtons = document.querySelectorAll('.alert-actions .btn');
        
        alertButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const alertCard = button.closest('.alert-card');
                this.handleAlertAction(alertCard, button.textContent.trim());
            });
        });
    }

    handleAlertAction(alertCard, action) {
        const alertTitle = alertCard.querySelector('.alert-title').textContent;
        
        switch(action) {
            case 'Ver Rotas de Fuga':
                this.showEvacuationRoutes(alertTitle);
                break;
            case 'Ver Recomendações':
                this.showSafetyRecommendations(alertTitle);
                break;
            case 'Ver Detalhes':
                this.showAlertDetails(alertCard);
                break;
        }
    }

    showEvacuationRoutes(alertTitle) {
        alert(`🗺️ Mostrando rotas de evacuação para: ${alertTitle}\n\nEm desenvolvimento: Integração com sistema de navegação em tempo real.`);
    }

    showSafetyRecommendations(alertTitle) {
        const recommendations = {
            'Enchente Iminente': [
                '• Procure áreas elevadas',
                '• Desligue a energia elétrica',
                '• Leve documentos importantes',
                '• Siga as rotas indicadas pela Defesa Civil'
            ],
            'Chuva Intensa': [
                '• Evite áreas alagadas',
                '• Não atravesse ruas inundadas',
                '• Mantenha-se em local seguro',
                '• Monitore os alertas oficial'
            ],
            'Monitoramento Ativo': [
                '• Mantenha-se informado',
                '• Tenha um kit de emergência pronto',
                '• Conheça as rotas de evacuação',
                '• Siga as orientações oficiais'
            ]
        };

        const recs = recommendations[alertTitle] || [
            '• Mantenha a calma',
            '• Siga as instruções oficiais',
            '• Procure abrigo seguro',
            '• Monitore os canais oficiais'
        ];

        alert(`🛡️ Recomendações de segurança para: ${alertTitle}\n\n${recs.join('\n')}`);
    }

    showAlertDetails(alertCard) {
        const title = alertCard.querySelector('.alert-title').textContent;
        const location = alertCard.querySelector('.alert-info:nth-child(1)').textContent;
        const timeframe = alertCard.querySelector('.alert-info:nth-child(2)').textContent;
        const metric = alertCard.querySelector('.alert-info:nth-child(3)')?.textContent || 'N/A';

        alert(`📊 Detalhes do Alerta:\n\n` +
              `Título: ${title}\n` +
              `Localização: ${location}\n` +
              `Timeframe: ${timeframe}\n` +
              `Métrica: ${metric}\n\n` +
              `Mais informações em desenvolvimento...`);
    }

    updateLiveStats() {
        // Simulate live data updates
        const stats = document.querySelectorAll('.stats-value');
        
        stats.forEach(stat => {
            if (Math.random() < 0.3) { // 30% chance to update each stat
                const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
                const change = Math.floor(Math.random() * 100) - 20; // -20 to +80
                const newValue = Math.max(0, currentValue + change);
                
                // Animate the update
                this.animateNumberChange(stat, currentValue, newValue);
            }
        });
    }

    animateNumberChange(element, start, end) {
        const duration = 1000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
}

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.disasterGuardian = new DisasterGuardian();
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DisasterGuardian;
}