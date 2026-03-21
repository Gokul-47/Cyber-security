/* ===================================
   STACKLY CYBER SECURITY - MAIN JS
   All animations and interactions
   =================================== */

(function($) {
    'use strict';

    // ===== DOCUMENT READY =====
    $(document).ready(function() {
        
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }

        // Initialize Owl Carousel for Testimonials
        if ($.fn.owlCarousel) {
            $('.testimonial-slider').owlCarousel({
                loop: true,
                margin: 30,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1024: {
                        items: 3
                    }
                }
            });
        }

        // Counter Animation
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-target');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });

        // Navbar scroll effect
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }
        });

        // Smooth scroll for anchor links
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.hash);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);
            }
        });

        // GSAP Animations
        if (typeof gsap !== 'undefined') {
            // Hero section animations
            gsap.from('.hero-title', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });

            gsap.from('.hero-subtitle', {
                duration: 1,
                y: 30,
                opacity: 0,
                delay: 0.3,
                ease: 'power3.out'
            });

            gsap.from('.hero-buttons', {
                duration: 1,
                y: 20,
                opacity: 0,
                delay: 0.6,
                ease: 'power3.out'
            });

            // Floating icons animation
            gsap.to('.floating-icon', {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                stagger: 0.2
            });

            // Register ScrollTrigger plugin
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);

                // Animate sections on scroll
                gsap.utils.toArray('.feature-card').forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: i * 0.1
                    });
                });
            }
        }

        // Jarallax for parallax effects
        if (typeof jarallax !== 'undefined') {
            jarallax(document.querySelectorAll('.jarallax'), {
                speed: 0.5
            });
        }

        // CircleType for curved text
        if (typeof CircleType !== 'undefined') {
            $('.curved-text').each(function() {
                new CircleType(this).radius(200);
            });
        }

        // Lettering.js for text animations
        if ($.fn.lettering) {
            $('.animated-text').lettering();
        }

        // Magnific Popup for images
        if ($.fn.magnificPopup) {
            $('.image-popup').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300
                }
            });

            $('.video-popup').magnificPopup({
                type: 'iframe',
                iframe: {
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: 'v=',
                            src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                        }
                    }
                }
            });
        }

        // Isotope for filtering
        if ($.fn.isotope) {
            const $grid = $('.isotope-grid').isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows'
            });

            $('.filter-buttons').on('click', 'button', function() {
                const filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
                $('.filter-buttons button').removeClass('active');
                $(this).addClass('active');
            });

            // Layout Isotope after each image loads
            if (typeof imagesLoaded !== 'undefined') {
                $grid.imagesLoaded().progress(function() {
                    $grid.isotope('layout');
                });
            }
        }

        // jQuery Appear for animation on scroll
        if ($.fn.appear) {
            $('.counter').appear(function() {
                $(this).each(function() {
                    const $this = $(this);
                    const countTo = $this.attr('data-target');
                    
                    $({ countNum: $this.text() }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });
                });
            }, { accY: -100 });
        }

        // noUiSlider for range inputs
        if (typeof noUiSlider !== 'undefined' && typeof wNumb !== 'undefined') {
            const sliders = document.querySelectorAll('.range-slider');
            sliders.forEach(function(slider) {
                noUiSlider.create(slider, {
                    start: [50],
                    connect: [true, false],
                    range: {
                        'min': 0,
                        'max': 100
                    },
                    format: wNumb({
                        decimals: 0
                    })
                });
            });
        }

        // Countdown Timer
        if ($.fn.countdown) {
            $('.countdown-timer').countdown('2024/12/31', function(event) {
                $(this).html(event.strftime(
                    '<div class="countdown-item"><span>%D</span> Days</div>' +
                    '<div class="countdown-item"><span>%H</span> Hours</div>' +
                    '<div class="countdown-item"><span>%M</span> Minutes</div>' +
                    '<div class="countdown-item"><span>%S</span> Seconds</div>'
                ));
            });
        }

        // Bootstrap Select
        if ($.fn.selectpicker) {
            $('.selectpicker').selectpicker();
        }

        // Form Validation
        if ($.fn.validate) {
            $('.contact-form').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 10
                    }
                },
                messages: {
                    name: {
                        required: 'Please enter your name',
                        minlength: 'Name must be at least 2 characters'
                    },
                    email: {
                        required: 'Please enter your email',
                        email: 'Please enter a valid email address'
                    },
                    message: {
                        required: 'Please enter a message',
                        minlength: 'Message must be at least 10 characters'
                    }
                },
                submitHandler: function(form) {
                    alert('Thank you for contacting us! We will get back to you soon.');
                    form.reset();
                    return false;
                }
            });
        }

        // Slick Carousel
        if ($.fn.slick) {
            $('.slick-carousel').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }

        // Tiny Slider
        if (typeof tns !== 'undefined') {
            const slider = tns({
                container: '.tiny-slider',
                items: 1,
                slideBy: 'page',
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayButtonOutput: false,
                controls: false,
                nav: true,
                responsive: {
                    640: {
                        items: 2
                    },
                    1024: {
                        items: 3
                    }
                }
            });
        }

        // Navbar mobile toggle
        $('.navbar-toggler').on('click', function() {
            $(this).toggleClass('active');
        });

        // Close mobile menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.navbar').length) {
                $('.navbar-collapse').collapse('hide');
                $('.navbar-toggler').removeClass('active');
            }
        });

        // Add loading animation
        $(window).on('load', function() {
            $('body').addClass('loaded');
            
            // Trigger AOS refresh
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });

        // Preloader
        setTimeout(function() {
            $('.preloader').fadeOut('slow');
        }, 500);

        // Back to top button
        const backToTop = $('<button class="back-to-top"><i class="fas fa-arrow-up"></i></button>');
        $('body').append(backToTop);

        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                backToTop.addClass('show');
            } else {
                backToTop.removeClass('show');
            }
        });

        backToTop.on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
        });

        // Add CSS for back to top button
        $('<style>')
            .prop('type', 'text/css')
            .html(`
                .back-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: var(--primary-color, #0066ff);
                    color: #fff;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 9999;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                }
                .back-to-top.show {
                    opacity: 1;
                    visibility: visible;
                }
                .back-to-top:hover {
                    background: var(--secondary-color, #00d4ff);
                    transform: translateY(-5px);
                }
                @media (max-width: 768px) {
                    .back-to-top {
                        width: 40px;
                        height: 40px;
                        bottom: 20px;
                        right: 20px;
                    }
                }
            `)
            .appendTo('head');

        // Particle effect on hero section
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#00d4ff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00d4ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }

        // Typing effect
        if (typeof Typed !== 'undefined') {
            const typed = new Typed('.typed-text', {
                strings: ['Cyber Security', 'Data Protection', 'Threat Detection', 'Network Security'],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true
            });
        }

        // Add hover effect to cards
        $('.feature-card, .service-box, .solution-card, .product-card').on('mouseenter', function() {
            $(this).addClass('animate__animated animate__pulse');
        }).on('animationend', function() {
            $(this).removeClass('animate__animated animate__pulse');
        });

        // Lazy loading for images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Console welcome message
        console.log('%c Welcome to Stackly Cyber Security! ', 'background: #0066ff; color: #fff; font-size: 20px; padding: 10px;');
        console.log('%c Powered by cutting-edge security technology ', 'color: #00d4ff; font-size: 14px;');

    });

    // ===== WINDOW LOAD =====
    $(window).on('load', function() {
        // Refresh animations
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Initialize masonry after all images loaded
        if ($.fn.masonry && typeof imagesLoaded !== 'undefined') {
            $('.masonry-grid').imagesLoaded(function() {
                $('.masonry-grid').masonry({
                    itemSelector: '.masonry-item',
                    columnWidth: '.masonry-sizer',
                    percentPosition: true
                });
            });
        }
    });

    // ===== WINDOW RESIZE =====
    $(window).on('resize', function() {
        // Refresh AOS on window resize
        if (typeof AOS !== 'undefined') {
            setTimeout(function() {
                AOS.refresh();
            }, 200);
        }
    });

})(jQuery);

// ===== VANILLA JS FUNCTIONS =====

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        if (field.type === 'password') {
            field.type = 'text';
        } else {
            field.type = 'password';
        }
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied to clipboard!');
}

// Print page
function printPage() {
    window.print();
}

// Share on social media
function shareOnSocial(platform, url, title) {
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            break;
    }
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}