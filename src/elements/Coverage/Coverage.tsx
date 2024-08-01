import type { CoverageNode } from '@prezly/story-content-format';
import type { CoverageEntry } from "@prezly/sdk";
import { CoverageCard } from "../../components";
import type { ReactNode } from "react";

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
            layout={node.layout}
            renderDate={renderDate}
            withThumbnail={node.show_thumbnail}
        />
    );
}
