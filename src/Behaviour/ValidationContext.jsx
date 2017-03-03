// @flow
import React from 'react';
import type { IValidationContext } from './ValidationWrapper';
import ValidationWrapper from './ValidationWrapper';

type ValidationContextProps = {
    children?: any;
    onValidationUpdated?: (isValid?: boolean) => void;
};

export default class ValidationContext extends React.Component {
    static childContextTypes = {
        validationContext: React.PropTypes.any,
    };

    props: ValidationContextProps;
    childWrappers: ValidationWrapper[] = [];

    getChildContext(): { validationContext: IValidationContext } {
        return {
            validationContext: this,
        };
    }

    register(wrapper: ValidationWrapper) {
        this.childWrappers.push(wrapper);
    }

    unregister(wrapper: ValidationWrapper) {
        this.childWrappers.splice(this.childWrappers.indexOf(wrapper), 1);
        this.onValidationRemoved();
    }

    onValidationUpdated(wrapper: ValidationWrapper, isValid?: boolean) {
        const { onValidationUpdated } = this.props;
        if (onValidationUpdated) {
            const isValidResult = !this.childWrappers.find(x => {
                if (x === wrapper) {
                    return !isValid;
                }
                return x.hasError();
            });
            onValidationUpdated(isValidResult);
        }
    }

    onValidationRemoved() {
        const { onValidationUpdated } = this.props;
        if (onValidationUpdated) {
            const isValidResult = !this.childWrappers.find(x => x.hasError());
            onValidationUpdated(isValidResult);
        }
    }

    async validate(withoutFocus: boolean): Promise<boolean> {
        await Promise.all(this.childWrappers.map(x => x.processSubmit()));
        const firstInvalid = this.childWrappers.find(x => x.hasError());
        if (firstInvalid) {
            if (!withoutFocus) {
                firstInvalid.focus();
            }
            firstInvalid.activateValidationMessageIfNeed();
        }

        if (this.props.onValidationUpdated) {
            this.props.onValidationUpdated(!firstInvalid);
        }

        return !firstInvalid;
    }

    render(): React.Element<*> {
        const { children } = this.props;
        return (
            <span>
                {children}
            </span>
        );
    }
}