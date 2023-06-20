import { createContext, useReducer } from "react"

const INITAL_STATE = {
    city: undefined,
    date: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    }

}

export const SearchContext = createContext(INITAL_STATE)

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITAL_STATE;
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITAL_STATE)

    return (
        <SearchContext.Provider value={{ city: state.city, date: state.date, options: state.options, dispatch }}>
            {children}
        </SearchContext.Provider>
    )

}