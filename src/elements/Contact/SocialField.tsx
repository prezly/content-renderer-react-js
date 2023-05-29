import classNames from 'classnames';
import type { ComponentType, SVGProps } from 'react';

import './SocialField.scss';

interface Props {
    children?: string;
    className?: string;
    href: string;
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    withText?: boolean;
}

export function SocialField({ children, className, href, Icon }: Props) {
    return (
        <li className={classNames('prezly-slate-social-field', className)} title={children}>
            <a
                className="prezly-slate-social-field__link"
                href={href}
                rel="noreferrer noopener"
                target="_blank"
            >
                {Icon && <Icon className="prezly-slate-social-field__icon" />}
                {children && <span className="prezly-slate-social-field__value">{children}</span>}
            </a>
        </li>
    );
}
