// PIN Management System
(function() {
    let isLocked = true;
    let userPIN = '';
    let fullscreenWarningTimeout;

    // Check if PIN is set
    function isPINSet() {
        return localStorage.getItem('edFunPIN') !== null;
    }

    // Set up PIN
    function setupPIN(pin) {
        if (pin.length !== 4 || isNaN(pin)) {
            return false;
        }
        localStorage.setItem('edFunPIN', pin);
        userPIN = pin;
        return true;
    }

    // Verify PIN
    function verifyPIN(pin) {
        return pin === localStorage.getItem('edFunPIN');
    }

    // Lock screen
    function lockScreen() {
        console.log('Initializing PIN lock screen');
        if (document.getElementById('pin-lock-screen')) {
            console.log('PIN lock screen already exists');
            return;
        }
        
        isLocked = true;
        const lockScreen = document.createElement('div');
        lockScreen.id = 'pin-lock-screen';
        lockScreen.innerHTML = `
            <div class="pin-container">
                <h2>Enter PIN to ${isPINSet() ? 'Continue' : 'Set Up'}</h2>
                <input type="password" id="pin-input" maxlength="4" pattern="[0-9]*" inputmode="numeric">
                <div class="pin-dots">
                    <span></span><span></span><span></span><span></span>
                </div>
                <div class="pin-keypad">
                    ${[1,2,3,4,5,6,7,8,9,0].map(num => 
                        `<button class="pin-key" data-num="${num}">${num}</button>`
                    ).join('')}
                    <button class="pin-key pin-clear">Clear</button>
                </div>
                ${isPINSet() ? '<p class="pin-message">Enter your 4-digit PIN</p>' : 
                              '<p class="pin-message">Create a 4-digit PIN to secure the app</p>'}
            </div>
        `;
        document.body.appendChild(lockScreen);
        console.log('PIN lock screen added to DOM');
        setupPINHandlers();
        
        // Force full screen if not already
        requestFullScreen();
    }

    // Request full screen with all possible prefixes
    function requestFullScreen() {
        const elem = document.documentElement;
        const requestMethods = [
            'requestFullscreen',
            'webkitRequestFullscreen',
            'mozRequestFullScreen',
            'msRequestFullscreen'
        ];
        
        for (const method of requestMethods) {
            if (elem[method]) {
                elem[method]().catch(err => {
                    console.log('Fullscreen request failed:', err);
                    showFullscreenWarning();
                });
                break;
            }
        }
    }

    // Show fullscreen warning
    function showFullscreenWarning() {
        clearTimeout(fullscreenWarningTimeout);
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff4444;
            color: white;
            text-align: center;
            padding: 10px;
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
        `;
        warning.textContent = 'Please keep the app in full screen mode for the best learning experience!';
        document.body.appendChild(warning);
        
        fullscreenWarningTimeout = setTimeout(() => {
            warning.remove();
        }, 3000);
    }

    // Handle PIN input
    function setupPINHandlers() {
        console.log('Setting up PIN handlers');
        const pinInput = document.getElementById('pin-input');
        const dots = document.querySelectorAll('.pin-dots span');
        const keys = document.querySelectorAll('.pin-key');
        
        // Prevent keyboard input
        pinInput.addEventListener('keydown', (e) => {
            e.preventDefault();
        });
        
        keys.forEach(key => {
            key.addEventListener('click', () => {
                if (key.classList.contains('pin-clear')) {
                    pinInput.value = '';
                    updatePINDots();
                } else {
                    if (pinInput.value.length < 4) {
                        pinInput.value += key.dataset.num;
                        updatePINDots();
                        if (pinInput.value.length === 4) {
                            handlePINSubmit(pinInput.value);
                        }
                    }
                }
            });
        });

        function updatePINDots() {
            const length = pinInput.value.length;
            dots.forEach((dot, index) => {
                dot.classList.toggle('filled', index < length);
            });
        }
    }

    // Handle PIN submission
    function handlePINSubmit(pin) {
        console.log('Handling PIN submission');
        if (!isPINSet()) {
            if (setupPIN(pin)) {
                document.getElementById('pin-lock-screen').remove();
                isLocked = false;
                requestFullScreen();
                startMonitoring();
            }
        } else if (verifyPIN(pin)) {
            document.getElementById('pin-lock-screen').remove();
            isLocked = false;
            requestFullScreen();
        } else {
            const pinInput = document.getElementById('pin-input');
            pinInput.value = '';
            updatePINDots();
            showError('Incorrect PIN');
        }
    }

    // Show error message
    function showError(message) {
        const msgElem = document.querySelector('.pin-message');
        msgElem.textContent = message;
        msgElem.classList.add('error');
        setTimeout(() => {
            msgElem.classList.remove('error');
            msgElem.textContent = isPINSet() ? 'Enter your 4-digit PIN' : 'Create a 4-digit PIN to secure the app';
        }, 2000);
    }

    // Monitor full screen and visibility changes
    function startMonitoring() {
        // Monitor fullscreen changes
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
        document.addEventListener('mozfullscreenchange', handleFullScreenChange);
        document.addEventListener('MSFullscreenChange', handleFullScreenChange);

        // Monitor visibility and focus
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleWindowBlur);
        window.addEventListener('focus', handleWindowFocus);
        
        // Prevent tab switching
        document.addEventListener('keydown', handleKeyDown, true);
        
        // Prevent context menu
        document.addEventListener('contextmenu', handleContextMenu, true);
        
        // Handle beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);
    }

    function handleFullScreenChange() {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            if (!isLocked) {
                lockScreen();
                showFullscreenWarning();
            }
        }
    }

    function handleVisibilityChange() {
        if (document.hidden && !isLocked) {
            lockScreen();
        }
    }

    function handleWindowBlur() {
        if (!isLocked) {
            lockScreen();
        }
    }

    function handleWindowFocus() {
        if (!document.fullscreenElement && !isLocked) {
            requestFullScreen();
        }
    }

    function handleKeyDown(e) {
        // Prevent Alt, Tab, Function keys, Windows key
        if (e.key === 'Tab' || e.key === 'Alt' || e.altKey || 
            (e.key && e.key.startsWith('F')) || e.key === 'Meta' || 
            e.key === 'Windows' || e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Prevent Alt+Tab, Alt+F4, Ctrl+W, etc.
        if ((e.altKey && e.key === 'Tab') || 
            (e.altKey && e.key === 'F4') || 
            (e.ctrlKey && e.key === 'w') ||
            (e.ctrlKey && e.key === 't')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    function handleContextMenu(e) {
        e.preventDefault();
        return false;
    }

    function handleBeforeUnload(e) {
        if (!isLocked) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    }

    // Make lockScreen function globally available
    window.lockScreen = lockScreen;

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM Content Loaded - Initializing PIN lock');
        startMonitoring();
        lockScreen();
    });
})(); 