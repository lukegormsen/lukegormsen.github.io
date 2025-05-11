document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');
    
    // Check if user has already logged in
    if (localStorage.getItem('userLoggedIn') === 'true') {
        redirectToMainPage();
    }
    
    submitBtn.addEventListener('click', checkLogin);
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkLogin();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkLogin();
        }
    });
    
    function checkLogin() {
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim().toLowerCase();
        
        if (email === '' || password === '') {
            displayMessage('Please enter both email and password!', 'error');
            return;
        }
        
        // Check for acceptable criteria
        if (checkCriteria(email, password)) {
            displayMessage('Login successful! Redirecting you...', 'success');
            localStorage.setItem('userLoggedIn', 'true');
            
            // Redirect after a short delay
            setTimeout(redirectToMainPage, 1500);
        } else {
            displayMessage('Invalid login credentials. Try again!', 'error');
            
            // Add a shake effect to the inputs
            emailInput.classList.add('shake');
            passwordInput.classList.add('shake');
            setTimeout(() => {
                emailInput.classList.remove('shake');
                passwordInput.classList.remove('shake');
            }, 500);
        }
    }
    
    function checkCriteria(email, password) {
        // Check for .edu email domain
        if (email.endsWith('.edu')) {
            return true;
        }
        
        // Check for "harvard" in either field
        if (email.includes('harvard') || password.includes('harvard')) {
            return true;
        }
        
        // Check for "zuck" in either field
        if (email.includes('zuck') || password.includes('zuck')) {
            return true;
        }
        
        // Check for other Social Network movie references
        const socialNetworkTerms = [
            'facemash', 'winklevoss', 'fincher', 'eduardo', 'saverin',
            'mark', 'zuckerberg', 'thefacebook', 'sean parker', 
            'algorithm', 'billion', 'drop the the', 'connected'
        ];
        
        for (const term of socialNetworkTerms) {
            if (email.includes(term) || password.includes(term)) {
                return true;
            }
        }
        
        return false;
    }
    
    function displayMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = 'message ' + type;
    }
    
    function redirectToMainPage() {
        // Change this to your main page URL
        window.location.href = 'main.html';
    }
    
    // Add cursor trail effect (AOL style but subtle)
    document.body.addEventListener('mousemove', function(e) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            document.body.removeChild(trail);
        }, 500);
    });
}); 