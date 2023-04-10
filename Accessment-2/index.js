const table = document.getElementById('table');
let userid;

const tableHeaders = [{ id: 'Id' }, { name: 'NAME' }, { discription: 'DISCRIPTION' },
{ status: 'STATUS' }, { rate: 'RATE' },
{ balance: 'BALANCE' }, { deposit: 'DEPOSIT' }, { action: 'ACTION' }];

const tHead = table.createTHead();
const thRow = tHead.insertRow();
tableHeaders.forEach(Headers => {
    const td = thRow.insertCell();
    const value = Object.values(Headers)[0];
    td.appendChild(document.createTextNode(value));
});

let tBody = table.createTBody();

//Get Data
async function getUsers() {
    let response;
    try {
        response = await fetch(" http://localhost:3000/Users");
        const Users = await response.json();
        createTableBody(Users, tBody);
        console.log(Users);
    } catch (error) {
        console.error(error);
    }
    console.log(response);
}

//Post Data
function addData() {
    var name = document.getElementById('name').value;
    var discription = document.getElementById('discription').value;
    var status = document.getElementById('status').value;
    var rate = document.getElementById('rate').value;
    var balance = document.getElementById('balance').value;
    var deposit = document.getElementById('deposit').value;
    fetch(" http://localhost:3000/Users", {
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
            Blankform()
        )
}


function Blankform() {
    document.getElementById('name').value = null;
    document.getElementById('discription').value = null;
    document.getElementById('status').value = null;
    document.getElementById('rate').value = null;
    document.getElementById('balance').value = null;
    document.getElementById('deposit').value = null;
};

//Update Data
function editUsers(element) {
    let id = element.id;
    document.getElementById("name").value = element.name;
    document.getElementById("description").value = element.description;
    document.getElementById("status").value = element.status;
    document.getElementById("rate").value = element.rate;
    document.getElementById("balance").value = element.balance;
    document.getElementById("deposit").value = element.deposit;

    var updateButton = document.getElementById('data');
    updateButton.onclick = function update() {
        fetch(`http://localhost:3000/Users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                discription: discription,
                status: status,
                rate: rate,
                balance: balance,
                deposit: deposit

            }),
        })
        .then(
            getUsers(),
            Blankform()
        )
    }
}



var submitButton = document.getElementById('editUsers');
function editUsers(element) {
    let id = element.id
    document.getElementById('name').value = element.name;
    document.getElementById('discription').value = element.discription;
    document.getElementById('status').value = element.status;
    document.getElementById('rate').value = element.rate;
    document.getElementById('balance').value = element.balance;
    document.getElementById('deposit').value = element.deposit;

    submitButton.onclick = async function update() {
        const name = document.getElementById('name').value;
        console.log(name);
        const discription = document.getElementById('discription').value;
        const status = document.getElementById('status').value;
        const rate = document.getElementById('rate').value;
        const balance = document.getElementById('balance').value;
        const deposit = document.getElementById('deposit').value;
        fetch(` http://localhost:3000/Users/${id}`, {
            method: 'PUT',
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
        await getUsers(),
        await Blankform()

    }
}

//Delete Data
function deleteUsers(userid) {
    fetch(` http://localhost:3000/Users/${userid}`, {
        method: "DELETE",
    });
    getUsers();
}

//Name regex
function checkname() {
    const nameRegex = /^([a-zA-Z]$){3,25}/;
    const nameInput = document.getElementById('name').value;
    const AddUserBtn = document.getElementById("userbtn");
    const nameError = document.getElementById('name-error');
    if (!nameRegex.test(nameInput)) {
        AddUserBtn.disabled = true;
        nameError.style.display = 'block';
    } else {
        AddUserBtn.disabled = false;
        nameError.style.display = 'none';
    }
}

//discription Regex
function checkdiscription() {
    const discriptionRegex = /^[a-zA-Z''-'\s]{3,150}$/;
    const discriptionInput = document.getElementById('discription').value;
    const AddUserBtn = document.getElementById("userbtn");
    const discriptionError = document.getElementById('discription-error');
    if (!discriptionRegex.test(discriptionInput)) {
        AddUserBtn.disabled = true;
        discriptionError.style.display = 'block';
    } else {
        AddUserBtn.disabled = false;
        discriptionError.style.display = 'none';
    }
}

//Rate Regex
function checkrate() {
    const rateRegex = /^[0-9]{1,2}\.[0-9]{1,2}$/;
    const rateInput = document.getElementById('rate').value;
    const AddUserBtn = document.getElementById("userbtn");
    const rateError = document.getElementById('rate-error');
    if (!rateRegex.test(rateInput)) {
        AddUserBtn.disabled = true;
        rateError.style.display = 'block';
    } else {
        AddUserBtn.disabled = false;
        rateError.style.display = 'none';
    }
}

//Balance Regex
function checkbalance() {
    const balanceRegex = /^[0-9]+\.[0-9]+$/;
    const balanceInput = document.getElementById('balance').value;
    const AddUserBtn = document.getElementById("userbtn");
    const balanceError = document.getElementById('balance-error');
    if (!balanceRegex.test(balanceInput)) {
        AddUserBtn.disabled = true;
        balanceError.style.display = 'block';
    } else {
        AddUserBtn.disabled = false;
        balanceError.style.display = 'none';
    }
}

//Deposit Regex
function checkdeposit() {
    const depositRegex = /^[0-9]+\.[0-9]+$/;
    const depositInput = document.getElementById('deposit').value;
    const AddUserBtn = document.getElementById("userbtn");
    const depositError = document.getElementById('deposit-error');
    if (!depositRegex.test(depositInput)) {
        AddUserBtn.disabled = true;
        depositError.style.display = 'block';
    } else {
        AddUserBtn.disabled = false;
        depositError.style.display = 'none';
    }
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
                const editButton = document.createElement('button');
                editButton.innerText = 'Edit';
                editButton.onclick = () => editUsers(element)
                // editButton.onclick = () => editStudent(element, element.id);
                td.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.onclick = () => deleteUsers(element.id);
                td.appendChild(deleteButton);
            }
        })
    });
}

window.onload = (event) => {
    getUsers();
};



