document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status (in real app, this would check with backend)
    const isAuthenticated = localStorage.getItem('rightDoseAuth') === 'true';
    const authModal = document.getElementById('authModal');
    const orderContainer = document.getElementById('orderContainer');
    
    // Show/hide based on auth status
    if (isAuthenticated) {
        authModal.style.display = 'none';
        orderContainer.style.display = 'block';
    } else {
        authModal.style.display = 'flex';
        orderContainer.style.display = 'none';
    }
    
    // Tab switching in auth modal
    const tabButtons = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            if (this.dataset.tab === 'login') {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            }
        });
    });
    
    // Sample drug data
    const drugs = [
        { id: 1, name: "Paracetamol 500mg", code: "D-12345", manufacturer: "ABC Pharmaceuticals", stock: 1250, category: "Analgesics" },
        { id: 2, name: "Ibuprofen 200mg", code: "D-12346", manufacturer: "XYZ Pharma", stock: 800, category: "Analgesics" },
        { id: 3, name: "Amoxicillin 250mg", code: "D-12347", manufacturer: "MediCorp", stock: 450, category: "Antibiotics" },
        { id: 4, name: "Azithromycin 500mg", code: "D-12348", manufacturer: "HealthPlus", stock: 320, category: "Antibiotics" },
        { id: 5, name: "Oseltamivir 75mg", code: "D-12349", manufacturer: "ViralMed", stock: 150, category: "Antivirals" },
        { id: 6, name: "Cetirizine 10mg", code: "D-12350", manufacturer: "AllergyFree", stock: 980, category: "Antihistamines" }
    ];
    
    // Search functionality
    const drugSearch = document.getElementById('drugSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const clearSearch = document.querySelector('.clear-search');
    
    drugSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 0) {
            clearSearch.style.opacity = '1';
            
            // Filter drugs
            const results = drugs.filter(drug => 
                drug.name.toLowerCase().includes(searchTerm) || 
                drug.code.toLowerCase().includes(searchTerm)
            );
            
            // Display suggestions
            if (results.length > 0) {
                searchSuggestions.innerHTML = '';
                results.forEach(drug => {
                    const suggestion = document.createElement('div');
                    suggestion.className = 'suggestion-item';
                    suggestion.textContent = `${drug.name} (${drug.code})`;
                    suggestion.addEventListener('click', function() {
                        drugSearch.value = drug.name;
                        searchSuggestions.style.display = 'none';
                        // In real app, would filter list to show this drug
                    });
                    searchSuggestions.appendChild(suggestion);
                });
                searchSuggestions.style.display = 'block';
            } else {
                searchSuggestions.innerHTML = '<div class="suggestion-item">No matches found</div>';
                searchSuggestions.style.display = 'block';
            }
        } else {
            clearSearch.style.opacity = '0';
            searchSuggestions.style.display = 'none';
        }
    });
    
    clearSearch.addEventListener('click', function() {
        drugSearch.value = '';
        this.style.opacity = '0';
        searchSuggestions.style.display = 'none';
    });
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        if (!button.textContent.includes('More')) {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // In real app, would filter drug list
            });
        }
    });
    
    // Login simulation
    const authSubmitBtn = document.querySelector('.auth-submit-btn');
    
    authSubmitBtn.addEventListener('click', function() {
        // In real app, would validate and send to backend
        localStorage.setItem('rightDoseAuth', 'true');
        authModal.style.display = 'none';
        orderContainer.style.display = 'block';
    });
    
    // Quantity controls
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('plus')) {
            const qtyValue = e.target.parentElement.querySelector('.qty-value');
            qtyValue.textContent = parseInt(qtyValue.textContent) + 1;
        }
        
        if (e.target.classList.contains('minus')) {
            const qtyValue = e.target.parentElement.querySelector('.qty-value');
            if (parseInt(qtyValue.textContent) > 0) {
                qtyValue.textContent = parseInt(qtyValue.textContent) - 1;
            }
        }
    });
});