import classNames from 'classnames';
import React, { FunctionComponent, ReactNode, SVGProps } from 'react';

import './SocialField.scss';

interface Props {
    children?: ReactNode;
    className?: string;
    href: string;
    Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    value: string;
    withText?: boolean;
}

export const SocialField: FunctionComponent<Props> = ({ children, className, href, Icon, value }) => (
    <li className={classNames('prezly-slate-social-field', className)} title={value}>
        <a className="prezly-slate-social-field__link" href={href} rel="noreferrer noopener" target="_blank">
            {Icon && <Icon className="prezly-slate-social-field__icon" />}
            {children && <span className="prezly-slate-social-field__value">{children}</span>}
        </a>
    </li>
);
