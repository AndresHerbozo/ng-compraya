import { createAction, props } from '@ngrx/store';

export const launchFilters = createAction(
    '[Filters] Show Filters',
    props<{ visible: boolean }>()
);