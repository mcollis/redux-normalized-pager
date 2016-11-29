import expect from 'expect';
import deepFreeze from 'deep-freeze';

import reducer, { INSERT_MODE } from './reducer';

const meta = { skip: 0, take: 10 }

describe('Pagination Reducer', () => {
    it('should return existing state by default', () => {
        expect(reducer()).toEqual({});
        expect(reducer({}, { type: 'TEST_PAGER', pager: {} })).toEqual({ })
    })
    it('should set isLoading with no result', () => {
        const result = reducer({}, {
            type: 'TEST_PAGER',
            pager: {
                name: 'articles',
                id: '0'
            }
        });
        expect(result).toEqual({
            articles: {
                '0': {
                    isLoading: true,
                    result: [],
                    mode: INSERT_MODE.REPLACE,
                    meta: {}
                }
            }
        });
    });
    it('should replace existing results', () => {
        const prevState = {
            'articles': {
                '0': {
                    isLoading: true,
                    meta,
                    mode: INSERT_MODE.REPLACE,
                    result: [0, 1, 2, 3]
                }
            }
        };
        deepFreeze(prevState);
        const result = reducer(prevState, {
            type: 'TEST_PAGER',
            result: [4, 5, 6, 7],
            pager: {
                name: 'articles',
                id: '0',
                mode: INSERT_MODE.REPLACE,
                meta
            }
        });
        expect(result).toEqual({
            articles: {
                '0': {
                    isLoading: false,
                    result: [4, 5, 6, 7],
                    mode: INSERT_MODE.REPLACE,
                    meta
                }
            }
        });
    });
    it('should insert new results to the end', () => {
        const prevState = {
            'articles': {
                '0': {
                    isLoading: true,
                    meta,
                    mode: INSERT_MODE.END,
                    result: [0, 1, 2, 3]
                }
            }
        };
        deepFreeze(prevState);
        const result = reducer(prevState, {
            type: 'TEST_PAGER',
            result: [4, 5, 6, 7],
            pager: {
                name: 'articles',
                id: '0',
                mode: INSERT_MODE.END,
                meta
            }
        });
        expect(result).toEqual({
            articles: {
                '0': {
                    isLoading: false,
                    result: [0, 1, 2, 3, 4, 5, 6, 7],
                    mode: INSERT_MODE.END,
                    meta
                }
            }
        });
    });
    it('should insert new results to the beginning', () => {
        const prevState = {
            'articles': {
                '0': {
                    isLoading: true,
                    meta,
                    mode: INSERT_MODE.START,
                    result: [0, 1, 2, 3]
                }
            }
        };
        deepFreeze(prevState);
        const result = reducer(prevState, {
            type: 'TEST_PAGER',
            result: [4, 5, 6, 7],
            pager: {
                name: 'articles',
                id: '0',
                mode: INSERT_MODE.START,
                meta
            }
        });
        expect(result).toEqual({
            articles: {
                '0': {
                    isLoading: false,
                    result: [4, 5, 6, 7, 0, 1, 2, 3],
                    mode: INSERT_MODE.START,
                    meta
                }
            }
        });
    });
});