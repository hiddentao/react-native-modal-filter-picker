import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

const numOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);
export default class ModalFilterPicker extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: numOrString,
        searchKey: numOrString,
        label: numOrString,
      }),
    ),
    onSelect: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    placeholderText: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    androidUnderlineColor: PropTypes.string,
    cancelButtonText: PropTypes.string,
    title: PropTypes.string,
    noResultsText: PropTypes.string,
    visible: PropTypes.bool,
    showFilter: PropTypes.bool,
    modal: PropTypes.object,
    selectedOption: PropTypes.string,
    renderOption: PropTypes.func,
    renderCancelButton: PropTypes.func,
    renderList: PropTypes.func,
    flatListViewProps: PropTypes.object,
    filterTextInputContainerStyle: PropTypes.any,
    filterTextInputStyle: PropTypes.any,
    cancelContainerStyle: PropTypes.any,
    cancelButtonStyle: PropTypes.any,
    cancelButtonTextStyle: PropTypes.any,
    titleTextStyle: PropTypes.any,
    overlayStyle: PropTypes.any,
    listContainerStyle: PropTypes.any,
    optionTextStyle: PropTypes.any,
    selectedOptionTextStyle: PropTypes.any,
    keyboardShouldPersistTaps: PropTypes.string,
    autoFocus: PropTypes.bool,
    keyExtractor: PropTypes.func,
    asyncTimeout: PropTypes.number,
    onFilterChangeAsync: PropTypes.func,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    options: [],
    filterTextInputContainerStyle: null,
    filterTextInputStyle: null,
    cancelContainerStyle: null,
    cancelButtonStyle: null,
    cancelButtonTextStyle: null,
    titleTextStyle: null,
    overlayStyle: null,
    listContainerStyle: null,
    optionTextStyle: null,
    selectedOptionTextStyle: null,
    placeholderText: 'Filter...',
    placeholderTextColor: '#ccc',
    androidUnderlineColor: 'rgba(0,0,0,0)',
    cancelButtonText: 'Cancel',
    noResultsText: 'No matches',
    visible: true,
    showFilter: true,
    keyboardShouldPersistTaps: 'never',
    autoFocus: false,
    keyExtractor: (item, index) => index,
    asyncTimeout: 700,
    onFilterChangeAsync: null,
    isLoading: false,
  }

  constructor(props, ctx) {
    super(props, ctx);

    this.state = {
      filter: '',
      ds: props.options,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      options,
      visible,
      onFilterChangeAsync,
    } = this.props;
    const oldFirst = prevProps.options[0] || {};
    const newFirst = options[0] || {};
    const enabledAsyncLoading = !!onFilterChangeAsync;
    if ((!prevProps.visible && visible)
      || (prevProps.options.length !== options.length)
      || (oldFirst.key && oldFirst.key !== newFirst.key)) {
      this.setState((prevState) => ({
        filter: enabledAsyncLoading ? prevState.filter : '',
        ds: options,
      }));
    }
    if (!prevProps.visible
      && visible
      && onFilterChangeAsync) {
      onFilterChangeAsync('', options);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.filterTimer);
  }

  render() {
    const {
      title,
      titleTextStyle,
      overlayStyle,
      cancelContainerStyle,
      renderList,
      renderCancelButton,
      modal,
      onCancel,
      visible,
    } = this.props;

    const renderedTitle = (!title) ? null : (
      <Text style={[styles.titleTextStyle, titleTextStyle]}>{title}</Text>
    );

    return (
      <Modal
        onRequestClose={onCancel}
        {...modal}
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={[styles.overlay, overlayStyle]}
          enabled={Platform.OS === 'ios'}
        >
          <View>{renderedTitle}</View>
          {(renderList || this.renderList)()}
          <View style={[styles.cancelContainer, cancelContainerStyle]}>
            {(renderCancelButton || this.renderCancelButton)()}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  renderList = () => {
    const {
      showFilter,
      autoFocus,
      listContainerStyle,
      androidUnderlineColor,
      placeholderText,
      placeholderTextColor,
      filterTextInputContainerStyle,
      filterTextInputStyle,
      isLoading,
    } = this.props;
    const { filter } = this.state;

    const filterInput = (!showFilter) ? null : (
      <View style={[styles.filterTextInputContainer, filterTextInputContainerStyle]}>
        <TextInput
          onChangeText={this.onFilterChange}
          autoCorrect={false}
          blurOnSubmit
          autoFocus={autoFocus}
          autoCapitalize="none"
          underlineColorAndroid={androidUnderlineColor}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholderText}
          value={filter}
          style={[styles.filterTextInput, filterTextInputStyle]}
        />
        {isLoading && <ActivityIndicator style={[styles.filterTextInput, styles.loadingIndicator]} />}
      </View>
    );

    return (
      <View style={[styles.listContainer, listContainerStyle]}>
        {filterInput}
        {this.renderOptionList()}
      </View>
    );
  };

  renderOptionList = () => {
    const {
      noResultsText,
      keyboardShouldPersistTaps,
      flatListViewProps,
      keyExtractor,
    } = this.props;

    const { ds } = this.state;

    if (!ds.length) {
      return (
        <FlatList
          data={ds}
          keyExtractor={keyExtractor}
          enableEmptySections={false}
          {...flatListViewProps}
          renderItem={() => (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>{noResultsText}</Text>
            </View>
          )}
        />
      );
    }
    return (
      <FlatList
        keyExtractor={keyExtractor}
        enableEmptySections={false}
        {...flatListViewProps}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        data={ds}
        renderItem={this.renderOption}
      />
    );
  };

  renderOption = ({ item }) => {
    const {
      selectedOption,
      renderOption,
      optionTextStyle,
      selectedOptionTextStyle,
      onSelect,
    } = this.props;

    const { key, label } = item;

    let style = styles.optionStyle;
    let textStyle = [styles.optionTextStyle, optionTextStyle];

    if (key === selectedOption) {
      style = styles.selectedOptionStyle;
      textStyle = [styles.selectedOptionTextStyle, selectedOptionTextStyle];
    }

    if (renderOption) {
      return renderOption(item, key === selectedOption);
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={style}
        onPress={() => onSelect(item)}
      >
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  renderCancelButton = () => {
    const {
      cancelButtonStyle,
      cancelButtonTextStyle,
      cancelButtonText,
      onCancel,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onCancel}
        activeOpacity={0.7}
        style={[styles.cancelButton, cancelButtonStyle]}
      >
        <Text style={[styles.cancelButtonText, cancelButtonTextStyle]}>{cancelButtonText}</Text>
      </TouchableOpacity>
    );
  };

  onFilterChange = async (text) => {
    const { options, onFilterChangeAsync, asyncTimeout } = this.props;
    const filter = text.toLowerCase();
    let filtered = options;
    if (onFilterChangeAsync) {
      clearTimeout(this.filterTimer);
      this.filterTimer = setTimeout(() => onFilterChangeAsync(filter, options), asyncTimeout);
    }
    // apply filter to incoming data
    filtered = (!filter.length)
      ? options
      : options.filter(({ searchKey, label }) => (
        label.toLowerCase().indexOf(filter) >= 0
          || (searchKey && searchKey.toLowerCase().indexOf(filter) >= 0)
      ));
    this.setState({
      filter: text,
      ds: filtered,
    });
  }
}
