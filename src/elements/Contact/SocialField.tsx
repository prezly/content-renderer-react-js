import classNames from 'classnames';
import type { ComponentType, SVGProps } from 'react';

import './SocialField.scss';

interface Props {
    className?: string;
    href: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    value: string;
}

export function SocialField({ className, href, Icon, value }: Props) {
    return (
        <li className={classNames('prezly-slate-social-field', className)} title={value}>
            <a
                className="prezly-slate-social-field__link"
                href={href}
                rel="noreferrer noopener"
                target="_blank"
            >
                <Icon className="prezly-slate-social-field__icon" />
                <span className="prezly-slate-social-field__value">{value}</span>
            </a>
        </li>
    );
}
