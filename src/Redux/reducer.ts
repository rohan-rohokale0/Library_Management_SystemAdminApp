export interface RootState {
  civilId: string | null;
  loanAccountNumbers: string[];
  email: string | null;
  phoneNo: string | null;
  userName: string | null;
}

const initialState: RootState = {
  civilId: null,
  loanAccountNumbers: [],
  email: null,
  phoneNo: null,
  userName: null,
};

const rootReducer = (state: RootState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CIVIL_ID':
      return {
        ...state,
        civilId: action.payload,
      };
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload,
      };
    case 'SET_LOAN_ACCOUNT_NUMBERS':
      return {
        ...state,
        loanAccountNumbers: action.payload,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_MOBILE_NO':
      return {
        ...state,
        phoneNo: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;  