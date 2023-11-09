type Bills = {
    value: number;
    quantity: number;
}

//Calculo do total de cada tipo de nota de acordo com o valor total do empréstimo:
const calculateLoanBills = (total: number, bills: number): Bills => {
    const count = Math.floor(total / bills);
    return { value: bills, quantity: count}
}

//Tratamento dos tipos de notas do empréstimo:
const handleLoanTypeValues = (loanAmount: number, typeValue: Array<number>) => {
    let auxValue: Bills[] = [];
    let amount = loanAmount;

    for (const bill of typeValue) {
        const value = calculateLoanBills(amount, bill);
        amount = amount % bill
        if (value.quantity !== 0) {
            auxValue.push(value);
        }
        if (amount === 0) {
            break;
        }
    }
    return auxValue;
}

//Sistema de conversão dos dados para retornar os dados necessários do empréstimo para o saque:
const loanValuesConverter = (loanAmount: number) => {

    const highestBills = [100, 50, 20, 10, 5];
    const lowestBills = [20, 10, 5];

    const loan_highest: Bills[] = handleLoanTypeValues(loanAmount, highestBills);
    const loan_lowest: Bills[] = handleLoanTypeValues(loanAmount, lowestBills);
    const middle_highest_value: Bills[] = handleLoanTypeValues(loanAmount / 2, highestBills);
    const middle_lowest_value: Bills[] = handleLoanTypeValues(loanAmount / 2, lowestBills);

    const loanData = {
        loan: loanAmount,
        loan_highest,
        loan_lowest,
        loan_middle: {
            middle_highest_value,
            middle_lowest_value
        },
    };

    console.log("LOAN DATA: ", loanData);
    console.log("MIDDLE DATA: ", loanData.loan_middle.middle_highest_value, loanData.loan_middle.middle_lowest_value);

    return loanData;
}

export default loanValuesConverter;