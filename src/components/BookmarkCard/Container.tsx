import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React, { forwardRef } from 'react';

type ContainerLayout = 'vertical' | 'horizontal';

interface ContainerProps {
    layout: ContainerLayout;
    className?: string;
}

export const Container = forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
    ({ layout, children, className }, ref) => {
        return (
            <div
                ref={ref}
                className={classNames(
                    className,
                    'prezly-slate-bookmark-card-component__container',
                    {
                        vertical: layout === 'vertical',
                        horizontal: layout === 'horizontal',
                    },
                )}
            >
                {children}
            </div>
        );
    },
);
