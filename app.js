document.addEventListener('DOMContentLoaded', () => {

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const moonIcon = themeToggleBtn.querySelector('.moon-icon');
  const sunIcon = themeToggleBtn.querySelector('.sun-icon');

  // Check user preference or stored preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  } else if (currentTheme === 'light') {
    document.body.classList.remove('dark-theme');
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  } else {
    // Match system preferences
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-theme');
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      localStorage.setItem('theme', 'light');
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  });

  // 1. Header Scroll Styling
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Hamburger Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // 3. Mobile App Features Tab Switcher
  const featureTabs = document.querySelectorAll('.feature-tab-item');
  const appScreenContent = document.getElementById('app-screen-content');

  const appScreenTemplates = {
    products: `
      <div class="app-navbar">
        <span>Products List</span>
        <span class="text-orange" style="cursor:pointer;">+ Add New</span>
      </div>
      <div class="app-list-container">
        <div class="app-item-card active">
          <div class="app-item-icon-box">
            <svg class="app-item-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <div class="app-item-info">
            <div class="app-item-name">Amul Butter 500g</div>
            <div class="app-item-desc">Dairy | SKU: AMUL-021</div>
          </div>
          <div class="text-right">
            <div style="font-weight: 700;">₹250.00</div>
            <div style="font-size: 0.55rem; color: #10B981;">Stock: 45 units</div>
          </div>
        </div>
        
        <div class="app-item-card">
          <div class="app-item-icon-box">
            <svg class="app-item-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <div class="app-item-info">
            <div class="app-item-name">Aashirvaad Atta 5kg</div>
            <div class="app-item-desc">Grocery | SKU: AASH-102</div>
          </div>
          <div class="text-right">
            <div style="font-weight: 700;">₹290.00</div>
            <div style="font-size: 0.55rem; color: #10B981;">Stock: 80 units</div>
          </div>
        </div>

        <div class="app-item-card">
          <div class="app-item-icon-box">
            <svg class="app-item-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <div class="app-item-info">
            <div class="app-item-name">Tata Salt 1kg</div>
            <div class="app-item-desc">Grocery | SKU: TATA-05</div>
          </div>
          <div class="text-right">
            <div style="font-weight: 700;">₹28.00</div>
            <div style="font-size: 0.55rem; color: #ef4444;">Stock: 12 units</div>
          </div>
        </div>
      </div>
    `,
    inventory: `
      <div class="app-navbar" style="border-color:#fee2e2;">
        <span style="color:#ef4444;">⚠️ Stock Alerts</span>
        <span style="font-size:0.65rem; color:var(--primary); font-weight:500;">Reorder All</span>
      </div>
      <div class="app-list-container">
        <div class="app-item-card" style="border-left: 3px solid #ef4444; background: #fff5f5;">
          <div class="app-item-info">
            <div class="app-item-name" style="color:#b91c1c;">Tata Salt 1kg</div>
            <div class="app-item-desc">Low stock alert! Only 12 remaining.</div>
          </div>
          <div class="text-right">
            <button style="background:var(--secondary); color:#fff; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.55rem; font-weight:700;">Reorder</button>
          </div>
        </div>
        
        <div class="app-item-card" style="border-left: 3px solid #f59e0b; background: #fffbeb;">
          <div class="app-item-info">
            <div class="app-item-name" style="color:#b45309;">Fortune Oil 1L</div>
            <div class="app-item-desc">Medium stock level. 18 remaining.</div>
          </div>
          <div class="text-right">
            <button style="background:var(--primary); color:#fff; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.55rem; font-weight:700;">Order</button>
          </div>
        </div>

        <div class="app-item-card" style="background:#fff;">
          <div class="app-item-info">
            <div class="app-item-name">Supplier: Supreme Foods</div>
            <div class="app-item-desc">Next delivery expected: Tomorrow</div>
          </div>
          <div class="text-right" style="font-size:0.6rem; color:var(--neutral-muted);">
            Active
          </div>
        </div>
      </div>
    `,
    billing: `
      <div class="app-navbar">
        <span>New Invoice</span>
        <span class="text-orange" style="font-size:0.65rem;">INV-9023</span>
      </div>
      <div class="app-list-container" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div style="font-size: 0.7rem; flex-grow:1;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem; border-bottom:1px solid #f1f5f9; padding-bottom:0.1rem;">
            <span>1x Amul Butter 500g</span><span>₹250.00</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem; border-bottom:1px solid #f1f5f9; padding-bottom:0.1rem;">
            <span>1x Tata Salt 1kg</span><span>₹28.00</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem; color:var(--neutral-muted);">
            <span>Subtotal</span><span>₹278.00</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem; color:var(--neutral-muted);">
            <span>CGST (2.5%)</span><span>₹6.95</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem; color:var(--neutral-muted);">
            <span>SGST (2.5%)</span><span>₹6.95</span>
          </div>
        </div>
        
        <div style="border-top:2px dashed var(--neutral-border); padding-top:0.4rem; margin-top:0.4rem;">
          <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.85rem; margin-bottom:0.5rem;">
            <span>Total Amount</span><span class="text-blue">₹291.90</span>
          </div>
          <button style="background:var(--success); color:#fff; width:100%; padding:0.4rem; border-radius:6px; font-weight:700; font-size:0.7rem; cursor:pointer;">Print Receipt</button>
        </div>
      </div>
    `,
    payments: `
      <div class="app-navbar">
        <span>Payment Method</span>
        <span style="font-size:0.6rem; color:var(--neutral-muted);">Select one</span>
      </div>
      <div class="app-list-container" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1rem;">
          <div style="border:1px solid var(--secondary); background:rgba(255,122,0,0.03); border-radius:8px; padding:0.5rem; display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <div style="width:14px; height:14px; border-radius:50%; border:3px solid var(--secondary); background:#fff;"></div>
            <div style="font-weight:600; font-size:0.7rem;">UPI QR Code (GPay, PhonePe)</div>
          </div>
          <div style="border:1px solid var(--neutral-border); border-radius:8px; padding:0.5rem; display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <div style="width:14px; height:14px; border-radius:50%; border:1px solid var(--neutral-border); background:#fff;"></div>
            <div style="font-weight:600; font-size:0.7rem;">Cash Checkout</div>
          </div>
          <div style="border:1px solid var(--neutral-border); border-radius:8px; padding:0.5rem; display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <div style="width:14px; height:14px; border-radius:50%; border:1px solid var(--neutral-border); background:#fff;"></div>
            <div style="font-weight:600; font-size:0.7rem;">Credit / Debit Card</div>
          </div>
        </div>

        <div style="text-align:center;">
          <!-- Small QR simulation -->
          <div style="background:#eee; width:50px; height:50px; margin:0 auto 0.4rem auto; padding:3px; display:flex; flex-wrap:wrap; gap:2px;">
            <div style="background:#000; width:10px; height:10px;"></div>
            <div style="background:#000; width:10px; height:10px; margin-left:auto;"></div>
            <div style="background:#000; width:10px; height:10px; margin-top:auto;"></div>
            <div style="background:#000; width:5px; height:5px; margin:auto;"></div>
          </div>
          <div style="font-size:0.55rem; color:var(--neutral-muted); margin-bottom:0.4rem;">Scan to Pay: ₹291.90</div>
          <button style="background:var(--primary); color:#fff; width:100%; padding:0.4rem; border-radius:6px; font-weight:700; font-size:0.7rem; cursor:pointer;">Confirm Payment</button>
        </div>
      </div>
    `
  };

  featureTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active states
      featureTabs.forEach(t => t.classList.remove('active'));
      // Add active state to clicked tab
      tab.classList.add('active');
      // Load corresponding mockup screen
      const selectedTab = tab.getAttribute('data-tab');
      appScreenContent.innerHTML = appScreenTemplates[selectedTab];
    });
  });

  // 4. Testimonials Slider/Carousel logic
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('#testimonial-dots .dot');
  let currentSlideIndex = 0;
  const slideCount = dots.length;
  let autoPlayTimer;

  function updateCarousel(index) {
    currentSlideIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots active class
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  // Dot Click listeners
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      clearInterval(autoPlayTimer);
      const targetIndex = parseInt(e.target.getAttribute('data-index'));
      updateCarousel(targetIndex);
      startAutoPlay();
    });
  });

  // Auto-play loop
  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      let nextIndex = (currentSlideIndex + 1) % slideCount;
      updateCarousel(nextIndex);
    }, 5000);
  }

  startAutoPlay();

  // Pause carousel auto-play on hover
  const testimonialsContainer = document.querySelector('.testimonials-container');
  testimonialsContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  testimonialsContainer.addEventListener('mouseleave', startAutoPlay);

  // 5. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open faq items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 6. LED Customer Display Number Animation Cycle
  const ledPanelNumber = document.getElementById('led-panel-number');
  const ledPrices = ['₹146.00', '₹3,450.00', '₹890.00', '₹12,240.00', '₹60.00'];
  let currentLedIndex = 0;

  setInterval(() => {
    currentLedIndex = (currentLedIndex + 1) % ledPrices.length;
    ledPanelNumber.classList.add('reveal');
    setTimeout(() => {
      ledPanelNumber.textContent = ledPrices[currentLedIndex];
    }, 100);
  }, 4000);

  // 7. Contact Form Handling & Validation
  const form = document.getElementById('billing-contact-form');
  const successOverlay = document.getElementById('success-overlay');
  const successCloseBtn = document.getElementById('success-close-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });

    let isValid = true;
    
    // Simple validation checks
    const name = document.getElementById('form-name');
    const business = document.getElementById('form-business');
    const phone = document.getElementById('form-phone');
    const email = document.getElementById('form-email');
    const city = document.getElementById('form-city');
    const businessType = document.getElementById('form-business-type');

    if (!name.value.trim()) {
      markInvalid(name);
      isValid = false;
    }
    
    if (!business.value.trim()) {
      markInvalid(business);
      isValid = false;
    }
    
    if (!phone.value.trim() || !/^\d{10}$/.test(phone.value.replace(/[^0-9]/g, ""))) {
      markInvalid(phone);
      isValid = false;
    }
    
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      markInvalid(email);
      isValid = false;
    }
    
    if (!city.value.trim()) {
      markInvalid(city);
      isValid = false;
    }
    
    if (!businessType.value) {
      markInvalid(businessType);
      isValid = false;
    }

    if (isValid) {
      // Construct WhatsApp message
      const nameVal = name.value.trim();
      const businessVal = business.value.trim();
      const phoneVal = phone.value.trim();
      const emailVal = email.value.trim();
      const cityVal = city.value.trim();
      const businessTypeVal = businessType.value;
      const messageVal = document.getElementById('form-message').value.trim();

      const messageText = `Hi, I am interested in the Smart Mobile Billing Machine. Here are my details:\n\n` +
                          `*Name:* ${nameVal}\n` +
                          `*Business:* ${businessVal}\n` +
                          `*Phone:* ${phoneVal}\n` +
                          `*Email:* ${emailVal}\n` +
                          `*City:* ${cityVal}\n` +
                          `*Business Type:* ${businessTypeVal}\n` +
                          `*Requirements:* ${messageVal || 'None'}`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappURL = `https://wa.me/916380528683?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappURL, '_blank');

      // Show success modal overlay
      successOverlay.classList.add('active');
      form.reset();
    }
  });

  function markInvalid(element) {
    element.style.borderColor = '#ef4444';
    element.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
  }

  successCloseBtn.addEventListener('click', () => {
    successOverlay.classList.remove('active');
  });

  // Close modal when overlay is clicked
  successOverlay.addEventListener('click', (e) => {
    if (e.target === successOverlay) {
      successOverlay.classList.remove('active');
    }
  });

  // 8. Entrance Scroll Animations (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    reveals.forEach(el => el.classList.add('active'));
  }

});
