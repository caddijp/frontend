import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';
import { addSerializer } from 'jest-specific-snapshot';
import { styleSheetSerializer } from 'jest-styled-components';

addSerializer(styleSheetSerializer);

initStoryshots({
  framework: 'react',
  suite: 'FileProperties',
  test: multiSnapshotWithOptions({}),
});
