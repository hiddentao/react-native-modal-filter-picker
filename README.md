# react-native-modal-filter-picker

![Demo](https://github.com/hiddentao/react-native-modal-filter-picker/raw/master/demo.gif "Demo")

A cross-platform (iOS, Android) modal picker for React Native.

Features:

* Cross-platform (iOS, Android)
* Default styling works well
* Extensively customizable styling and rendering
* Built-in search filter for long lists
* Uses `ListView` for performance
* Compatible with React Native 0.40+

## Installation

Use NPM/Yarn to install package: `react-native-modal-filter-picker`

## Usage

A basic demo:

```js
import { Component, View, Text, TouchableOpacity } from 'react-native'

import ModalFilterPicker from 'react-native-modal-filter-picker'


export default class App extends Component {
  constructor (props, ctx) {
    super(props, ctx);

    this.state = {
      visible: false,
      picked: null,
    };
  }

  render() {
    const { visible, picked } = this.state;

    const options = [
      {
        key: 'kenya',
        label: 'Kenya',
      },
      {
        key: 'uganda',
        label: 'Uganda',
      },
      {
        key: 'libya',
        label: 'Libya',
      },
      {
        key: 'morocco',
        label: 'Morocco',
      },
      {
        key: 'estonia',
        label: 'Estonia',
      },
    ];

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onShow}>
          <Text>Select country</Text>
        </TouchableOpacity>      
        <Text style={appStyles.label}>Selected:</Text>
        <Text>{picked}</Text>
        <ModalFilterPicker
          visible={visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={options}
        />
      </View>
    );
  }

  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = (picked) => {
    this.setState({
      picked: picked,
      visible: false
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }
}
```

## Options

The following functionality props can be passed to the component:

| Prop name  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| `options` | `Array` of `{ key, label }` | **(required)** | The options to display in the list |
| `onSelect` | `function (key) {}` | **(required)** | Callback for when an option is chosen |
| `onCancel` | `function () {}` | **(required)** | Callback for when the cancel button is pressed |
| `placeholderText` | `String` | `"Filter..."` | Placeholder text for filter input text field |
| `placeholderTextColor` | `String` | `"#ccc"` | Color of placeholder text for filter input text field |
| `androidUnderlineColor` | `String` | `"rgba(0,0,0,0)"` | Android text underline color of filter input text field |
| `cancelButtonText` | `String` | `"Cancel"` | Cancel button text |
| `title` | `String` | `null` | Title text which appears above options list |
| `noResultsText` | `String` | `"No matches"` | Text to show when there are no results for filter |
| `visible` | `Boolean` | `true` | Whether to show modal or not |
| `showFilter` | `Boolean` | `true` | Whether to show filter text field field or not |
| `modal` | `Object` | `null` | Options to pass to native `Modal` component |
| `selectedOption` | `String` | `null` | The currently selected option, to visually differentiate it from others |
| `renderOption` | `function (option, isSelected) {}` | `null` | Custom option renderer |
| `renderList` | `function () {}` | `null` | Custom option list renderer |
| `renderCancelButton` | `function () {}` | `null` | Custom cancel button renderer |

In addition, the following styling props (each of which must be an `Object` consisting of styles) can be passed in:

| Prop name  | Description |
| ------------- | ------------- |
| `overlayStyle` | Style for the background modal overlay |
| `listContainerStyle` | Style for the `View` wrapping the options list |
| `filterTextInputContainerStyle` | Style for the `View` wrapping the filter input text field |
| `filterTextInputStyle` | Style for the filter input text field |
| `cancelContainerStyle` | Style for the `View` wrapping the cancel button |
| `cancelButtonStyle` | Style for the cancel button button face |
| `cancelButtonTextStyle` | Style for the cancel button text |
| `titleTextStyle` | Style for the title text |

## Advanced filtering

By default the filter input field allows you to filter by the option `label`
that's displayed on the screen.

But you can also attach a `searchKey` attribute to
each option for the filtering algorithm to use. For example, we can allow the
user to filter by continent as
well as country name, even though we don't display the continent name:

```js
render() {
  const { visible } = this.state;

  const options = [
    {
      key: 'kenya',
      label: 'Kenya',
      searchKey: 'Africa',
    },
    {
      key: 'uganda',
      label: 'Uganda',
      searchKey: 'Africa',
    },
    {
      key: 'libya',
      label: 'Libya',
      searchKey: 'Africa',
    },
    {
      key: 'japan',
      label: 'Japan',
      searchKey: 'Asia',
    },
    {
      key: 'estonia',
      label: 'Estonia',
      searchKey: 'Europe',
    },
  ];

  return (
    <View style={styles.container}>
      <ModalFilterPicker
        onSelect={this.onSelect}
        onCancel={this.onCancel}
        options={options}
      />
    </View>
  );
}
```

If you run the above example, you will be able to type `africa` into the filter
input field to see all the countries within Africa.

_Note: Filtering is case-insensitive_

## License

MIT
