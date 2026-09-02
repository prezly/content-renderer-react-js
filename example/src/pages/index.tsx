import { Renderer } from '@prezly/content-renderer-react-js';
import styles from './index.module.scss';
import story from './story.json';

const Index = () => (
    <div className={styles.article}>
        <Renderer nodes={story as any} />
    </div>
);

export default Index;
