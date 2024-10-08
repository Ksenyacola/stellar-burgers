import feedsSlice, {
  fetchFeeds,
  getOrderByNumber,
  initialState
} from '../feeedSlice';

describe('тесты загрузки ленты заказов', () => {
  it('проверка состояния при запросе данных (pending)', () => {
    const actualState = feedsSlice(
      { ...initialState, error: 'Test error' },
      fetchFeeds.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка состояния при ошибке получения данных (rejected)', () => {
    const actualState = feedsSlice(
      { ...initialState, isLoading: true },
      fetchFeeds.rejected(new Error('testError'), '')
    );
    expect(actualState).toEqual({ ...initialState, error: 'testError' });
  });

  it('проверка состояния при успешном получении данных (fulfilled)', () => {
    const testData = [
      {
        _id: '6703d44113a2b7001c8f0814',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        owner: '66fa4c13119d45001b50a6e6',
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-10-07T12:29:53.812Z',
        updatedAt: '2024-10-07T12:29:54.637Z',
        number: 55475,
        __v: 0
      }
    ];

    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: testData,
        total: 1,
        totalToday: 1
      }
    };
    const actualState = feedsSlice(
      { ...initialState, isLoading: true },
      action
    );

    expect(actualState.orders).toEqual(testData);
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.total).toBe(1);
    expect(actualState.totalToday).toBe(1);
  });
});

describe('тесты загрузки заказов по номеру', () => {
  it('проверка состояния при запросе данных (pending)', () => {
    const actualState = feedsSlice(
      { ...initialState, error: 'Test error' },
      getOrderByNumber.pending('0', 0, null)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка состояния при ошибке получения данных (rejected)', () => {
    const action = getOrderByNumber.rejected(
      new Error('testError'),
      'requestId',
      0
    );
    const actualState = feedsSlice(initialState, action);
    expect(actualState).toEqual({
      ...initialState,
      error: 'testError',
      isLoading: false,
      order: null,
      orders: [],
      total: 0
    });
  });

  it('проверка состояния при успешном получении данных (fulfilled)', () => {
    const testData = {
      _id: '6703d44113a2b7001c8f0814',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: '66fa4c13119d45001b50a6e6',
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-10-07T12:29:53.812Z',
      updatedAt: '2024-10-07T12:29:54.637Z',
      number: 55475,
      __v: 0
    };

    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [testData] }
    };
    const actualState = feedsSlice(
      { ...initialState, isLoading: true },
      action
    );

    expect(actualState.order).toEqual(testData);
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBeNull();
  });
});
