import { ADD_ITEM, REMOVE_ITEM } from './types';

export const addItem = item => ({
  type: ADD_ITEM,
  payload: item
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  payload: id
});