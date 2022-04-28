import type { Meta } from '@storybook/react';

type DecoratorArgs<T> = Parameters<Required<Meta<T>>['decorators'][number]>;

export type StoryDecoratorArg<T> = DecoratorArgs<T>[0];
export type ContextDecoratorArg<T> = DecoratorArgs<T>[1];
