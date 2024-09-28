

async function loadTableData() {

    const tbody = document.querySelector('tbody')

    tbody.innerHTML = '';
    fetch('/api/product').then(res => {
        if (!res.ok) throw new Error('api Error')
        return res.json()
    }).then(data => {
        console.log(data);
        data.forEach((v, i) => {
            tbody.innerHTML += `<tr id="row-${v.id}">
                                    <td>${i + 1}</td>
                                    <td>${v.id}</td>
                                    <td class="text-capitalize">${v.name}</td>
                                    <td class="text-capitalize">${v.category}</td>
                                    <td class="text-capitalize">${v.brand}</td>
                                    <td class="d-flex justify-content-center gap-2">
                                        <button class="btn btn-sm btn-success" onclick="editdata(${v.id},'${v.name}','${v.category}','${v.brand}')">Edit</button>
                                        <button class="btn btn-sm btn-danger" onclick="deletedata(${v.id})">Delete</button>
                                    </td>
                                </tr>`
        })
    }).catch(err => {
        console.log(err.message)
    })

}

loadTableData()


function validateInputs(...inputs) {
    let isValid = true;

    inputs.forEach(input => {
        if (input.value === '') {
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
    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const brandInput = document.getElementById('brand');

    const name = nameInput.value;
    const category = categoryInput.value;
    const brand = brandInput.value;

    if (!validateInputs(nameInput, categoryInput, brandInput)) {
        console.log("Form is invalid. Fill all required fields.");
        return;
    }

    try {
        const res = await fetch('/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                category: category,
                brand: brand
            })
        });

        if (!res.ok) {
            throw new Error(`Failed to submit data: ${res.statusText}`);
        }

        const res_data = await res.json();
        console.log("Product added response data:", res_data);


        const newProductId = res_data.insertId;

        const tbody = document.querySelector('tbody');
        const newRow = `<tr id="row-${newProductId}">
                            <td>${document.querySelectorAll('tbody tr').length + 1}</td>
                            <td>${newProductId}</td>
                            <td class="text-capitalize">${name}</td>  
                            <td class="text-capitalize">${category}</td>  
                            <td class="text-capitalize">${brand}</td>  
                            <td class="d-flex justify-content-center gap-2">
                                <button class="btn btn-sm btn-success" onclick="editdata(${newProductId},'${name}','${category}','${brand}')">Edit</button>
                                <button class="btn btn-sm btn-danger" onclick="deletedata(${newProductId})">Delete</button>
                            </td>
                        </tr>`;
        tbody.insertAdjacentHTML('beforeend', newRow);

        resetForm();
        removeEmptyClass(nameInput, categoryInput, brandInput);

    } catch (error) {
        console.error("Error submitting data:", error.message);
    }

}



let editMode = false;
let currentProductId = null;

function editdata(id, name, category, brand) {

    document.getElementById('name').value = name;
    document.getElementById('category').value = category;
    document.getElementById('brand').value = brand;


    editMode = true;
    currentProductId = id;


    const submitButton = document.querySelector('.submit');
    submitButton.textContent = 'Update';


    submitButton.onclick = updatedata;
}


async function deletedata(id) {
    try {
        const res = await fetch(`/api/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to delete product with ID ${id}`);
        }

        const res_data = await res.json();
        console.log("Deleted product:", res_data);

        const row = document.querySelector(`#row-${id}`);
        row.remove();

        updateRowNumbers();
    } catch (error) {
        console.error("Error deleting product:", error.message);
    }
}

function updateRowNumbers() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.children[0].textContent = index + 1;
    });
}


async function updatedata() {
    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const brandInput = document.getElementById('brand');

    const name = nameInput.value;
    const category = categoryInput.value;
    const brand = brandInput.value;

    if (!validateInputs(nameInput, categoryInput, brandInput)) {
        console.log("Form is invalid. Fill all required fields.");
        return;
    }

    try {
        const res = await fetch(`/api/product`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: currentProductId,
                name: name,
                category: category,
                brand: brand
            })
        });

        const res_data = await res.json();
        console.log("Updated product:", res_data);

        const row = document.querySelector(`#row-${currentProductId}`);
        if (!row) {
            throw new Error(`Row with ID ${currentProductId} not found`);
        }

        row.innerHTML = `
                <td>${Array.from(row.parentNode.children).indexOf(row) + 1}</td>
                <td>${currentProductId}</td>
                <td class="text-capitalize">${name}</td>
                <td class="text-capitalize">${category}</td>
                <td class="text-capitalize">${brand}</td>
                <td class="d-flex justify-content-center gap-2">
                    <button class="btn btn-sm btn-success" onclick="editdata(${currentProductId}, '${name}', '${category}', '${brand}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deletedata(${currentProductId})">Delete</button>
                </td>
            `;

        resetForm();
        removeEmptyClass(nameInput, categoryInput, brandInput);
    } catch (error) {
        console.error("Error updating product:", error.message);
    }

}



function resetForm() {

    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const brandInput = document.getElementById('brand');

    nameInput.value = '';
    categoryInput.value = '';
    brandInput.value = '';

    const submitButton = document.querySelector('.submit');
    submitButton.textContent = 'Submit';
    submitButton.onclick = postdata;

    editMode = false;
    currentProductId = null;

    removeEmptyClass(nameInput, categoryInput, brandInput)
}




