import { createSelector } from 'reselect';

export const pagination = ({ pagination: output }) => output;

export const getPage = (name, id) => createSelector(
    pagination,
    ({ [name]: { [id]: page } = {} }) => page
);
