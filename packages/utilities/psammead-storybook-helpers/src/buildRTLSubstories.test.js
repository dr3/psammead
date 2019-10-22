import { getStorybook, storiesOf } from '@storybook/react';
import buildRTLSubstories from './buildRTLSubstories';
import * as withServicesKnob from './withServicesKnob';

const mockAddStory = jest.fn();

withServicesKnob.default = jest.fn(() => 'withServicesKnob');

jest.mock('@storybook/react', () => ({
  storiesOf: jest.fn(() => ({
    add: mockAddStory,
  })),
  getStorybook: jest.fn(() => [
    {
      kind: 'Components|Brand',
      fileName: './packages/components/psammead-brand/src/index.stories.jsx',
      stories: [
        {
          name: 'without brand link',
        },
        {
          name: 'with brand link',
        },
      ],
    },
    {
      kind: 'Components|Caption',
      fileName: './packages/components/psammead-caption/src/index.stories.jsx',
      stories: [
        {
          name: 'default',
        },
        {
          name: 'with offscreen text',
        },
        {
          name: 'containing an inline link',
        },
      ],
    },
  ]),
}));

afterEach(jest.clearAllMocks);

it('should get all stories', () => {
  const storyKind = 'Components|Brand';
  buildRTLSubstories({ storyKind });

  expect(getStorybook).toHaveBeenCalled();
});

it('should add the withServicesKnob decorator so that the default service is configured', () => {
  const storyKind = 'Components|Brand';
  buildRTLSubstories({ storyKind });

  expect(withServicesKnob.default).toHaveBeenCalledWith({
    defaultService: 'arabic',
  });
});

it("should build RTL variants of story kind's full suite of stories", () => {
  const storyKind = 'Components|Brand';
  buildRTLSubstories({ storyKind });

  expect(storiesOf.mock.calls[0][0]).toEqual('Components|Brand/RTL');
  expect(mockAddStory.mock.calls[0][0]).toEqual('RTL - without brand link');

  expect(storiesOf.mock.calls[1][0]).toEqual('Components|Brand/RTL');
  expect(mockAddStory.mock.calls[1][0]).toEqual('RTL - with brand link');

  expect(mockAddStory.mock.calls[2]).toBeUndefined();
});

it("should build RTL variants of story kind's specified stories", () => {
  const storyKind = 'Components|Brand';
  buildRTLSubstories({ storyKind, include: ['with brand link'] });

  expect(storiesOf.mock.calls[0][0]).toEqual('Components|Brand/RTL');
  expect(mockAddStory.mock.calls[0][0]).toEqual('RTL - with brand link');

  expect(storiesOf.mock.calls[1]).toBeUndefined();
});

it('should not create RTL substories when no params', () => {
  expect(() => buildRTLSubstories()).toThrow();
  expect(mockAddStory).not.toHaveBeenCalled();
});
