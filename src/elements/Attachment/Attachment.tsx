import type { AttachmentNode } from '@prezly/story-content-format';
import { UploadcareFile } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

import { Download } from '../../icons';
import { formatBytes } from '../../lib';

import './Attachment.scss';

interface Props extends Omit<HTMLAttributes<HTMLAnchorElement>, 'children'> {
    node: AttachmentNode;
}

export function Attachment({ className, node, ...props }: Props) {
    const { description, file } = node;
    const attachment = UploadcareFile.createFromPrezlyStoragePayload(file);
    const isUsingCustomTitle = Boolean(description);

    return (
        <a
            id={`attachment-${file.uuid}`}
            className={classNames('prezly-slate-attachment', className)}
            download
            href={attachment.downloadUrl}
            rel="nofollow"
            {...props}
        >
            <div className="prezly-slate-attachment__content">
                <div className="prezly-slate-attachment__icon-container">
                    <Download className="prezly-slate-attachment__icon" />
                </div>

                <div className="prezly-slate-attachment__details">
                    <div className="prezly-slate-attachment__title">
                        {isUsingCustomTitle ? description : file.filename}
                    </div>

                    <div className="prezly-slate-attachment__subtitle">
                        {isUsingCustomTitle
                            ? `${file.filename} - ${formatBytes(file.size)}`
                            : formatBytes(file.size)}
                    </div>
                </div>
            </div>
        </a>
    );
}
