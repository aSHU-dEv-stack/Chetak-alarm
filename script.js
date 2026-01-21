window.onload = function () {
    // 1. Set current time on load
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('start-time').value = `${hours}:${minutes}`;
};

function calculateAlarm() {
    // 2. Get Input Values
    const ttcHours = parseInt(document.getElementById('ttc-hours').value) || 0;
    const ttcMinutes = parseInt(document.getElementById('ttc-minutes').value) || 0;
    const startTimeInput = document.getElementById('start-time').value;

    if (!startTimeInput) {
        alert("Please ensure the start time is set.");
        return;
    }

    // 3. Create Date object for Start Time
    const [startHours, startMins] = startTimeInput.split(':').map(Number);
    const alarmDate = new Date();
    alarmDate.setHours(startHours);
    alarmDate.setMinutes(startMins);

    // 4. Add TTC to Start Time
    alarmDate.setHours(alarmDate.getHours() + ttcHours);
    alarmDate.setMinutes(alarmDate.getMinutes() + ttcMinutes);

    // 5. Format Output (12-hour format)
    let endHours = alarmDate.getHours();
    const endMinutes = String(alarmDate.getMinutes()).padStart(2, '0');
    const ampm = endHours >= 12 ? 'PM' : 'AM';

    endHours = endHours % 12;
    endHours = endHours ? endHours : 12;

    // 6. Display Result
    const resultDiv = document.getElementById('result');
    const alarmDisplay = document.getElementById('alarm-time');
    const dateNote = document.getElementById('date-note');

    resultDiv.classList.remove('hidden');
    // Use innerHTML to style AM/PM slightly smaller if desired, but plain text is fine
    alarmDisplay.innerText = `${endHours}:${endMinutes} ${ampm}`;

    // Check for tomorrow note
    const now = new Date();
    now.setHours(startHours, startMins);
    // Simple check: if the alarm date's day is different than "today's" day
    if (alarmDate.getDate() !== now.getDate()) {
        dateNote.innerText = "(This will be tomorrow)";
    } else {
        dateNote.innerText = "";
    }
}