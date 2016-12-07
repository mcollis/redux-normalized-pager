
export const INSERT_MODE = {
  REPLACE: 'REPLACE',
  START: 'START',
  END: 'END'
};

const reducer = (state = {}, { pager, result } = {}) => {
  if (pager) {
    const { name, id, meta = {}, mode = INSERT_MODE.REPLACE } = pager;
    if (name !== undefined && id !== undefined) {
      const { [name]: existingName = {} } = state;
      const { [id]: existingPage = {} } = existingName;
      let { result: existingResult = [] } = existingPage;
      let isLoading = true;
      if (result) {
        isLoading = false;
        switch (mode) {
          case INSERT_MODE.REPLACE:
          default:
            existingResult = result;
            break;
          case INSERT_MODE.START:
            existingResult = [...result, ...existingResult];
            break;
          case INSERT_MODE.END:
            existingResult = [...existingResult, ...result];
            break;
        }
      }
      const page = { ...existingPage, mode, meta, isLoading, result: existingResult };
      return { ...state, [name]: { [id]: page } };
    }
  }
  return state;
};

export default reducer;
