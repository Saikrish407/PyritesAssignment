
import * as ActionTypes from './ActionTypes';



export const handleTodoInputOnSubmit = () => ({

    type: ActionTypes.HANDLE_TODO_INPUT_ON_SUBMIT,


});

export const handleTodoInputOnChange = (eve) => ({

    type: ActionTypes.HANDLE_TODO_INPUT_ONCHANGE,
    payload: eve

});

export const handleTodoInputRemoveAll = () => ({

    type: ActionTypes.HANDLE_TODO_INPUT_REMOVE_ALL

})


export const handleRemoveTodoOutPutText = (ind) => ({

    type: ActionTypes.HANDLE_REMOVE_TODO_OUTPUT_TEXT,
    payload: ind

});

export const handleEditTodoOutputText = (val, ind) => ({

    type: ActionTypes.HANDLE_EDIT_TODO_OUTPUT_TEXT,
    payload: val,
    payload1: ind

})