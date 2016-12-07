import expect from 'expect'; // eslint-disable-line

import { INSERT_MODE } from './reducer';
import { getPage } from './selectors';

const state = {
  pagination: {
    siteArticles: {
      0: {
        isLoading: true,
        mode: INSERT_MODE.REPLACE,
        result: [0, 1, 2, 3]
      }
    }
  }
};

describe('Page Selector', () => {
  describe('getPage', () => {
    it('should return a page', () => {
      const result = getPage('siteArticles', 0)(state);
      const { pagination: { siteArticles } } = state;
      expect(result).toEqual(siteArticles[0]);
    });
    it('should fail gracefully', () => {
      const result = getPage()(state);
      expect(result).toBe(undefined);
    });
  });
});
