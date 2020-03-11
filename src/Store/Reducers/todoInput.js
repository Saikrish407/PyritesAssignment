

import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {

    TodoInput: [],
    input: '',
    TodoInputEdit: null,
    editable: false,
    RemoveAllError: null,
    SameInputTextError: false,
    InputEmptyError: false

}

const handleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.HANDLE_TODO_INPUT_ON_SUBMIT: {
            if (state.editable) {
                state.TodoInput[state.TodoInputEdit] = state.input
                return {
                    ...state,
                    TodoInputEdit: null,
                    input: '',
                    editable: false,
                    RemoveAllError: null,
                }
            } else if (state.TodoInput.indexOf(state.input) > -1) {
                return {
                    ...state,
                    SameInputTextError: true,
                    InputEmptyError: false
                }
            } else if (state.input === '') {
                return {
                    ...state,
                    InputEmptyError: true,
                    RemoveAllError: null,
                }
            } else if (state.input) {
                return {
                    ...state,
                    TodoInput: state.TodoInput.concat(state.input),
                    TodoInputEdit: null,
                    input: '',
                    editable: false,
                    RemoveAllError: null,

                }
            }
        } break;
        case ActionTypes.HANDLE_TODO_INPUT_ONCHANGE: {
            return {
                ...state,
                input: action.payload

            }
        }
        case ActionTypes.HANDLE_TODO_INPUT_REMOVE_ALL: {

            return {
                ...state,
                TodoInput: [],
                RemoveAllError: true,
                SameInputTextError: false,
                input: '',
                InputEmptyError: false

            }
        }
        case ActionTypes.HANDLE_REMOVE_TODO_OUTPUT_TEXT: {
            return {
                ...state,
                TodoInput: state.TodoInput.filter((val, ind) => ind !== action.payload)
            }
        }
        case ActionTypes.HANDLE_EDIT_TODO_OUTPUT_TEXT: {
            return {
                ...state,
                input: action.payload,
                TodoInputEdit: action.payload1,
                editable: true

            }
        }
        default: return state
    }
}

export default handleReducer;