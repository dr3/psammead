import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  MEDIA_QUERY_TYPOGRAPHY,
} from '@bbc/gel-foundations/breakpoints';
import {
  getPica,
  getParagon,
  getGreatPrimer,
  GEL_FF_REITH_SANS,
} from '@bbc/gel-foundations/typography';

const getSvgHeight = (typographyNameOne, typographyNameTwo, importedScript) => {
  const typographyStyle = importedScript[typographyNameOne];
  const typographyStyleTwo = importedScript[typographyNameTwo];

  const GROUP_A_FONT_SIZE_PX = typographyStyle.groupA.fontSize;
  const GROUP_A_FONT_SIZE = `${GROUP_A_FONT_SIZE_PX / 16}rem`;

  const GROUP_B_FONT_SIZE_PX = typographyStyle.groupB.fontSize;
  const GROUP_B_FONT_SIZE = `${GROUP_B_FONT_SIZE_PX / 16}rem`;

  const GROUP_D_FONT_SIZE_PX = typographyStyleTwo.groupD.fontSize;
  const GROUP_D_FONT_SIZE = `${GROUP_D_FONT_SIZE_PX / 16}rem`;

  return `
    height: ${GROUP_A_FONT_SIZE};
    margin-bottom: -${GROUP_A_FONT_SIZE_PX * 0.2}px;

    ${MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY} {
      height: ${GROUP_B_FONT_SIZE};
      margin-bottom: -${GROUP_B_FONT_SIZE_PX * 0.2}px;
    }

    ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
      height: ${GROUP_D_FONT_SIZE};
      margin-bottom: -${GROUP_D_FONT_SIZE_PX * 0.2}px;
    }
  `;
};

const Live = ({ script, liveText, dir, topStory }) => {
  const Span = styled.span`
    text-transform: uppercase;
    font-family: ${GEL_FF_REITH_SANS};
    font-weight: bold;
    color: #bb1919;

    ${({ script, topStory }) => {
      if (!script) {
        return '';
      }

      return topStory ? getParagon(script) : getPica(script);
    }};

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      ${({ script }) => (script ? getGreatPrimer(script) : '')};
    }
  `;

  const rotate = keyframes`
    0% {
      opacity:1;
    }

    50% {
      opacity:.3;
    }

    100% {
      opacity:1;
    }
  `;

  const Svg = styled.svg`
    fill: #bb1919;

    ${({ script, topStory }) => {
      if (!script) {
        return '';
      }

      return topStory
        ? getSvgHeight('paragon', 'greatPrimer', script)
        : getSvgHeight('pica', 'greatPrimer', script);
    }};
  `;

  const Text = styled.span`
    padding-${({ dir }) => (dir === 'rtl' ? 'right' : 'left')}: 2px;
  `;

  const Circle = styled.circle`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    will-change: opacity;
    -webkit-animation: gs-pulse 1.7s ease infinite;
    animation: ${rotate} 1.7s ease infinite;
  `;

  return (
    <Span script={script} topStory={topStory}>
      <span>
        <Svg
          script={script}
          topStory={topStory}
          viewBox="0 0 32 32"
          focusable="false"
        >
          <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm0-4C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z" />
          <Circle cx="16" cy="16" r="8.5" />
        </Svg>
      </span>
      <Text dir={dir}>{liveText}</Text>
    </Span>
  );
};

export default Live;
