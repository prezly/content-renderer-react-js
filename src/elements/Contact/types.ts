import type { ComponentType, SVGProps } from 'react';

export interface SocialFieldData {
    getHref: (value: string) => string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    value: string;
}

export type SocialFieldEntry = [string, SocialFieldData];
