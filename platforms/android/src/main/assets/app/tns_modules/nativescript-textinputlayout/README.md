# nativescript-textinputlayout
### Android Material Design TextInputLayout for NativeScript

##### [Android TextInputLayout Documentation](http://developer.android.com/reference/android/support/design/widget/TextInputLayout.html)

----------

### Usage

Install the plugin by running this command in your project root:
`tns plugin add nativescript-textinputlayout`

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:TIL="nativescript-textinputlayout">
    <StackLayout>
        <!--TIL with all possible attrs via bindings-->
        <TIL:TextInputLayout class="demo-text-input-layout"
            hint="{{ hint }}"
            error="{{ error }}"
            errorEnabled="{{ isErrorEnabled }}"
            hintAnimationEnabled="{{ isHintAnimationEnabled }}"
            hintTextAppearance="SpecialTextInputLayout"
            counterEnabled="{{ isCounterEnabled }}">

            <!--ONE child element can be added, MUST be either TextField or TextView-->
            <TextField text="{{ demoText }}" />
        </TIL:TextInputLayout>

        <!--TIL with just a static hint-->
        <TIL:TextInputLayout hint="Hint Text">
            <TextField text="" />
        </TIL:TextInputLayout>
    </StackLayout>
</Page>
```

#### Attributes

Name | Description | Value Type | Default
-----|-------------|------------|---------
hint | Text that shows up in the hint, and floating label | String | ""
error | Text that will display as error message and make the widget look invalid | String | ""
errorEnabled | Whether or not an error is enabled for the widget.  If no error, it won't pad the bottom so much.  However, if you set the error attr, it auto-sets this property under the hood to true | Boolean | false
hintAnimationEnabled | Whether or not the 'float' action of the label should be animated | Boolean | true
hintTextAppearance | Name of the style definition to apply to the floating label | String | ""
counterEnabled | Whether or not a char counter should display in bottom-right of widget | Boolean | false

#### Styling
Several of the styles for the TextInputLayout need to be declared in the Theme for your app.
This top-level set of styles will apply to the entire app.
One way to do this is to have a style defined whose parent is AppTheme (the theme that NativeScript generates) and then set the app to use the new theme by updating the AndroidManifest.xml file. There are examples of this in the Demo.

There is one property that you can use to style the floating label. It's power is limited - it only applies when the field is focused - but it's something.
Simply create a style rule, such as the one below, and set the TextInputLayout's hintTextAppearance property to the name of that style rule (see sample TextInputLayout XML above):

```xml
<!-- app/App_Resources/Android/values/appStyles.xml -->
<resources xmlns:android="http://schemas.android.com/apk/res/android">
    <style name="SpecialTextInputLayout" parent="@android:style/TextAppearance">
        <item name="android:textColor">#F9D02A</item>
        <item name="android:textSize">12dp</item>
    </style>
</resources>
```

#### Demo

To run the demo locally, run the following commands from the root folder after pulling down this repo:
`npm run setup` and `npm run demo.android`

<p align="center">
    <img height="750" src="https://raw.githubusercontent.com/bradleygore/nativescript-textinputlayout/master/demo.gif" alt="NativeScript Text Input Layout demo"/>
</p>

------------------

### Attributions

[Nathanael Anderson](https://github.com/NathanaelA) - He helped me with what (LayoutBase, ContentView, View, ...) to subclass off of and helped me understand more of the nuances of each.

[Brad Martin](https://github.com/bradmartin) - I used his {N} plugins as guides for this one, and pestered him when I had questions.

[Nathan Walker](https://github.com/NathanWalker) - I followed his [tutorial](http://developer.telerik.com/featured/creating-nativescript-plugins-in-typescript/) in setting up this plugin.
