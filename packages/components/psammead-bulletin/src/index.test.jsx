import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import Image from '@bbc/psammead-image';
import Bulletin from '.';

/* eslint-disable react/prop-types */
const BulletinComponent = ({ script, service, isLive, type, ctaText }) => {
  const summaryText = 'This is the summary text';
  const headlineText = 'This is the headline';
  const ctaLink = 'https://bbc.co.uk';

  const image = (
    <Image
      src="https://ichef.bbci.co.uk/news/660/cpsprodpb/11897/production/_106613817_999_al_.jpg"
      alt="Iron man"
    />
  );
  return (
    <Bulletin
      image={image}
      type={type}
      isLive={isLive}
      script={script}
      service={service}
      headlineText={headlineText}
      summaryText={summaryText}
      ctaLink={ctaLink}
      ctaText={ctaText}
    />
  );
};

describe('Bulletin', () => {
  shouldMatchSnapshot(
    'should render audio correctly',
    <BulletinComponent
      script={latin}
      service="news"
      ctaText="Listen"
      type="audio"
    />,
  );

  shouldMatchSnapshot(
    'should render video correctly',
    <BulletinComponent
      script={latin}
      service="news"
      ctaText="Watch"
      type="video"
    />,
  );

  shouldMatchSnapshot(
    'should render live audio correctly',
    <BulletinComponent
      script={latin}
      service="news"
      ctaText="Listen"
      type="audio"
      isLive
    />,
  );

  shouldMatchSnapshot(
    'should render live video correctly',
    <BulletinComponent
      script={latin}
      service="news"
      ctaText="Watch"
      type="video"
      isLive
    />,
  );
});
