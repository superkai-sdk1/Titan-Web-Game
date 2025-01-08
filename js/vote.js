document.addEventListener('DOMContentLoaded', function() {
    const tbody = document.getElementById('vote-tbody');
    const saveRow = document.getElementById('save_day');

    // Генерация 10 строк (0-9)
    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        tr.id = `vt_${i}`;
        tr.className = 'voute_line';
        tr.dataset.act = '0';
        tr.dataset.line = i.toString();

        // Создание ячейки для процента голосования
        const tdVote = document.createElement('td');
        tdVote.id = `vv_${i}`;
        tdVote.className = 'voute_p';
        tdVote.dataset.delta = i.toString();
        tr.appendChild(tdVote);

        // Создание кнопок для голосования (1-6+)
        for (let j = 0; j < 6; j++) {
            const tdButton = document.createElement('td');
            tdButton.className = 'vote_butt';
            tdButton.dataset.line = i.toString();
            tdButton.dataset.pos = j.toString();
            tdButton.textContent = j === 5 ? '6+' : (j + 1).toString();
            tr.appendChild(tdButton);
        }

        // Вставка новой строки перед строкой с кнопкой сохранения
        tbody.insertBefore(tr, saveRow);
    }
});