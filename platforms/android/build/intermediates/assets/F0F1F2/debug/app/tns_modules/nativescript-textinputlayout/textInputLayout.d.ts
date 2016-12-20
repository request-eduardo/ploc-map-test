/**
 * TextInputLayout Class
 *      Acts as a wrapper around <TextField> or <TextView> components
 *      Implements functionality outline in android's TextInputLayout component
 */

declare module 'textInputLayout' {
    import View = require("ui/core/view");
    import {Property} from "ui/core/dependency-observable";

    export class TextInputLayout extends View.View implements View.AddChildFromBuilder {
        public static counterEnabledProperty: Property;
        public static errorEnabledProperty: Property;
        public static errorProperty: Property;
        public static hintAnimationEnabledProperty: Property;
        public static hintTextAppearanceProperty: Property;
        public static hintProperty: Property;

        /**
         * Native [android TextInputLayout](http://developer.android.com/reference/android/support/design/widget/TextInputLayout.html)
         */
        android: any;

        /**
        * Called for every child element declared in xml.
        * This method will add a child element (value) to current element.
        * @param name - Name of the element.
        * @param value - Value of the element.
        */
        _addChildFromBuilder(name: string, value: any): void;
    }
}