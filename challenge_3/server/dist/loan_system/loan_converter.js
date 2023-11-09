const calculateLoanBills = (total, bills) => {
    const count = Math.floor(total / bills);
    return { value: bills, quantity: count };
};
const handleLoanTypeValues = (loanAmount, typeValue) => {
    let auxValue = [];
    let amount = loanAmount;
    for (const bill of typeValue) {
        const value = calculateLoanBills(amount, bill);
        amount = amount % bill;
        if (value.quantity !== 0) {
            auxValue.push(value);
        }
        if (amount === 0) {
            break;
        }
    }
    return auxValue;
};
const loanValuesConverter = (loanAmount) => {
    const highestBills = [100, 50, 20, 10, 5];
    const lowestBills = [20, 10, 5];
    const loan_highest = handleLoanTypeValues(loanAmount, highestBills);
    const loan_lowest = handleLoanTypeValues(loanAmount, lowestBills);
    const middle_highest_value = handleLoanTypeValues(loanAmount / 2, highestBills);
    const middle_lowest_value = handleLoanTypeValues(loanAmount / 2, lowestBills);
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
};
export default loanValuesConverter;
//# sourceMappingURL=loan_converter.js.map