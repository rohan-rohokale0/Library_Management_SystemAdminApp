export const setCivilIdAction = (civilId: any) => ({
    type: 'SET_CIVIL_ID',
    payload: civilId,
});

export const setUserNameAction = (userName: string) => ({
    type: 'SET_USER_NAME',
    payload: userName,
});

export const setLoanAccountNumbersAction = (loanAccountNumbers: string[]) => ({
    type: 'SET_LOAN_ACCOUNT_NUMBERS',
    payload: loanAccountNumbers,
});

export const setEmailAction = (email: any) => ({
    type: 'SET_EMAIL',
    payload: email,
});

export const setMobileNoAction = (phoneNo: any) => ({
    type: 'SET_MOBILE_NO',
    payload: phoneNo,
});
