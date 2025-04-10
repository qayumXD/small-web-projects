document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const timezoneElement = document.getElementById('timezone');
    const formatToggleBtn = document.getElementById('format-toggle-btn');
    const timezoneSelect = document.getElementById('timezone-select');
    const modeToggle = document.getElementById('mode-toggle');
    
    // State variables
    let is24Hour = true;
    let selectedTimezoneOffset = 0;
    
    // Update clock
    function updateClock() {
        const now = new Date();
        
        // Apply timezone offset
        const localTime = now.getTime();
        const localOffset = now.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const targetTime = new Date(utc + (3600000 * selectedTimezoneOffset));
        
        // Format time based on 12/24 hour setting
        let hours = targetTime.getHours();
        let ampm = '';
        
        if (!is24Hour) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM
        }
        
        // Add animation class
        timeElement.classList.add('changing');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            timeElement.classList.remove('changing');
        }, 300);
        
        // Format time with padding
        const formattedTime = 
            padZero(hours) + ':' + 
            padZero(targetTime.getMinutes()) + ':' + 
            padZero(targetTime.getSeconds()) + ampm;
        
        // Format date
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const formattedDate = days[targetTime.getDay()] + ', ' + 
                            months[targetTime.getMonth()] + ' ' + 
                            targetTime.getDate() + ', ' + 
                            targetTime.getFullYear();
        
        // Format timezone
        const timezoneString = formatTimezone(selectedTimezoneOffset);
        
        // Update DOM elements
        timeElement.textContent = formattedTime;
        dateElement.textContent = formattedDate;
        timezoneElement.textContent = timezoneString;
    }
    
    // Format timezone offset to string (UTC+XX:XX)
    function formatTimezone(offset) {
        const sign = offset >= 0 ? '+' : '-';
        const absOffset = Math.abs(offset);
        const hours = Math.floor(absOffset);
        const minutes = (absOffset - hours) * 60;
        
        return `UTC${sign}${padZero(hours)}:${padZero(minutes)}`;
    }
    
    // Add leading zero to single digit numbers
    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }
    
    // Toggle between 12/24 hour format
    formatToggleBtn.addEventListener('click', function() {
        is24Hour = !is24Hour;
        formatToggleBtn.textContent = is24Hour ? 'Switch to 12-Hour' : 'Switch to 24-Hour';
        updateClock();
    });
    
    // Change timezone
    timezoneSelect.addEventListener('change', function() {
        selectedTimezoneOffset = parseFloat(this.value);
        updateClock();
    });
    
    // Toggle dark/light mode
    modeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });
    
    // Set initial timezone value based on local timezone
    const browserTimezoneOffset = -(new Date().getTimezoneOffset() / 60);
    
    // Find closest option in select
    let closestOption;
    let minDiff = Number.MAX_VALUE;
    
    Array.from(timezoneSelect.options).forEach(option => {
        const optionValue = parseFloat(option.value);
        const diff = Math.abs(optionValue - browserTimezoneOffset);
        
        if (diff < minDiff) {
            minDiff = diff;
            closestOption = option;
        }
    });
    
    if (closestOption) {
        closestOption.selected = true;
        selectedTimezoneOffset = parseFloat(closestOption.value);
    }
    
    // Initialize clock
    updateClock();
    
    // Update clock every second
    setInterval(updateClock, 1000);
})