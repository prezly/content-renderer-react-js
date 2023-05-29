import type { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

import { Avatar } from './Avatar';
import './Contact.scss';
import { SocialFields } from './SocialFields';

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: ContactNode;
}

export function Contact({ children, className, node, ...props }: Props) {
    const { contact, layout, show_avatar } = node;
    const jobDescription = [contact.description, contact.company].filter(Boolean).join(', ');

    return (
        <div
            id={`contact-${node.uuid}`}
            className={classNames('prezly-slate-contact', className, {
                'prezly-slate-contact--card': layout === 'card',
                'prezly-slate-contact--signature': layout === 'signature',
            })}
            {...props}
        >
            <div className="prezly-slate-contact__wrapper">
                {show_avatar && <Avatar name={contact.name} src={contact.avatar_url} />}

                <div className="prezly-slate-contact__content">
                    <h3 className="prezly-slate-contact__name">{contact.name}</h3>

                    <div className="prezly-slate-contact__job-description">
                        {/* If there is no text to show, render an empty <div> to keep height consistent */}
                        {jobDescription || <>&nbsp;</>}
                    </div>

                    <SocialFields
                        className="prezly-slate-contact__social-fields"
                        contact={contact}
                        layout={layout}
                    />
                </div>
            </div>
        </div>
    );
}
