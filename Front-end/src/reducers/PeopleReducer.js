const initialState = {
    detailView: false,
    personSelected: null,
    email: 'test@test.ie',
    password: 'secret123',
    token: '',
    first_name: '',
    last_name: '',
    username: '',
    weight: '',
    height: '',
    D_O_B: '',
    gender: '',
    

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FETCH':
            return {
                ...state,
                people:action.payload,
            }
        case 'SELECTED_PERSON':
            return {
                ...state,
                detailView: true,
                personSelected: action.selectId
            }

        case 'NONE_SELECTED':
            return {
                ...state,
                detailView: false,
                personSelected: null
        }

        case 'FORM_UPDATE':
            return {
                ...state,
                [action.payload.prop]: action.payload.value
        }
         case 'NEW_CONTACT':
            return {
                ...state,
                email: '',
                password: '', 
            }
        
        case "ADD_PERSON":
            return {
                ...state,
                ...action.newPerson
        }

        case "USER_LOGGED_IN":
            return {
              ...state,
              token: action.payload.token,
              email: action.payload.email,
              _id: action.payload._id,
              password: "",
              error: "",
              isLoading: false
            }
        
        default:
            return state;
    }
}