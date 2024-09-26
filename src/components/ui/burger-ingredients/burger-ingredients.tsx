import React, { FC } from 'react';
import { TIngredient } from '@utils-types';

// Описание пропсов для компонента
type BurgerIngredientsUIProps = {
  currentTab: 'bun' | 'main' | 'sauce';
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  titleBunRef: React.RefObject<HTMLHeadingElement>;
  titleMainRef: React.RefObject<HTMLHeadingElement>;
  titleSaucesRef: React.RefObject<HTMLHeadingElement>;
  bunsRef: (node?: Element | null) => void;
  mainsRef: (node?: Element | null) => void;
  saucesRef: (node?: Element | null) => void;
  onTabClick: (val: 'bun' | 'main' | 'sauce') => void;
};

// Переименуйте компонент в BurgerIngredientsUI
export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = ({
  currentTab,
  buns,
  mains,
  sauces,
  titleBunRef,
  titleMainRef,
  titleSaucesRef,
  bunsRef,
  mainsRef,
  saucesRef,
  onTabClick
}) => (
  <div>
    {/* Здесь ваша логика для отображения вкладок и категорий */}
    <h2 ref={titleBunRef}>Булки</h2>
    <div ref={bunsRef}>
      {buns.map((bun) => (
        <div key={bun._id}>{bun.name}</div>
      ))}
    </div>

    <h2 ref={titleMainRef}>Начинки</h2>
    <div ref={mainsRef}>
      {mains.map((main) => (
        <div key={main._id}>{main.name}</div>
      ))}
    </div>

    <h2 ref={titleSaucesRef}>Соусы</h2>
    <div ref={saucesRef}>
      {sauces.map((sauce) => (
        <div key={sauce._id}>{sauce.name}</div>
      ))}
    </div>

    {/* Логика для вкладок */}
    <div>
      <button
        onClick={() => onTabClick('bun')}
        className={currentTab === 'bun' ? 'active' : ''}
      >
        Булки
      </button>
      <button
        onClick={() => onTabClick('main')}
        className={currentTab === 'main' ? 'active' : ''}
      >
        Начинки
      </button>
      <button
        onClick={() => onTabClick('sauce')}
        className={currentTab === 'sauce' ? 'active' : ''}
      >
        Соусы
      </button>
    </div>
  </div>
);
