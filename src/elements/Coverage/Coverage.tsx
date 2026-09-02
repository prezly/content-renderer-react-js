import type { CoverageEntry } from '@prezly/sdk';
import type { CoverageNode } from '@prezly/story-content-format';
import type { ReactNode } from 'react';

import { CoverageCard } from '../../components';

interface Props {
    coverage: CoverageEntry | undefined;
    node: CoverageNode;
    renderDate: (date: string) => ReactNode;
}

export function Coverage({ coverage, node, renderDate }: Props) {
    if (!coverage) {
        return null;
    }

    return (
        <CoverageCard
            className="prezly-slate-coverage"
            coverage={coverage}
            id={`coverage-${node.uuid}`}
            layout={node.layout}
            newTab={node.new_tab}
            renderDate={renderDate}
            withThumbnail={node.show_thumbnail}
        />
    );
}
