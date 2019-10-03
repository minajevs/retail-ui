import * as React from 'react';
import { ModalContext } from './ModalContext';
import styles from './Modal.module.less';
import { cx } from '../../lib/theming/Emotion';
import ZIndex from '../ZIndex';

export class Body extends React.Component {
  public render(): JSX.Element {
    return (
      <ZIndex shouldCreateStackingContext={true}>
        <ModalContext.Consumer>
          {({ additionalPadding, hasHeader }) => (
            <div
              className={cx(
                styles.body,
                !hasHeader && styles.bodyWithoutHeader,
                additionalPadding && styles.bodyAddPadding,
              )}
            >
              {this.props.children}
            </div>
          )}
        </ModalContext.Consumer>
      </ZIndex>
    );
  }
}
