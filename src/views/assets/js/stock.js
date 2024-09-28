async function loadTableData() {

    const tbody = document.querySelector('tbody');
    
    tbody.innerHTML = '';
    
    fetch('/api/stock').then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
    }).then(data => {
        console.log(data);
        let Sno = 1;
        data.forEach((v) => {
            if (v.stock > 0) {
                tbody.innerHTML += `<tr>
                                        <td>${Sno}</td>
                                        <td>${v.product}</td>
                                        <td>${v.stock}</td>
                                    </tr>`;
                Sno++
            }
        });
    }).catch(error => {
        console.error("Error loading stock data:", error);
    });
}

loadTableData()
