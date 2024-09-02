import { createStore } from "redux";


const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state, user: action.data
            }
            break;

            case "product":
                return {
                    ...state, products: action.data
                }
            break;
    }
}

const store = createStore(reducer);
export default store;