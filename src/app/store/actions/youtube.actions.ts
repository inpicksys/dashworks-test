import { createAction, props } from '@ngrx/store';

export const getYouTubeList = createAction('[Youtube] GET_VIDEO_LIST');
export const getYouTubeListSuccess = createAction('[Youtube] GET_VIDEO_LIST_SUCCESS', props<{ payload: string }>());
export const getYouTubeListFailed = createAction('[Youtube] GET_VIDEO_LIST_FAILED', props<{ error: string }>());

export const getVideo = createAction('[VIDEO] GET_VIDEO', props<{ id: string }>());
export const getVideoSuccess = createAction('[VIDEO] GET_VIDEO_SUCCESS', props<{ id: string }>());
export const getVideoFailed = createAction('[VIDEO] GET_VIDEO_FAILED', props<{ error: string }>());
