import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface GeneralState {
    showFilter: boolean
}

export const generalInitalState: GeneralState = {
    showFilter: false
}

const _generalReducer = createReducer(generalInitalState, 
    on(actions.launchFilters, (state, { visible}) => ({
        ...state,
        showFilter: visible
    }))    
); 

export function generalReducer(state: any, action: any) {
    return _generalReducer(state, action);
}