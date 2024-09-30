async function apiCall() {

    const response = await fetch('/api/purchase')
    const data = await response.json()

    let arr = []
    for(i of data){
        arr.push(i.product.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '))
    }

    arr = [...new Set(arr)]
    console.log(arr)

    const select = document.querySelector('select')
    const option = []

    for(a of arr){
        const product = document.createElement('option')
        product.innerHTML = a 
        option.push(product)
    }
    select.append(...option)
}
apiCall();

async function loadTableData() {

    const tbody = document.querySelector('tbody')
    
    tbody.innerHTML = '';
    
    fetch('/api/sales').then(res=>{
        if(!res.ok) throw new Error('api Error')
            return res.json()
    }).then(data =>{
        console.log(data);
        data.forEach((v,i)=>{
            tbody.innerHTML += `<tr id="row-${v.id}">
                                    <td>${i+1}</td>
                                    <td>${v.id}</td>
                                    <td class="text-capitalize">${v.product}</td>
                                    <td>${v.quantity}</td>
                                    <td>${v.amount}</td>
                                    <td>${v.total}</td>
                                    <td class="d-flex justify-content-center gap-2">
                                        <button class="btn btn-sm btn-success" onclick="editdata(${v.id},'${v.product}','${v.quantity}','${v.amount}')">Edit</button>
                                        <button class="btn btn-sm btn-danger" onclick="deletedata(${v.id})">Delete</button>
                                    </td>
                                </tr>`
        })
    })
    
}
loadTableData();

function validateInputs(...inputs) {
    let isValid = true;

    inputs.forEach(input => {
        if (input.value === '' || input.value==='Select Product Name') {
            input.classList.add('empty');
            isValid = false;
        } else {
            input.classList.remove('empty');
        }
    });

    return isValid;
}


function removeEmptyClass(...inputs) {
    inputs.forEach(input => {
        input.classList.remove('empty');
    });
}


async function postdata() {
    const productInput = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const amountInput = document.getElementById('amount');

    const product = productInput.value;
    const quantity = quantityInput.value;
    const amount = amountInput.value;

    const total = quantity * amount;

    if (!validateInputs(productInput, quantityInput, amountInput)) {
        console.log("Form is invalid. Fill all required fields.");
        return;
    }

    try {
        const res = await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: product,
                quantity: quantity,
                amount: amount
            })
        });

        const res_data = await res.json();
        console.log("Sales added:", res_data);

        const tbody = document.querySelector('tbody');
        const newRow = `
            <tr id="row-${res_data.insertId}">
                <td>${document.querySelectorAll('tbody tr').length + 1}</td>
                <td>${res_data.insertId}</td>
                <td class="text-capitalize">${product}</td>
                <td>${quantity}</td>
                <td>${parseFloat(amount).toFixed(2)}</td>
                <td>${parseFloat(total).toFixed(2)}</td>
                <td class="d-flex justify-content-center gap-2">
                    <button class="btn btn-sm btn-success" onclick="editdata(${res_data.insertId},'${product}','${quantity}','${amount}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deletedata(${res_data.insertId})">Delete</button>
                </td>
            </tr>`;
        tbody.insertAdjacentHTML('beforeend', newRow);

        resetForm();
        removeEmptyClass(productInput, quantityInput, amountInput);

    } catch (error) {
        console.log("Error submitting sales data:", error.message);
    }
}



let editMode = false;
let currentsalesId = null; 

function editdata(id,product,quantity,amount) {


    console.log(id,product,quantity,amount);

    document.getElementById('product').value = product;
    document.getElementById('quantity').value = quantity;
    document.getElementById('amount').value = amount;


    editMode = true;
    currentsalesId = id;

    const submitButton = document.querySelector('.submit');
    submitButton.textContent = 'Update';
    submitButton.onclick = updatedata;
}

async function deletedata(id) {
    try {
        const res = await fetch(`/api/sales/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to delete product with ID ${id}`);
        }

        const res_data = await res.json();
        console.log("Deleted sales:", res_data);

        const row = document.querySelector(`#row-${id}`);
        row.remove();

        updateRowNumbers();
    } catch (error) {
        console.error("Error deleting sales:", error.message);
    }
}

function updateRowNumbers() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.children[0].textContent = index + 1; 
    });
}

async function updatedata() {
    const productInput = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const amountInput = document.getElementById('amount');

    const product = productInput.value;
    const quantity = quantityInput.value;
    const amount = amountInput.value;

    const total = quantity * amount;

    if (!validateInputs(productInput, quantityInput, amountInput)) {
        console.log("Form is invalid. Fill all required fields.");
        return;
    }

    try {
        const res = await fetch(`/api/sales`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: currentsalesId,
                product: product,
                quantity: quantity,
                amount: amount,
                total: total
            })
        });

        const res_data = await res.json();
        console.log("Updated sale:", res_data);

        const row = document.querySelector(`#row-${currentsalesId}`);
        if (!row) {
            throw new Error(`Row with ID ${currentsalesId} not found`);
        }

        row.innerHTML = `
            <td>${Array.from(row.parentNode.children).indexOf(row) + 1}</td>
            <td>${currentsalesId}</td>
            <td>${product}</td>
            <td>${quantity}</td>
            <td>${parseFloat(amount).toFixed(2)}</td>
            <td>${parseFloat(total).toFixed(2)}</td>
            <td class="d-flex justify-content-center gap-2">
                <button class="btn btn-sm btn-success" onclick="editdata(${currentsalesId},'${product}','${quantity}','${amount}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deletedata(${currentsalesId})">Delete</button>
            </td>
        `;

        resetForm();
        removeEmptyClass(productInput, quantityInput, amountInput);

    } catch (error) {
        console.error("Error updating sale:", error.message);
    }
}



function resetForm() {

    const productInput = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const amountInput = document.getElementById('amount');

    productInput.value='Select Product Name';
    quantityInput.value='';
    amountInput.value='';

    const submitButton = document.querySelector('.submit');
    submitButton.textContent = 'Submit';
    submitButton.onclick = postdata; 

    editMode = false;
    currentsalesId = null;

    removeEmptyClass(productInput, quantityInput, amountInput);
}




