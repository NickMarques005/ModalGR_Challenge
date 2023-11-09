const loanForm = document.getElementById("loan_form");
const resultDiv = document.getElementById("result");
const resultContentContainer = document.querySelector(".result_content_container");
const highestValueButton = document.getElementById("highest_value_button");
const lowestValueButton = document.getElementById("lowest_value_button");
const middleValueButton = document.getElementById("middle_value_button");

//Event Listener do botão Submit:
loanForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("SUBMIT!");
    const name = document.getElementById("name").value;
    const hireDate = document.getElementById("hireDate").value;
    const salary = document.getElementById("salary").value;
    const loanAmount = document.getElementById("loanAmount").value;

    console.log(`Dados do colaborador: \n${name}\n${hireDate}\n${salary}\n${loanAmount}`)


    if (name && hireDate && salary && loanAmount) {
        const collaboratorData = {
            name,
            hireDate,
            salary,
            loanAmount
        }
        //Solicitação Fetch para buscar a verificação dos dados do colaborador e receber os dados atualizados do empréstimo:
        try {
            const response = await fetch("http://localhost:1000/api/checkCollaboratorData", {
                method: "POST",
                body: JSON.stringify(collaboratorData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log("DATA: ", data);

            if(!data.success){
                alert(data.message);
            }

            handleFetchResponse(data);
        }
        catch (err) {
            console.error("Houve um erro: ", err);
        }

    }

});

//Formatação do tipo de notas do empréstimo:
const formatLoanType = (loanType) => {
    const loanTypeString = loanType.map((bill) => {
        return `${bill.quantity} x ${bill.value} reais`;
    }).join(' | ');

    console.log("TYPE FORMATTED: ", loanTypeString);

    return loanTypeString;
}

//Formatação dos dados do empréstimo para o devido tratamento:
const formatLoanData = (loanData) => {
    console.log("LOAN TO FORMAT: ", loanData);
    const formattedData = {
        loan: `${loanData.loan} reais`,
        loan_highest: formatLoanType(loanData.loan_highest),
        loan_lowest: formatLoanType(loanData.loan_lowest),
        loan_middle_highest: formatLoanType(loanData.loan_middle.middle_highest_value),
        loan_middle_lowest: formatLoanType(loanData.loan_middle.middle_lowest_value)
    };

    return formattedData;
}

//Tratameno dos dados do empréstimo na interface:
const handleLoanData = (loanData) => {
    if (!loanData) {
        console.log("Houve algum erro");
        return;
    }

    let loanCollaborator = document.getElementById("specific_loan");
    const formattedLoanData = formatLoanData(loanData);
    loanCollaborator.textContent = formattedLoanData.loan;

    if (loanData.loan_highest.length === 0 || loanData.loan_lowest.length === 0 || loanData.loan_middle.length === 0) {
        console.log("Empréstimo 0");
    }

    let loanHighest = document.getElementById("type_highest");
    let loanLowest = document.getElementById("type_lowest");
    let loanMiddle = document.getElementById("type_middle");

    loanHighest.textContent = formattedLoanData.loan_highest;
    loanLowest.textContent = formattedLoanData.loan_lowest;
    loanMiddle.textContent = `${loanData.loan / 2} reais com notas de maior valor: ${formattedLoanData.loan_middle_highest} ||| ${loanData.loan / 2} reais com notas de menor valor: ${formattedLoanData.loan_middle_lowest} `
}

const handleFetchResponse = (response) => {
    if (response.success) {
        resultContentContainer.classList.add('active');
        console.log("SUCCESS: ", response);
        handleLoanData(response.data);
    }
    else {
        if (resultContentContainer.classList.contains('active')) {
            resultContentContainer.classList.remove('active');
        }
        alert(`${data.message}`);
    }
}

//Event Listeners dos botões de sacar o empréstimos de acordo com o tipo de notas:

//Notas de maior valor:
highestValueButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Highest Value Button");
    let loanCollaborator = document.getElementById("specific_loan").textContent;
    let loanHighest = document.getElementById("type_highest").textContent; 
    let loanLowest = document.getElementById("type_lowest").textContent;
    let loanMiddle = document.getElementById("type_middle").textContent;

    const values = {
        loanCollaborator,
        loanHighest,
        loanLowest,
        loanMiddle
    }

    if(loanHighest !== "")
    {
        alert(`Sacar empréstimo ${loanCollaborator} através de notas de maior valor: ${loanHighest}`)
        resetValues(values);
    }
    else{
        console.log("Algo deu errado...");
        resetValues(values);
    }
});

//Notas de menor valor:
lowestValueButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("lowest Value Button");
    let loanCollaborator = document.getElementById("specific_loan").textContent;
    let loanHighest = document.getElementById("type_highest").textContent; 
    let loanLowest = document.getElementById("type_lowest").textContent;
    let loanMiddle = document.getElementById("type_middle").textContent;

    const values = {
        loanCollaborator,
        loanHighest,
        loanLowest,
        loanMiddle
    }

    if(loanLowest !== "")
    {
        alert(`Sacar empréstimo ${loanCollaborator} através de notas de menor valor: ${loanLowest}`)
        resetValues(values);
    }
    else{
        console.log("Algo deu errado...");
        resetValues(values);
    }

});

//Notas meio a meio:
middleValueButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Middle Value Button");
    let loanCollaborator = document.getElementById("specific_loan").textContent;
    let loanHighest = document.getElementById("type_highest").textContent; 
    let loanLowest = document.getElementById("type_lowest").textContent;
    let loanMiddle = document.getElementById("type_middle").textContent;

    const values = {
        loanCollaborator,
        loanHighest,
        loanLowest,
        loanMiddle
    }

    if(loanMiddle !== "")
    {
        alert(`Sacar empréstimo ${loanCollaborator} através de notas meio a meio: ${loanMiddle}`)
        resetValues(values);
    }
    else{
        console.log("Algo deu errado...");
        resetValues(values);
    }

});

//Função para resetar os valores do sistema:
const resetValues = (valuesData) => {
    for(const value in valuesData){
        valuesData[value] = "";
    }
    resultContentContainer.classList.remove('active');
}

