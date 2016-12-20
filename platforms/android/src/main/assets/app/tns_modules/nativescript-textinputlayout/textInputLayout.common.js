"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var view_1 = require("ui/core/view");
var dependency_observable_1 = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var text_view_1 = require('ui/text-view');
var text_field_1 = require('ui/text-field');
var counterEnabledProperty = new dependency_observable_1.Property("counterEnabled", "TextInputLayout", new proxy_1.PropertyMetadata(false, dependency_observable_1.PropertyMetadataSettings.AffectsLayout));
var errorEnabledProperty = new dependency_observable_1.Property("errorEnabled", "TextInputLayout", new proxy_1.PropertyMetadata(true, dependency_observable_1.PropertyMetadataSettings.AffectsLayout));
var errorProperty = new dependency_observable_1.Property("error", "TextInputLayout", new proxy_1.PropertyMetadata('', dependency_observable_1.PropertyMetadataSettings.None));
var hintAnimationEnabledProperty = new dependency_observable_1.Property("hintAnimationEnabled", "TextInputLayout", new proxy_1.PropertyMetadata(true, dependency_observable_1.PropertyMetadataSettings.None));
var hintTextAppearanceProperty = new dependency_observable_1.Property("hintTextAppearance", "TextInputLayout", new proxy_1.PropertyMetadata(undefined));
var hintProperty = new dependency_observable_1.Property("hint", "TextInputLayout", new proxy_1.PropertyMetadata('', dependency_observable_1.PropertyMetadataSettings.None));
var TextInputLayout = (function (_super) {
    __extends(TextInputLayout, _super);
    function TextInputLayout() {
        _super.call(this);
    }
    Object.defineProperty(TextInputLayout.prototype, "textField", {
        get: function () { return this._textField; },
        set: function (tf) {
            var old = this._textField;
            if (this._textField) {
                this._removeView(this._textField);
            }
            this._textField = tf;
            if (this._textField) {
                this._addView(tf);
            }
            this._onTextFieldChanged(old, tf);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "counterEnabled", {
        get: function () { return this._getValue(counterEnabledProperty); },
        set: function (value) { this._setValue(counterEnabledProperty, value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "errorEnabled", {
        get: function () { return this._getValue(errorEnabledProperty); },
        set: function (value) { this._setValue(errorEnabledProperty, value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "error", {
        get: function () { return this._getValue(errorProperty); },
        set: function (val) { this._setValue(errorProperty, val + ''); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "hintAnimationEnabled", {
        get: function () { return this._getValue(hintAnimationEnabledProperty); },
        set: function (value) { this._setValue(hintAnimationEnabledProperty, value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "hintTextAppearance", {
        get: function () { return this._getValue(hintTextAppearanceProperty); },
        set: function (value) { this._setValue(hintTextAppearanceProperty, value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "hint", {
        get: function () { return this._getValue(hintProperty); },
        set: function (value) { this._setValue(hintProperty, value + ''); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputLayout.prototype, "_childrenCount", {
        get: function () {
            if (this._textField) {
                return 1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    TextInputLayout.prototype._addChildFromBuilder = function (name, child) {
        if (!(child instanceof text_view_1.TextView || child instanceof text_field_1.TextField)) {
            throw new Error('TextInputLayout may only have a <TextView> or <TextField> as a child');
        }
        this.textField = child;
    };
    TextInputLayout.prototype._eachChildView = function (callback) {
        if (this._textField) {
            callback(this._textField);
        }
    };
    TextInputLayout.prototype._onTextFieldChanged = function (oldTextField, newTextField) {
    };
    TextInputLayout.counterEnabledProperty = counterEnabledProperty;
    TextInputLayout.errorEnabledProperty = errorEnabledProperty;
    TextInputLayout.errorProperty = errorProperty;
    TextInputLayout.hintAnimationEnabledProperty = hintAnimationEnabledProperty;
    TextInputLayout.hintTextAppearanceProperty = hintTextAppearanceProperty;
    TextInputLayout.hintProperty = hintProperty;
    return TextInputLayout;
}(view_1.View));
exports.TextInputLayout = TextInputLayout;
