import type { Decorator } from '@storybook/react';

type DecoratorArgs<T> = Parameters<Decorator<T>>;

export type StoryDecoratorArg<T> = DecoratorArgs<T>[0];
export type ContextDecoratorArg<T> = DecoratorArgs<T>[1];
