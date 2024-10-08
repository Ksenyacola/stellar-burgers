import orderReducer, {
  createOrderThunk,
  fetchOrderByNumberThunk,
  resetOrderState,
  initialState
} from '../orderSlice';

describe('тесты для orderSlice', () => {
  const testOrder = {
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ]
  };

  const testOrderResponse = {
    _id: '6703d44113a2b7001c8f0814',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    createdAt: '2024-10-07T12:29:53.812Z',
    updatedAt: '2024-10-07T12:29:54.637Z',
    number: 55475,
    price: 3388
  };

  it('проверка состояния при запросе createOrderThunk (pending)', () => {
    const action = createOrderThunk.pending('requestId', testOrder.ingredients);
    const actualState = orderReducer(
      { ...initialState, error: 'testError' },
      action
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка состояния при ошибке createOrderThunk (rejected)', () => {
    const action = createOrderThunk.rejected(
      new Error('testError'),
      'requestId',
      testOrder.ingredients
    );
    const actualState = orderReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: 'testError'
    });
  });

  it('проверка состояния при успешном выполнении createOrderThunk (fulfilled)', () => {
    const action = createOrderThunk.fulfilled(
      testOrderResponse,
      'requestId',
      testOrder.ingredients
    );
    const actualState = orderReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      orderData: testOrderResponse
    });
  });

  it('проверка состояния при запросе fetchOrderByNumberThunk (pending)', () => {
    const action = fetchOrderByNumberThunk.pending('requestId', 44744);
    const actualState = orderReducer(
      { ...initialState, error: 'testError' },
      action
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка состояния при ошибке fetchOrderByNumberThunk (rejected)', () => {
    const action = fetchOrderByNumberThunk.rejected(
      new Error('testError'),
      'requestId',
      55475
    );
    const actualState = orderReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: 'testError'
    });
  });

  it('проверка состояния при успешном выполнении fetchOrderByNumberThunk (fulfilled)', () => {
    const action = fetchOrderByNumberThunk.fulfilled(
      testOrderResponse,
      'requestId',
      55475
    );
    const actualState = orderReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      orderData: testOrderResponse
    });
  });

  it('проверка состояния при сбросе состояния заказа resetOrderState', () => {
    const action = resetOrderState();
    const actualState = orderReducer(
      {
        ...initialState,
        orderData: testOrderResponse,
        isLoading: true,
        error: 'testError'
      },
      action
    );
    expect(actualState).toEqual(initialState);
  });
});
