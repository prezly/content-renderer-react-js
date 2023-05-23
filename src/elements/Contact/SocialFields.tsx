import type { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { Envelope, Facebook, Globe, Phone, Telephone, Twitter } from '../../icons';
import { identity } from '../../lib';

import { getMailtoHref, getTelHref, getFacebookHref, getTwitterHref } from './lib';
import { SocialField } from './SocialField';
import './SocialFields.scss';
import type { SocialFieldEntry } from './types';

interface Props {
    className?: string;
    contact: ContactNode['contact'];
}

export const SocialFields: FunctionComponent<Props> = ({ className, contact }) => {
    const contactFields = Object.entries({
        email: { getHref: getMailtoHref, Icon: Envelope, value: contact.email },
        phone: { getHref: getTelHref, Icon: Telephone, value: contact.phone },
        mobile: { getHref: getTelHref, Icon: Phone, value: contact.mobile },
    });

    const socialFields = Object.entries({
        website: { getHref: identity, Icon: Globe, value: contact.website },
        facebook: { getHref: getFacebookHref, Icon: Facebook, value: contact.facebook },
        twitter: { getHref: getTwitterHref, Icon: Twitter, value: contact.twitter },
    });

    const nonEmptyContactFields = contactFields.filter(([_, { value }]) => {
        return Boolean(value);
    }) as SocialFieldEntry[];

    const nonEmptySocialFields = socialFields.filter(([_, { value }]) => {
        return Boolean(value);
    }) as SocialFieldEntry[];

    if (nonEmptyContactFields.length === 0 && nonEmptySocialFields.length === 0) {
        return null;
    }

    return (
        <>
            <ul className={classNames('prezly-slate-social-fields', className)}>
                {nonEmptyContactFields.map(([key, { getHref, Icon, value }]) => (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        key={key}
                        href={getHref(value)}
                        Icon={Icon}
                        value={value}
                    />
                ))}
            </ul>
            <ul className={classNames('prezly-slate-social-fields', className)}>
                {nonEmptySocialFields.map(([key, { getHref, Icon, value }]) => (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        key={key}
                        href={getHref(value)}
                        Icon={Icon}
                        value={value}
                        withText={false}
                    />
                ))}
            </ul>
        </>
    );
};
