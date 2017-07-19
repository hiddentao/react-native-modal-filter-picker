import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const optionStyle = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee'
}

const optionTextStyle = {
  flex: 1,
  textAlign: 'left',
  color: '#000',
  fontSize: 22
}

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTextStyle: {
    flex: 0,
    color: '#fff',
    fontSize: 20,
    marginBottom: 15
  },
  listContainer: {
    flex: 1,
    width: width * 0.8,
    maxHeight: height * 0.7,
    backgroundColor: '#fff',
    borderRadius: 0,
    marginBottom: 15
  },
  cancelContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelButton: {
    flex: 0,
    backgroundColor: '#999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 18
  },
  filterTextInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#999'
  },
  filterTextInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 0,
    height: 50
  },
  categoryStyle: {
    ...optionStyle
  },
  categoryTextStyle: {
    ...optionTextStyle,
    color: '#999',
    fontStyle: 'italic',
    fontSize: 16
  },
  optionStyle: {
    ...optionStyle
  },
  optionStyleLastChild: {
    borderBottomWidth: 0
  },
  optionTextStyle: {
    ...optionTextStyle
  },
  selectedOptionStyle: {
    ...optionStyle
  },
  selectedOptionStyleLastChild: {
    borderBottomWidth: 0
  },
  selectedOptionTextStyle: {
    ...optionTextStyle,
    fontWeight: '700'
  },
  noResults: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  noResultsText: {
    flex: 1,
    textAlign: 'center',
    color: '#ccc',
    fontStyle: 'italic',
    fontSize: 22
  }
})
