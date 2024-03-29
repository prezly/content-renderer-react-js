import { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';

import { Envelope, Facebook, Globe, Phone, Telephone, X } from '../../icons';

import { getMailtoHref, getSocialHandles, getTelHref, getUrl } from './lib';
import { SocialField } from './SocialField';
import './SocialFields.scss';

interface Props {
    className?: string;
    contact: ContactNode['contact'];
    layout: `${ContactNode.Layout}`;
}

export function SocialFields({ className, contact, layout }: Props) {
    const { email, phone, mobile } = contact;
    const website = getUrl(contact.website);
    const { facebook, twitter } = getSocialHandles(contact);

    if (layout === ContactNode.Layout.SIGNATURE) {
        return (
            <>
                <ul
                    className={classNames(
                        'prezly-slate-social-fields',
                        'prezly-slate-social-fields--signature',
                        className,
                    )}
                >
                    {email && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={getMailtoHref(email)}
                        >
                            {`E. ${email}`}
                        </SocialField>
                    )}
                    {phone && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={getTelHref(phone)}
                        >
                            {`P. ${phone}`}
                        </SocialField>
                    )}
                    {mobile && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={getTelHref(mobile)}
                        >
                            {`M. ${mobile}`}
                        </SocialField>
                    )}
                    {website && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={website.toString()}
                        >
                            {`W. ${website.hostname}`}
                        </SocialField>
                    )}
                </ul>
                <ul
                    className={classNames(
                        'prezly-slate-social-fields',
                        'prezly-slate-social-fields--signature',
                        'prezly-slate-social-fields--icons',
                        className,
                    )}
                >
                    {facebook && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={`https://www.facebook.com/${facebook}`}
                            Icon={Facebook}
                        />
                    )}
                    {twitter && (
                        <SocialField
                            className="prezly-slate-social-fields__field"
                            href={`https://twitter.com/${twitter}`}
                            Icon={X}
                        />
                    )}
                </ul>
            </>
        );
    }

    return (
        <>
            <ul
                className={classNames(
                    'prezly-slate-social-fields',
                    'prezly-slate-social-fields--card',
                    className,
                )}
            >
                {email && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={getMailtoHref(email)}
                        Icon={Envelope}
                    >
                        {email}
                    </SocialField>
                )}
                {phone && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={getTelHref(phone)}
                        Icon={Telephone}
                    >
                        {phone}
                    </SocialField>
                )}
                {mobile && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={getTelHref(mobile)}
                        Icon={Phone}
                    >
                        {mobile}
                    </SocialField>
                )}
            </ul>
            <ul
                className={classNames(
                    'prezly-slate-social-fields',
                    'prezly-slate-social-fields--card',
                    className,
                )}
            >
                {website && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={website.toString()}
                        Icon={Globe}
                    >
                        {website.hostname}
                    </SocialField>
                )}
                {facebook && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={`https://www.facebook.com/${facebook}`}
                        Icon={Facebook}
                    >
                        {facebook}
                    </SocialField>
                )}
                {twitter && (
                    <SocialField
                        className="prezly-slate-social-fields__field"
                        href={`https://twitter.com/${twitter}`}
                        Icon={X}
                    >
                        {`@${twitter}`}
                    </SocialField>
                )}
            </ul>
        </>
    );
}
