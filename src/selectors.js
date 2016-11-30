import { createSelector } from 'reselect';

export const pagination = ({ pagination }) => pagination;

export const getPage = (name, id) => createSelector(
    pagination,
    ({ [name]: { [id]: page } = {} }) => page
);