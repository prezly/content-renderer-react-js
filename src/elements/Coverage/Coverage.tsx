import type { CoverageNode } from '@prezly/story-content-format';
import type { CoverageEntry } from "@prezly/sdk";
import { CoverageCard } from "../../components";

interface Props {
    coverage: CoverageEntry | undefined;
    dateFormat: string;
    node: CoverageNode;
}

export function Coverage({ coverage, dateFormat, node }: Props) {
    if (!coverage) {
        return null;
    }

    return (
        <CoverageCard
            className="prezly-slate-coverage"
            coverage={coverage}
            dateFormat={dateFormat}
            layout={node.layout}
            withThumbnail={node.show_thumbnail}
        />
    );
}
