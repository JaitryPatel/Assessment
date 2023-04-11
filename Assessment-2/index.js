// Get table by ID
const table = document.getElementById('table');

// Create <thead>
const tHead = table.createTHead();

// Create <tr> in <thead>
const thRow = tHead.insertRow();

//Create <th>
const tableHeaders = [{ id: '#' }, { name: 'NAME' }, { discription: 'DISCRIPTION' }, { status: 'STATUS' }, { rate: 'RATE' },{ balance: 'BALANCE' }, { deposit: 'DEPOSIT'}, { action: 'ACTION' }];

tableHeaders.forEach(Headers => {
    const td = thRow.insertCell();
    const value = Object.values(Headers)[0];
    td.appendChild(document.createTextNode(value));
});

//Create <tbody>
let tBody = table.createTBody();

// Get submit Button by ID
var submitBtn = document.getElementById('pushBtn');

// Show data in table on page load
document.body.onload = getUsers();

//Get Data From Server (D.json)
async function getUsers() {
    let response;
    try {
        response = await fetch('http://localhost:3000/Users');
        const Identity = await response.json();
        createTableBody(Identity, tBody);
        console.log(Identity);
    } catch (error) {
        console.error(error);
    }
    console.log(response);
}

function createTableBody(Users) {
    table.removeChild(table.getElementsByTagName('tbody')[0]);
    tBody = table.createTBody();

    Users.forEach(element => {
        const tr = tBody.insertRow();

        tableHeaders.forEach(header => {
            const td = tr.insertCell();
            if (header.action !== 'ACTION') {
                const key = Object.keys(header)[0];
                td.appendChild(document.createTextNode(element[key]));
            } else {
                const editBtn = document.createElement('button');
                editBtn.innerText = 'Edit';
                editBtn.onclick = function () {editUsers(element)};
                td.appendChild(document.innerHTML = editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete';
                deleteBtn.onclick = function () {deleteUsers(element)};
                td.appendChild(document.innerHTML = deleteBtn);
            }
        })
    });
}


//Post Data - Add data to server (D.json)
function addData() {
    var name = document.getElementById('name').value;
    var discription = document.getElementById('discription').value;
    var status = document.getElementById('status').value;
    var rate = document.getElementById('rate').value;
    var balance = document.getElementById('balance').value;
    var deposit = document.getElementById('deposit').value;
    fetch('http://localhost:3000/Users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name, 
            discription: discription,
            status: status,
            rate: rate,
            balance: balance,
            deposit: deposit
        })
    })
    .then(
        getUsers(),
        formClear()
    )
}

//Update Data
var submitButton = document.getElementById('editUsers');
function editUsers(element) {

    document.getElementById('name').value = element.name;
    document.getElementById('discription').value = element.discription;
    document.getElementById('status').value = element.status;
    document.getElementById('rate').value = element.rate;
    document.getElementById('balance').value = element.balance;
    document.getElementById('deposit').value = element.deposit;

    let id = element.id

    submitBtn.onclick = async function () {
        const name = document.getElementById('name').value;
        const discription = document.getElementById('discription').value;
        const status = document.getElementById('status').value;
        const rate = document.getElementById('rate').value;
        const balance = document.getElementById('balance').value;
        const deposit = document.getElementById('deposit').value;
        fetch(`http://localhost:3000/Users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name, 
                discription: discription,
                status: status,
                rate:status,
                balance: balance,
                deposit: deposit
            })
        });
        await getUsers(),
        await formClear();
    }
}

//Delete Data
function deleteUsers(Identity) {
    let id = Identity.id;
    fetch(`http://localhost:3000/Users/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    getUsers();
}

// Reset form 
function formClear() {
    document.getElementById("name").value = null;
    document.getElementById("discription").value = null;
    document.getElementById("status").value = null;
    document.getElementById("rate").value = null;
    document.getElementById("balance").value = null;
    document.getElementById("deposit").value = null;
}

// //First Name regex
// const fnameInput = document.getElementById('fname')
// const fnameError = document.getElementById('fname-error')

// fnameInput.addEventListener('input', () => {
//     const fnameRegex = /[A-Z a-z]+/;

//     if (!fnameRegex.test(fnameInput.value)) {
//         fnameError.style.display = 'block';
//     } else {
//         fnameError.style.display = 'none';
//     }
// });

// //Last Name Regex
// const lnameInput = document.getElementById('lname')
// const lnameError = document.getElementById('lname-error')

// lnameInput.addEventListener('input', () => {
//     const lnameRegex = /[A-Z a-z]+/;

//     if (!lnameRegex.test(lnameInput.value)) {
//         lnameError.style.display = 'block';
//     } else {
//         lnameError.style.display = 'none';
//     }
// });

// //Contact No Regex
// const contactInput = document.getElementById('contact')
// const contactError = document.getElementById('contact-error')

// contactInput.addEventListener('input', () => {
//     const contactRegex = /[ 9 8 7 6 ][0-9]{9}/;

//     if (!contactRegex.test(contactInput.value)) {
//         contactError.style.display = 'block';
//     } else {
//         contactError.style.display = 'none';
//     }
// });

// //Email Regex
// const emailInput = document.getElementById('email')
// const emailError = document.getElementById('email-error')

// emailInput.addEventListener('input', () => {
//     const  emailRegex = /^[a-zA-Z0-9._%+-]+@1rivet.com$/;

//     if (! emailRegex.test( emailInput.value)) {
//         emailError.style.display = 'block';
//     } else {
//         emailError.style.display = 'none';
//     }
// });

// //Password Regex
// const passwordInput = document.getElementById('password')
// const passwordError = document.getElementById('password-error')

// passwordInput.addEventListener('input', () => {
//     const  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;

//     if (! passwordRegex.test( passwordInput.value)) {
//         passwordError.style.display = 'block';
//     } else {
//         passwordError.style.display = 'none';
//     }
// });