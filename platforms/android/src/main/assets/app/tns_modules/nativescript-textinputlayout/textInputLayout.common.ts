import definition = require('textInputLayout');
import {View} from "ui/core/view";
import {Property, PropertyMetadataSettings} from "ui/core/dependency-observable";
import {PropertyMetadata} from "ui/core/proxy";
import {TextView} from 'ui/text-view';
import {TextField} from 'ui/text-field';

const counterEnabledProperty: Property = new Property(
    "counterEnabled",
    "TextInputLayout",
    new PropertyMetadata(false, PropertyMetadataSettings.AffectsLayout)
);
const errorEnabledProperty: Property = new Property(
    "errorEnabled",
    "TextInputLayout",
    new PropertyMetadata(true, PropertyMetadataSettings.AffectsLayout)
);
const errorProperty: Property = new Property(
    "error",
    "TextInputLayout",
    new PropertyMetadata('', PropertyMetadataSettings.None)
);
const hintAnimationEnabledProperty: Property = new Property(
    "hintAnimationEnabled",
    "TextInputLayout",
    new PropertyMetadata(true, PropertyMetadataSettings.None)
);
const hintTextAppearanceProperty: Property = new Property(
    "hintTextAppearance",
    "TextInputLayout",
    new PropertyMetadata(undefined)
);
const hintProperty: Property = new Property(
    "hint",
    "TextInputLayout",
    new PropertyMetadata('', PropertyMetadataSettings.None)
);

export class TextInputLayout extends View implements definition.TextInputLayout {
    public static counterEnabledProperty: Property = counterEnabledProperty;
    public static errorEnabledProperty: Property = errorEnabledProperty;
    public static errorProperty: Property = errorProperty;
    public static hintAnimationEnabledProperty: Property = hintAnimationEnabledProperty;
    public static hintTextAppearanceProperty: Property = hintTextAppearanceProperty;
    public static hintProperty: Property = hintProperty;

    private _textField: View;

    get textField(): View { return this._textField; }
    set textField(tf: View) {
        let old: View = this._textField;
        if (this._textField) {
            this._removeView(this._textField);
        }

        this._textField = tf;

        if (this._textField) {
            this._addView(tf);
        }

        this._onTextFieldChanged(old, tf);
    }

    constructor() {
        super();
    }

    get counterEnabled() { return this._getValue(counterEnabledProperty); }
    set counterEnabled(value) { this._setValue(counterEnabledProperty, value); }

    get errorEnabled() { return this._getValue(errorEnabledProperty); }
    set errorEnabled(value) { this._setValue(errorEnabledProperty, value); }

    get error() { return this._getValue(errorProperty) }
    set error(val) { this._setValue(errorProperty, val + ''); }

    get hintAnimationEnabled() { return this._getValue(hintAnimationEnabledProperty); }
    set hintAnimationEnabled(value) { this._setValue(hintAnimationEnabledProperty, value); }

    get hintTextAppearance() { return this._getValue(hintTextAppearanceProperty); }
    set hintTextAppearance(value) { this._setValue(hintTextAppearanceProperty, value); }

    get hint() { return this._getValue(hintProperty); }
    set hint(value) { this._setValue(hintProperty, value + ''); }

    get _childrenCount(): number {
        if (this._textField) {
            return 1;
        }

        return 0;
    }

    /**
     * Callback that gets called when a child element is added.
     * The TextInputLayout can only accept TextView or TextField, so do appropriate checking here.
     */
    public _addChildFromBuilder(name: string, child: TextField | TextView): void {
        if (!(child instanceof TextView || child instanceof TextField)) {
            throw new Error('TextInputLayout may only have a <TextView> or <TextField> as a child');
        }

        this.textField = child;
    }

    public _eachChildView(callback: (child: View) => boolean) {
        if (this._textField) {
            callback(this._textField);
        }
    }

    public _onTextFieldChanged(oldTextField: View, newTextField: View) {
        //to be overridden in subclasses as different things may need done in ios vs android
    }
}

