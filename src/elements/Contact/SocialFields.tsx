import { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { Envelope, Facebook, Globe, Phone, Telephone, Twitter } from '../../icons';

import { getMailtoHref, getTelHref, getFacebookHref, getTwitterHref } from './lib';
import { SocialField } from './SocialField';
import './SocialFields.scss';

interface Props {
    className?: string;
    contact: ContactNode['contact'];
    layout: `${ContactNode.Layout}`;
}

export const SocialFields: FunctionComponent<Props> = ({ className, contact, layout }) => {
    const { email, phone, mobile, website, facebook, twitter } = contact;

    if (layout === ContactNode.Layout.SIGNATURE) {
        return (
            <>
                <ul className={classNames('prezly-slate-social-fields', className)}>
                    {email && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={getMailtoHref(email)}
                            value={email}
                        >
                            E. {email}
                        </SocialField>
                    )}
                    {phone && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={getTelHref(phone)}
                            value={phone}
                        >
                            P. {phone}
                        </SocialField>
                    )}
                    {mobile && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={getTelHref(mobile)}
                            value={mobile}
                        >
                            M. {mobile}
                        </SocialField>
                    )}
                    {website && (
                        <SocialField className="prezly-slate-social-fields__field" href={website} value={website}>
                            W. {website}
                        </SocialField>
                    )}
                </ul>
                <ul
                    className={classNames(
                        'prezly-slate-social-fields',
                        'prezly-slate-social-fields--inline',
                        'prezly-slate-social-fields--icons',
                        className,
                    )}
                >
                    {facebook && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={getFacebookHref(facebook)}
                            value={facebook}
                            Icon={Facebook}
                        />
                    )}
                    {twitter && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={getTwitterHref(twitter)}
                            value={twitter}
                            Icon={Twitter}
                        />
                    )}
                </ul>
            </>
        );
    }

    return (
        <>
            <ul className={classNames('prezly-slate-social-fields', 'prezly-slate-social-fields--inline', className)}>
                {email && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={getMailtoHref(email)}
                        value={email}
                        Icon={Envelope}
                    >
                        {email}
                    </SocialField>
                )}
                {phone && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={getTelHref(phone)}
                        value={phone}
                        Icon={Telephone}
                    >
                        {phone}
                    </SocialField>
                )}
                {mobile && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={getTelHref(mobile)}
                        value={mobile}
                        Icon={Phone}
                    >
                        {mobile}
                    </SocialField>
                )}
            </ul>
            <ul
                className={classNames(
                    'prezly-slate-social-fields',
                    'prezly-slate-social-fields--inline',
                    'prezly-slate-social-fields--icons',
                    className,
                )}
            >
                {website && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={website}
                        value={website}
                        Icon={Globe}
                    />
                )}
                {facebook && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={getFacebookHref(facebook)}
                        value={facebook}
                        Icon={Facebook}
                    />
                )}
                {twitter && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={getTwitterHref(twitter)}
                        value={twitter}
                        Icon={Twitter}
                    />
                )}
            </ul>
        </>
    );
};
