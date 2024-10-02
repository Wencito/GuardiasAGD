document.addEventListener('DOMContentLoaded', function() {

    $('#exampleModalCenter').on('shown.bs.modal', function() {
        const horarioInput = document.getElementById('horario');

        const now = new Date();

        const minDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30);

        if (now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() >= 30)) {
            minDateTime.setHours(now.getHours());
            minDateTime.setMinutes(now.getMinutes());
        }

        const minYear = minDateTime.getFullYear();
        const minMonth = String(minDateTime.getMonth() + 1).padStart(2, '0');
        const minDay = String(minDateTime.getDate()).padStart(2, '0');
        const minHours = String(minDateTime.getHours()).padStart(2, '0');
        const minMinutes = String(minDateTime.getMinutes()).padStart(2, '0');
        const minValue = `${minYear}-${minMonth}-${minDay}T${minHours}:${minMinutes}`;

        horarioInput.setAttribute('min', minValue);
    });
});