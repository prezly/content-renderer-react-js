import { ListNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

import './List.scss';

interface Props extends HTMLAttributes<HTMLUListElement> {
    node: ListNode;
}

export function List({ node, children, className, ...props }: Props) {
    const Tag = node.type === ListNode.Type.NUMBERED ? 'ol' : 'ul';
    return (
        <Tag
            className={classNames(className, 'prezly-slate-list', {
                'prezly-slate-list--bulleted': node.type === ListNode.Type.BULLETED,
                'prezly-slate-list--numbered': node.type === ListNode.Type.NUMBERED,
                'prezly-slate-list--align-inherit': node.align === undefined,
                'prezly-slate-list--align-left': node.align === ListNode.Alignment.LEFT,
                'prezly-slate-list--align-center': node.align === ListNode.Alignment.CENTER,
                'prezly-slate-list--align-right': node.align === ListNode.Alignment.RIGHT,
            })}
            {...props}
        >
            {children}
        </Tag>
    );
}
