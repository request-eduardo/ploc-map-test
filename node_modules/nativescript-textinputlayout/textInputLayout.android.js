"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var textInputLayout_common_1 = require('./textInputLayout.common');
var view_1 = require("ui/core/view");
function onHintPropertyChanged(pcData) {
    var til = pcData.object;
    if (til.android) {
        til.android.setHint(pcData.newValue);
    }
}
textInputLayout_common_1.TextInputLayout.hintProperty.metadata.onSetNativeValue = onHintPropertyChanged;
function onHintAnimationEnabledPropertyChanged(pcData) {
    var til = pcData.object, enabled = !!pcData.newValue;
    if (til.android) {
        til.android.setHintAnimationEnabled(enabled);
    }
}
textInputLayout_common_1.TextInputLayout.hintAnimationEnabledProperty.metadata.onSetNativeValue = onHintAnimationEnabledPropertyChanged;
function onHintAppearancePropertyChanged(pcData) {
    var til = pcData.object;
    if (til.hintTextAppearance) {
        var resId = getStyleResourceId(til._context, til.hintTextAppearance);
        if (resId) {
            til.android.setHintTextAppearance(resId);
        }
    }
}
textInputLayout_common_1.TextInputLayout.hintTextAppearanceProperty.metadata.onSetNativeValue = onHintAppearancePropertyChanged;
function onErrorEnabledPropertyChanged(pcData) {
    var til = pcData.object, enabled = !!pcData.newValue;
    if (til.android) {
        if (!enabled && (til.error || '').length > 0) {
            til.error = '';
        }
        til.android.setErrorEnabled(enabled);
    }
}
textInputLayout_common_1.TextInputLayout.errorEnabledProperty.metadata.onSetNativeValue = onErrorEnabledPropertyChanged;
function onErrorPropertyChanged(pcData) {
    var til = pcData.object, error = pcData.newValue || '', enabled = til.errorEnabled;
    if (til.android && til.childLoaded) {
        til.android.setError(error);
        if (!enabled && error.length > 0) {
            til.errorEnabled = true;
        }
    }
}
textInputLayout_common_1.TextInputLayout.errorProperty.metadata.onSetNativeValue = onErrorPropertyChanged;
function onCounterEnabledPropertyChanged(pcData) {
    var til = pcData.object, enabled = !!pcData.newValue;
    if (til.android) {
        til.android.setCounterEnabled(enabled);
    }
}
textInputLayout_common_1.TextInputLayout.counterEnabledProperty.metadata.onSetNativeValue = onCounterEnabledPropertyChanged;
function getStyleResourceId(context, name) {
    return context.getResources().getIdentifier(name, 'style', context.getPackageName());
}
var TextInputLayout = (function (_super) {
    __extends(TextInputLayout, _super);
    function TextInputLayout() {
        _super.call(this);
    }
    Object.defineProperty(TextInputLayout.prototype, "childLoaded", {
        get: function () { return this._childLoaded; },
        set: function (val) { this._childLoaded = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "android", {
        get: function () { return this._android; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "_nativeView", {
        get: function () { return this._android; },
        enumerable: true,
        configurable: true
    });
    TextInputLayout.prototype._createUI = function () {
        this._android = new android.support.design.widget.TextInputLayout(this._context);
    };
    TextInputLayout.prototype._onTextFieldChanged = function (oldChild, newChild) {
        this.childLoaded = false;
        function onChildLoaded() {
            if (!this.android) {
                this._createUI();
            }
            var existingEditText = this.android.getEditText();
            if (existingEditText) {
                if (existingEditText !== this.textField.android) {
                    this.android.removeView(this.android.editText);
                    this.android.addView(this.textField.android);
                }
            }
            else {
                this.android.addView(this.textField.android);
            }
            this.childLoaded = true;
            this.android.setErrorEnabled(this.errorEnabled);
            this.android.setError(this.error);
            this.textField.off(view_1.View.loadedEvent, onChildLoaded);
            this.textField.on(view_1.View.unloadedEvent, onChildUnloaded, this);
        }
        function onChildUnloaded() {
            this.childLoaded = false;
            this.textField.off(view_1.View.unloadedEvent, onChildUnloaded);
            this.textField.on(view_1.View.loadedEvent, onChildLoaded, this);
        }
        if (this.textField) {
            this.textField.on(view_1.View.loadedEvent, onChildLoaded, this);
        }
    };
    return TextInputLayout;
}(textInputLayout_common_1.TextInputLayout));
exports.TextInputLayout = TextInputLayout;
