/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { ArrowRight20 } from '@carbon/icons-react';
import { LinkWithIcon } from '@carbon/ibmdotcom-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Simple benefits band item
 *
 * @param {object} props props object
 * @param {string} props.title simple long form title
 * @param {string} props.copy simple long form copy
 * @param {object} props.link link object which includes url, link text and target properties
 * @returns {*} Simple benefits band item
 */
const SimpleBenefitsBandItem = ({ title, copy, link }) => (
  <div
    data-autoid={`${stablePrefix}--simplebenefitsband__cards-item`}
    className={`${prefix}--simplebenefitsband__cards-item`}>
    <h3 className={`${prefix}--simplebenefitsband__cards-item__title`}>
      {title}
    </h3>
    <div className={`${prefix}--simplebenefitsband__cards-item__devider`}></div>
    <div className={`${prefix}--simplebenefitsband__cards-item__content`}>
      {copy}
    </div>
    <div className={`${prefix}--simplebenefitsband__cards-item__link`}>
      <LinkWithIcon href={link.href} target={link.target}>
        <span>{link.text}</span>
        <ArrowRight20 />
      </LinkWithIcon>
    </div>
  </div>
);

SimpleBenefitsBandItem.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default SimpleBenefitsBandItem;
