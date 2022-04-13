import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React, { forwardRef } from 'react';

type ContainerLayout = 'vertical' | 'horizontal';

interface ContainerProps {
    layout: ContainerLayout;
}

export const Container = forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
    ({ layout, children }, ref) => {
        return (
            <div
                ref={ref}
                className={classNames('prezly-slate-bookmark-card-component__container', {
                    vertical: layout === 'vertical',
                    horizontal: layout === 'horizontal',
                })}
            >
                {children}
            </div>
        );
    },
);
