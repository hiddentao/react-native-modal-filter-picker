import React, { Component, PropTypes } from 'react'
import { Modal, View, ListView, TouchableOpacity, Text, TextInput } from 'react-native'

import styles from './styles'

export default class ModalPicker extends Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.key !== r2.key
      }),
      filter: ''
    }

    // inital data
    this.state.ds = this.state.ds.cloneWithRows(props.options)
  }

  componentWillReceiveProps (newProps) {
    const newState = {}

    // if becoming visible OR data has changed
    if ((!this.props.visible && newProps.visible) || (this.props.options !== newProps.options)) {
      newState.filter = ''
      newState.ds = this.state.ds.cloneWithRows(newProps.options)
    }

    this.setState(newState)
  }

  render () {
    const {
      title,
      titleTextStyle,
      overlayStyle,
      cancelContainerStyle,
      renderList,
      renderCancelButton,
      visible,
      modal
    } = this.props

    return (
      <Modal {...modal} visible={visible}>
        <View style={[styles.overlay, overlayStyle]}>
          { title ? <Text style={[styles.titleTextStyle, titleTextStyle]}>{title}</Text> : null }
          {(renderList || this.renderList)()}
          <View style={[styles.cancelContainer, cancelContainerStyle]}>
            {(renderCancelButton || this.renderCancelButton)()}
          </View>
        </View>
      </Modal>
    )
  }

  renderList = () => {
    const {
      showFilter,
      listContainerStyle,
      androidUnderlineColor,
      placeholderText,
      placeholderTextColor,
      filterTextInputContainerStyle,
      filterTextInputStyle
    } = this.props

    return (
      <View style={[styles.listContainer, listContainerStyle]}>
        {showFilter ? (
          <View style={[styles.filterTextInputContainer, filterTextInputContainerStyle]}>
            <TextInput
              onChangeText={this.onFilterChange}
              autoCorrect={false}
              blurOnSubmit={true}
              autoCapitalize="none"
              underlineColorAndroid={androidUnderlineColor}
              placeholderTextColor={placeholderTextColor}
              placeholder={placeholderText}
              style={[styles.filterTextInput, filterTextInputStyle]} />
          </View>
        ) : null}
        {this.renderOptionList()}
      </View>
    )
  }

  renderOptionList = () => {
    const { noResultsText } = this.props

    const { ds } = this.state

    if (1 > ds.getRowCount()) {
      return (
        <ListView
          dataSource={ds.cloneWithRows([{ key: '_none' }])}
          renderRow={() => (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>{noResultsText}</Text>
            </View>
          )}
        />
      )
    } else {
      return (
        <ListView
          dataSource={ds}
          renderRow={this.renderOption}
        />
      )
    }
  }

  renderOption = (rowData) => {
    const {
      selectedOption,
      renderOption
    } = this.props

    const { key, label } = rowData

    let style = styles.optionStyle
    let textStyle = styles.optionTextStyle

    if (key === selectedOption) {
      style = styles.selectedOptionStyle
      textStyle = styles.selectedOptionTextStyle
    }

    if (renderOption) {
      return renderOption(rowData, key === selectedOption)
    } else {
      return (
        <TouchableOpacity activeOpacity={0.6}
          style={style}
          onPress={() => this.props.onSelect(key)}
        >
          <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
      )
    }
  }

  renderCancelButton = () => {
    const {
      cancelButtonStyle,
      cancelButtonTextStyle,
      cancelButtonText
    } = this.props

    return (
      <TouchableOpacity onPress={this.props.onCancel}
        activeOpacity={0.6}
        style={[styles.cancelButton, cancelButtonStyle]}
      >
        <Text style={[styles.cancelButtonText, cancelButtonTextStyle]}>{cancelButtonText}</Text>
      </TouchableOpacity>
    )
  }

  onFilterChange = (text) => {
    const filter = text.toLowerCase()
    const { options } = this.props

    // apply filter to incoming data
    const filtered = (!filter.length)
      ? options
      : options.filter(({ category, label, key }) => (
        0 <= label.toLowerCase().indexOf(filter) ||
        (category && 0 === category.toLowerCase().indexOf(filter))
      ))

    this.setState({
      filter: text.toLowerCase(),
      ds: this.state.ds.cloneWithRows(filtered)
    })
  }
}

ModalPicker.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  androidUnderlineColor: PropTypes.string,
  cancelButtonText: PropTypes.string,
  noResultsText: PropTypes.string,
  visible: PropTypes.bool,
  showFilter: PropTypes.bool,
  modal: PropTypes.object,
  selectedValue: PropTypes.any,
  renderOption: PropTypes.func
}

ModalPicker.defaultProps = {
  placeholderText: 'Filter...',
  placeholderTextColor: '#ccc',
  androidUnderlineColor: 'rgba(0,0,0,0)',
  cancelButtonText: 'Cancel',
  noResultsText: 'No matches',
  visible: true,
  showFilter: true,
  modal: {},
  selectedValue: null,
  renderOption: null,
}
