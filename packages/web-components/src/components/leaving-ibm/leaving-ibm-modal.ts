/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import BXModal from 'carbon-web-components/es/components/modal/modal.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './leaving-ibm.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Leaving IBM Modal.
 *
 * @element dds-leaving-ibm-modal
 */
@customElement(`${ddsPrefix}-leaving-ibm-modal`)
class DDSLeavingIbmModal extends StableSelectorMixin(BXModal) {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader

  static get stableSelector() {
    return `${ddsPrefix}--leaving-ibm-modal`;
  }
}

export default DDSLeavingIbmModal;
