import { Renderer } from '@prezly/content-renderer-react-js';

import story from './story.json';

import styles from './index.module.scss';

const Index = () => (
    <div className={styles.article}>
        <Renderer nodes={story as any} />
    </div>
);

export default Index;
