import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from '../constructorSlice';

const mockConstructorState = {
  bun: null,
  mains: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      id: '1'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0,
      id: '2'
    }
  ],
  sauce: [],
  selectedBun: null,
  ingredients: []
};

const newIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  id: '3'
};

const newBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

describe('тесты для burgerConstructorSlice', () => {
  it('проверка добавления ингредиента addIngredient', () => {
    const actualState = burgerConstructorSlice.reducer(
      mockConstructorState,
      addIngredient(newIngredient)
    );
    expect(actualState.mains).toHaveLength(3);
    expect(actualState.mains[2]._id).toBe('643d69a5c3f7b9001cfa0942');
  });

  it('проверка добавления булочки addIngredient', () => {
    const actualState = burgerConstructorSlice.reducer(
      mockConstructorState,
      addIngredient(newBun)
    );
    if (actualState.bun) {
      expect(actualState.bun._id).toBe('643d69a5c3f7b9001cfa093c');
    } else {
      throw new Error('Булочка не добавлена');
    }
  });

  it('проверка удаления ингредиента removeIngredient', () => {
    const actualState = burgerConstructorSlice.reducer(
      mockConstructorState,
      removeIngredient('2')
    );
    expect(actualState.mains).toHaveLength(1);
    expect(actualState.mains[0]._id).toBe('643d69a5c3f7b9001cfa0941');
  });

  it('проверка перемещения ингредиента moveIngredient', () => {
    const actualState = burgerConstructorSlice.reducer(
      mockConstructorState,
      moveIngredient({ fromIngredient: 0, toIngredient: 1 })
    );
    expect(actualState.mains[0]._id).toBe('643d69a5c3f7b9001cfa093e');
    expect(actualState.mains[1]._id).toBe('643d69a5c3f7b9001cfa0941');
  });

  it('проверка очистки конструктора resetConstructor', () => {
    const actualState = burgerConstructorSlice.reducer(
      mockConstructorState,
      resetConstructor()
    );
    expect(actualState.mains).toHaveLength(0);
    expect(actualState.bun).toBeNull();
    expect(actualState.sauce).toHaveLength(0);
  });
});
