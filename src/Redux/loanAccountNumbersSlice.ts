// loanAccountNumbersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface LoanAccount {
    loanAccountNo: string;
    type: string;
}

const loanAccountNumbersSlice = createSlice({
    name: 'loanAccountNumbers',
    initialState: [] as LoanAccount[],
    reducers: {
        setLoanAccountNumbers: (state, action: PayloadAction<LoanAccount[]>) => {
            return action.payload;
        },
    },
});

export const { setLoanAccountNumbers } = loanAccountNumbersSlice.actions;
export default loanAccountNumbersSlice.reducer;
