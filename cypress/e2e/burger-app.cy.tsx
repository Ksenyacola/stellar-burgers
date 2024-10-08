/// <reference types="cypress" />

describe('Burger Constructor Testing', () => {
  const bunPlaceholderText = 'Выберите булки';
  const fillingPlaceholderText = 'Выберите начинку';
  const bunCategoryTitle = 'Булки';
  const fillingCategoryTitle = 'Начинки';

  // Перехват запросов для загрузки фикстур перед тестами
  before(() => {
    // Перехват запроса для получения ингредиентов с сервера
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
  });

  // Авторизация пользователя перед каждым тестом
  beforeEach('User Authorization', () => {
    // Перехват запроса для получения данных пользователя
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    // Установка cookie и токенов для авторизации
    cy.setCookie('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');
  });

  // Очистка cookie и localStorage после каждого теста
  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  // Переход на главную страницу перед каждым тестом
  beforeEach('Open Main Page', () => {
    cy.visit('/');
  });

  describe('Testing ingredient addition to the constructor', () => {
    it('Adding a bun to the constructor', () => {
      cy.get('div').contains(bunPlaceholderText).should('exist');
      cy.get('h3')
        .contains(bunCategoryTitle)
        .next('ul')
        .contains('Добавить')
        .click();
      cy.get('div').contains(bunPlaceholderText).should('not.exist');
    });

    it('Adding fillings to the constructor', () => {
      cy.get('div').contains(fillingPlaceholderText).should('exist');
      cy.get('h3')
        .contains(fillingCategoryTitle)
        .next('ul')
        .contains('Добавить')
        .click();
      cy.get('div').contains(fillingPlaceholderText).should('not.exist');
    });

    it('Adding sauces to the constructor', () => {
      cy.get('div').contains(fillingPlaceholderText).should('exist');
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
      cy.get('div').contains(fillingPlaceholderText).should('not.exist');
    });
  });

  describe('Testing modal windows behavior', () => {
    // Открытие модального окна перед каждым тестом
    beforeEach('Open ingredient modal', () => {
      cy.contains('Говяжий метеорит (отбивная)').click();
    });

    it('Closing modal window by pressing Esc', () => {
      cy.contains('Детали ингредиента').should('exist');
      cy.get('body').type('{esc}');
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });

  describe('Testing burger assembly and order placement', () => {
    it('Assemble a burger and place an order', () => {
      cy.contains('meow meo').should('exist'); // Проверка отображения имени пользователя

      // Перехват запроса на создание заказа
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as('createOrder');

      // Добавление ингредиентов в конструктор
      cy.get('h3')
        .contains(bunCategoryTitle)
        .next('ul')
        .contains('Добавить')
        .click();
      cy.get('h3')
        .contains(fillingCategoryTitle)
        .next('ul')
        .contains('Добавить')
        .click();
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();

      // Нажатие на кнопку "Оформить заказ"
      cy.contains('Оформить заказ').click();

      // Ожидание успешного завершения запроса на создание заказа
      cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

      // Проверка отображения модального окна с номером заказа
      cy.contains('1').should('exist');

      // Закрытие модального окна
      cy.get('body').type('{esc}');

      // Проверка, что конструктор пуст после оформления заказа
      cy.get('div').contains(fillingPlaceholderText).should('exist');
      cy.get('div').contains(bunPlaceholderText).should('exist');
    });
  });
});
