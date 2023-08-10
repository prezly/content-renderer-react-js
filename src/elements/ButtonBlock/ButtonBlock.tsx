import { ButtonBlockNode } from '@prezly/story-content-format';
import classNames from 'classnames';

import './ButtonBlockNode.scss';

interface ButtonNodeProps {
    node: ButtonBlockNode;
}

export function ButtonBlock({ node }: ButtonNodeProps) {
    const { href, label, layout, new_tab: newTab, variant } = node;

    return (
        <a
            className={classNames('prezly-slate-button-block', {
                'prezly-slate-button-block--disabled': !href,
                'prezly-slate-button-block--outlined': variant === ButtonBlockNode.Variant.OUTLINE,
                'prezly-slate-button-block--fullWidth': layout === ButtonBlockNode.Layout.WIDE,
                'prezly-slate-button-block--right': layout === ButtonBlockNode.Layout.RIGHT,
                'prezly-slate-button-block--left': layout === ButtonBlockNode.Layout.LEFT,
                'prezly-slate-button-block--center': layout === ButtonBlockNode.Layout.CENTER,
            })}
            href={href}
            rel={newTab ? 'noreferrer noopener' : undefined}
            target={newTab ? '_blank' : undefined}
        >
            {label}
        </a>
    );
}
