async function buttonAddBankClient_Click() {
    let inputCardNumberField = document.getElementById("input-cardnumber-field");
    let inputMoneyField = document.getElementById("input-money-field");

    let cardNumber = inputCardNumberField.value.toString();
    let money = inputMoneyField.value.toString();

    if (cardNumber === "") {
        alert("Вы не ввели номер карты");
        return;
    }

    if (money === "") {
        alert("Вы не ввели деньги");
        return;
    }

    let bankClient = {
        cardNumber: cardNumber,
        money: money
    };

    await saveToServer(bankClient);

    inputCardNumberField.value = "";
    inputMoneyField.value = "";

    await loadFromServerAndShowBankClients();
}


async function buttonDeleteBankClient_Click(id) {
    await deleteOnServer(id);
    await loadFromServerAndShowBankClients();
}

function showBankClients(bankClients) {
    let tableBankClientsDiv = document.getElementById("table-bank-clients");

    let html = "";

    html += `<table class="table">`;
    html += `<thead>
        <tr>
            <th>ИД</th>
            <th>Номер карты</th>
            <th>Деньги</th>
            <th>Действие</th>
        </tr>
        </thead>`;
    html += `<tbody>`;

    bankClients.forEach((bankClient) => {
        html += `<tr>
                <td>${bankClient.id}</td>
                <td>${bankClient.cardNumber}</td>
                <td>${bankClient.money}</td>
                <td><button class="btn btn-danger" onclick="buttonDeleteBankClient_Click(${bankClient.id})">Удалить</button></td>
            </tr>`;
    });

    html += `</tbody>`;
    html += `</table>`;

    tableBankClientsDiv.innerHTML = html;
}

async function loadFromServerAndShowBankClients() {
    let response = await fetch("https://localhost:7270/BankClients");

    if (response.ok) {
        let bankClients = await response.json();
        showBankClients(bankClients);
    } else {
        // let error = await response.json()
        alert("Error receive clients");
    }
}

async function saveToServer(bankClient) {
    let response = await fetch("https://localhost:7270/BankClients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(bankClient)
    });
}

async function deleteOnServer(id) {
    let response = await fetch(`https://localhost:7270/BankClients/${id}`, {
        method: "DELETE"
    });
}

window.onload = loadFromServerAndShowBankClients