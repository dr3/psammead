import React from 'react';
import styled from 'styled-components';
import { shape, string, oneOf, arrayOf } from 'prop-types';
import {
  Burmese,
  Bengali,
  EasternArabic,
  WesternArabic,
} from '@bbc/psammead-locales/numerals';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import Grid from '../../psammead-grid';
import { MostReadRank, MostReadLink } from './item';

const MostReadItemProps = {
  columns: {
    group0: 18,
    group1: 18,
    group2: 9,
    group3: 9,
    group4: 12,
    group5: 12,
  },
};

const MostReadRankProps = {
  item: true,
  columns: {
    group0: 2,
    group1: 2,
    group2: 2,
    group3: 2,
    group4: 2,
    group5: 2,
  },
};

const MostReadLinkProps = {
  item: true,
  columns: {
    group0: 16,
    group1: 16,
    group2: 7,
    group3: 7,
    group4: 10,
    group5: 10,
  },
};

const MostReadListProps = {
  enableGelGutters: true,
  enableGelMargins: true,
  columns: {
    group0: 18,
    group1: 18,
    group2: 18,
    group3: 18,
    group4: 24,
    group5: 60,
  },
};

const serviceNumerals = service => {
  const servicesNonWesternNumerals = {
    arabic: EasternArabic,
    bengali: Bengali,
    burmese: Burmese,
    pashto: EasternArabic,
    persian: EasternArabic,
    urdu: EasternArabic,
  };
  return servicesNonWesternNumerals[service]
    ? servicesNonWesternNumerals[service]
    : WesternArabic;
};

const StyledOl = styled.ol.attrs({
  role: 'list',
})`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const MostReadItem = ({ rank, link, service, script, dir }) => (
  <Grid {...MostReadItemProps} dir={dir} forwardedAs="li">
    <Grid {...MostReadRankProps} dir={dir}>
      <MostReadRank service={service} script={script}>
        {rank}
      </MostReadRank>
    </Grid>
    <Grid {...MostReadLinkProps} dir={dir}>
      <MostReadLink service={service} link={link} script={script} dir={dir} />
    </Grid>
  </Grid>
);

const MostReadList = ({ items, service, script, dir }) => {
  const numerals = serviceNumerals(service);
  return (
    <StyledOl>
      <Grid {...MostReadListProps} dir={dir}>
        {items.map((link, i) => {
          const rank = numerals[i + 1];
          return (
            <MostReadItem
              key={rank}
              link={link}
              service={service}
              script={script}
              rank={rank}
              dir={dir}
            />
          );
        })}
      </Grid>
    </StyledOl>
  );
};

const linkPropTypes = shape({
  title: string.isRequired,
  href: string.isRequired,
});

MostReadItem.propTypes = {
  rank: string.isRequired,
  link: linkPropTypes.isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']),
};

MostReadList.propTypes = {
  items: arrayOf(linkPropTypes).isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']),
};

MostReadItem.defaultProps = {
  dir: 'ltr',
};

MostReadList.defaultProps = {
  dir: 'ltr',
};

export default MostReadList;
