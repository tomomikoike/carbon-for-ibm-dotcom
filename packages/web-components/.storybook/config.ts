/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html'; // eslint-disable-line import/first
import { classMap } from 'lit-html/directives/class-map';
import 'carbon-web-components/es/components/skip-to-content/skip-to-content.js';
import { configure, addDecorator, addParameters, setCustomElements } from '@storybook/web-components'; // eslint-disable-line import/first
import coreEvents from '@storybook/core-events';
import addons from '@storybook/addons';
import { withKnobs } from '@storybook/addon-knobs';
import { CURRENT_THEME } from '@carbon/storybook-addon-theme/es/shared';
import customElements from '../custom-elements.json';
import theme from './theme';
import containerStyles from './container.scss'; // eslint-disable-line import/first

if (process.env.STORYBOOK_IBMDOTCOM_WEB_COMPONENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

setCustomElements(customElements);

const SORT_ORDER = [
  'overview-getting-started--page',
  'overview-building-for-ibm-dotcom--page',
  'overview-stable-selectors--page',
  'overview-using-server-side-template--page',
  'overview-enable-right-to-left-rtl--page',
  'overview-feature-flags--page',
  'overview-contributing-to-the-web-components-package--page',
];

addParameters({
  options: {
    showRoots: true,
    storySort(lhs, rhs) {
      const [lhsId] = lhs;
      const [rhsId] = rhs;
      const lhsSortOrder = SORT_ORDER.indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER.indexOf(rhsId);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      return 0;
    },
    theme: theme,
  },
});

// The TS configuration for `@storybook/web-components` does not seem to allow returning `TemplateResult` in decorators,
// using `TemplateResult` in decorators seems to work with `@storybook/web-components` actually
// @ts-ignore
addDecorator((story, { parameters }) => {
  const result = story();
  const { hasMainTag } = result as any;
  const { hasGrid, hasVerticalSpacingInComponent } = parameters;
  const classes = classMap({
    'dds-ce-demo-devenv--container': true,
    'dds-ce-demo-devenv--container--has-grid': hasGrid,
    'dds-ce-demo-devenv--container--has-vertical-spacing-in-component': hasVerticalSpacingInComponent,
  });
  return html`
    <style>
      ${containerStyles}
    </style>
    <bx-skip-to-content href="#main-content">Skip to main content</bx-skip-to-content>
    <div
      id="main-content"
      name="main-content"
      data-floating-menu-container
      data-modal-container
      role="${hasMainTag ? 'none' : 'main'}"
      class="${classes}"
    >
      ${result}
    </div>
  `;
});

addDecorator(withKnobs);

addDecorator((story, { parameters }) => {
  const { knobs } = parameters;
  if (Object(knobs) === knobs) {
    if (!parameters.props) {
      parameters.props = {};
    }
    Object.keys(knobs).forEach(name => {
      if (!parameters.props[name]) {
        parameters.props[name] = {};
      }
      if (typeof knobs[name] === 'function') {
        Object.assign(parameters.props[name], knobs[name]({ groupId: name }));
      }
    });
  }
  return story();
});

let preservedTheme;

addDecorator((story, { parameters }) => {
  const root = document.documentElement;
  if (parameters['carbon-theme']?.disabled) {
    root.setAttribute('storybook-carbon-theme', '');
  } else {
    root.setAttribute('storybook-carbon-theme', preservedTheme || '');
  }
  return story();
});

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', (preservedTheme = theme));
  addons.getChannel().emit(coreEvents.FORCE_RE_RENDER);
});

const reqDocs = require.context('../docs', true, /\.stories\.mdx$/);
configure(reqDocs, module);

const reqComponents = require.context('../src/components', true, /\.stories\.[jt]s$/);
configure(reqComponents, module);

if (module.hot) {
  module.hot.accept(reqComponents.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, '', currentLocationHref);
    window.location.reload();
  });
}
