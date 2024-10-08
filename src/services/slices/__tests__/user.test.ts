import userReducer, {
  setIsAuthChecked,
  setUser,
  registerThunk,
  loginThunk,
  logoutThunk,
  updateUserThunk,
  getUserOrdersThunk,
  initialState
} from '../userSlice';

describe('тесты для userSlice', () => {
  const testRegisterData = {
    email: 'fl_n@bk.ru',
    name: 'meow meo',
    password: 'Kulakovka88'
  };

  const testUser = {
    email: 'fl_n@bk.ru',
    name: 'meow meo'
  };

  it('проверка setIsAuthChecked', () => {
    const actualState = userReducer(initialState, setIsAuthChecked(true));
    expect(actualState).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('проверка setUser', () => {
    const actualState = userReducer(initialState, setUser(testUser));
    expect(actualState).toEqual({
      ...initialState,
      user: testUser
    });
  });

  it('проверка состояния при запросе registerThunk (pending)', () => {
    const actualState = userReducer(
      { ...initialState, error: 'Test error' },
      registerThunk.pending('requestId', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: null
    });
  });

  it('проверка состояния при запросе registerThunk (pending)', () => {
    const actualState = userReducer(
      { ...initialState, error: 'Test error' },
      registerThunk.pending('requestId', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: null
    });
  });

  it('проверка состояния при ошибке registerThunk (rejected)', () => {
    const action = registerThunk.rejected(
      new Error('testError'),
      'requestId',
      testRegisterData
    );
    const actualState = userReducer(
      { ...initialState, isAuthChecked: false },
      action
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: 'testError'
    });
  });

  it('проверка состояния при запросе loginThunk (pending)', () => {
    const actualState = userReducer(
      { ...initialState, error: 'Test error' },
      loginThunk.pending('requestId', {
        email: 'fl_n@bk.ru',
        password: 'Kulakovka88'
      })
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: null
    });
  });

  it('проверка состояния при ошибке loginThunk (rejected)', () => {
    const actualState = userReducer(
      { ...initialState, isAuthChecked: false },
      loginThunk.rejected(new Error('testError'), 'requestId', {
        email: 'fl_n@bk.ru',
        password: 'Kulakovka88'
      })
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: 'testError'
    });
  });

  it('проверка состояния при успешном выполнении loginThunk (fulfilled)', () => {
    const actualState = userReducer(
      { ...initialState, isAuthChecked: false },
      loginThunk.fulfilled(testUser, 'requestId', {
        email: 'fl_n@bk.ru',
        password: 'Kulakovka88'
      })
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: testUser,
      error: null
    });
  });

  it('проверка состояния при запросе updateUserThunk (pending)', () => {
    const actualState = userReducer(
      {
        ...initialState,
        isAuthChecked: true,
        user: testUser,
        error: 'Test error'
      },
      updateUserThunk.pending('requestId', {
        email: 'fl_n@bk.ru',
        name: 'meow meo'
      })
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: testUser,
      error: null
    });
  });

  it('проверка состояния при ошибке updateUserThunk (rejected)', () => {
    const actualState = userReducer(
      {
        ...initialState,
        isAuthChecked: true,
        user: testUser
      },
      updateUserThunk.rejected(new Error('testError'), 'requestId', {
        email: 'fl_n@bk.ru',
        name: 'meow meo'
      })
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: testUser,
      error: 'testError'
    });
  });

  it('проверка состояния при запросе logoutThunk (pending)', () => {
    const actualState = userReducer(
      {
        ...initialState,
        isAuthChecked: true,
        user: testUser,
        error: 'Test error'
      },
      logoutThunk.pending('requestId')
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: testUser,
      error: null
    });
  });

  it('проверка состояния при успешном выполнении logoutThunk (fulfilled)', () => {
    const actualState = userReducer(
      {
        ...initialState,
        isAuthChecked: true,
        user: testUser
      },
      logoutThunk.fulfilled(undefined, 'requestId')
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: null,
      error: null
    });
  });
});
