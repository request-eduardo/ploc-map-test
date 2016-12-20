declare var android: any;

import {PropertyChangeData} from "ui/core/dependency-observable";
import {PropertyMetadata} from "ui/core/proxy";
import {TextInputLayout as CommonTextInputLayout} from './textInputLayout.common';
import {View} from "ui/core/view";
import {TextView} from 'ui/text-view';
import {TextField} from 'ui/text-field';


/* callbacks to update native widget when exposed properties change */

// hintProperty
function onHintPropertyChanged(pcData: PropertyChangeData) {
    let til = <TextInputLayout>pcData.object;
    if (til.android) {
        til.android.setHint(pcData.newValue);
    }
}
(<PropertyMetadata>CommonTextInputLayout.hintProperty.metadata).onSetNativeValue = onHintPropertyChanged;

// hintAnimationEnabledProperty
function onHintAnimationEnabledPropertyChanged(pcData: PropertyChangeData) {
    let til = <TextInputLayout>pcData.object,
        enabled: boolean = !!pcData.newValue;
    if (til.android) {
        til.android.setHintAnimationEnabled(enabled);
    }
}
(<PropertyMetadata>CommonTextInputLayout.hintAnimationEnabledProperty.metadata).onSetNativeValue = onHintAnimationEnabledPropertyChanged;

// hintAppearanceProperty
function onHintAppearancePropertyChanged(pcData: PropertyChangeData) {
    let til = <TextInputLayout>pcData.object;

    if(til.hintTextAppearance) {
        let resId = getStyleResourceId(til._context, til.hintTextAppearance);
        if (resId) {
            til.android.setHintTextAppearance(resId);
        }
    }
}
(<PropertyMetadata>CommonTextInputLayout.hintTextAppearanceProperty.metadata).onSetNativeValue = onHintAppearancePropertyChanged;

// errorEnabledProperty
function onErrorEnabledPropertyChanged(pcData: PropertyChangeData) {
    let til = <TextInputLayout>pcData.object,
        enabled: boolean = !!pcData.newValue;
    if (til.android) {
        if (!enabled && (til.error || '').length > 0) {
            til.error = '';
        }

        til.android.setErrorEnabled(enabled);
    }
}
(<PropertyMetadata>CommonTextInputLayout.errorEnabledProperty.metadata).onSetNativeValue = onErrorEnabledPropertyChanged;

// errorProperty
// NOTE: Android natively sets errorEnabled to true if this is not null
function onErrorPropertyChanged(pcData: PropertyChangeData) {
    let til = <TextInputLayout>pcData.object,
        error: string = pcData.newValue || '',
        enabled: boolean = til.errorEnabled;
    if (til.android && til.childLoaded) {
        til.android.setError(error);
        if (!enabled && error.length > 0) {
            til.errorEnabled = true;
        }
    }
}
(<PropertyMetadata>CommonTextInputLayout.errorProperty.metadata).onSetNativeValue = onErrorPropertyChanged;

// counterEnabledProperty
function onCounterEnabledPropertyChanged(pcData: PropertyChangeData) {
    let til = <TextInputLayout>pcData.object,
        enabled: boolean = !!pcData.newValue;
    if (til.android) {
        til.android.setCounterEnabled(enabled);
    }
}

(<PropertyMetadata>CommonTextInputLayout.counterEnabledProperty.metadata).onSetNativeValue = onCounterEnabledPropertyChanged;


function getStyleResourceId(context: any, name: string) {
    return context.getResources().getIdentifier(name, 'style', context.getPackageName());
}

export class TextInputLayout extends CommonTextInputLayout {
    _android: any;
    _childLoaded: boolean;

    get childLoaded() { return this._childLoaded; }
    set childLoaded(val: boolean) { this._childLoaded = val; }

    get android() { return this._android; }
    get _nativeView() { return this._android; }

    constructor() {
        super();
    }

    _createUI() {
        this._android = new android.support.design.widget.TextInputLayout(this._context);
    }

    /**
     * Callback that gets called when a child element is added.
     * The TextInputLayout can only accept TextView or TextField, so do appropriate checking here.
     */
    _onTextFieldChanged(oldChild: View, newChild: TextView | TextField): void {

        this.childLoaded = false;

        //some properties cannot be added until after the child text element has loaded
        function onChildLoaded() {

            //Need this for when navigating back to a historical view
            if (!this.android) { this._createUI(); }

            let existingEditText = this.android.getEditText();

            if (existingEditText) {
                if (existingEditText !== this.textField.android) {
                    this.android.removeView(this.android.editText)
                    this.android.addView(this.textField.android);
                }
            } else {
                this.android.addView(this.textField.android);
            }

            this.childLoaded = true;

            this.android.setErrorEnabled(this.errorEnabled);
            this.android.setError(this.error);

            this.textField.off(View.loadedEvent, onChildLoaded);
            this.textField.on(View.unloadedEvent, onChildUnloaded, this);
        }

        function onChildUnloaded() {
            this.childLoaded = false;
            this.textField.off(View.unloadedEvent, onChildUnloaded);
            this.textField.on(View.loadedEvent, onChildLoaded, this);
        }

        if (this.textField) {
            this.textField.on(View.loadedEvent, onChildLoaded, this);
        }
    }
}
