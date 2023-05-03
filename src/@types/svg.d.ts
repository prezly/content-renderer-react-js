declare module '*.svg' {
    import type { ComponentType, SVGProps } from 'react';

    const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
