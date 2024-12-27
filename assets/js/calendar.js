const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const daysContainer = document.querySelector('.calendar-days');
        const monthPicker = document.getElementById('month-picker');
        const yearDisplay = document.getElementById('year');
        const prevYear = document.getElementById('prev-year');
        const nextYear = document.getElementById('next-year');
        const darkModeSwitch = document.querySelector('.dark-mode-switch');
        const body = document.body;

        let currentMonth;
        let currentYear;

        function setDeviceDateToCalendar() {
            const today = new Date();
            currentMonth = today.getMonth();
            currentYear = today.getFullYear();
            updateCalendar(today.getDate());
        }

        function generateCalendar(month, year, today = null) {
            daysContainer.innerHTML = "";
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) {
                daysContainer.innerHTML += `<div></div>`;
            }

            for (let day = 1; day <= daysInMonth; day++) {
                if (day === today) {
                    daysContainer.innerHTML += `<div class="highlight">${day}</div>`;
                } else {
                    daysContainer.innerHTML += `<div>${day}</div>`;
                }
            }
        }

        function updateCalendar(today = null) {
            monthPicker.textContent = monthNames[currentMonth];
            yearDisplay.textContent = currentYear;
            generateCalendar(currentMonth, currentYear, today);
        }

        monthPicker.addEventListener('click', () => {
            currentMonth = (currentMonth + 1) % 12;
            if (currentMonth === 0) currentYear++;
            updateCalendar();
        });

        prevYear.addEventListener('click', () => {
            currentYear--;
            updateCalendar();
        });

        nextYear.addEventListener('click', () => {
            currentYear++;
            updateCalendar();
        });

        darkModeSwitch.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
        });

        setDeviceDateToCalendar();