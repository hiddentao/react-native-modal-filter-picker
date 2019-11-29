import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const borderRadius = Platform.OS === 'ios' ? 5 : 0;
const textColor = 'rgb(0,122,255)';
const selectedTextColor = '#999';

const optionStyle = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
};

const optionTextStyle = {
  flex: 1,
  textAlign: 'center',
  fontSize: 18,
  ...Platform.select({
    android: {
      color: '#000',
    },
    ios: {
      color: textColor,
    },
  }),
};

export default StyleSheet.create({
  loadingIndicator: {
    flex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    flex: 0,
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
    width: width * 0.8,
    maxHeight: height * 0.7,
    backgroundColor: '#fff',
    borderRadius,
    ...Platform.select({
      android: {
        marginBottom: 0,
        borderBottomWidth: 0,
      },
      ios: {
        marginBottom: 15,
      },
    }),
  },
  cancelContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius,
    width: width * 0.8,
    ...Platform.select({
      android: {
        borderTopWidth: 1,
        borderTopColor: '#999',
      },
      ios: {
      },
    }),
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: textColor,
  },
  filterTextInputContainer: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  filterTextInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    height: 50,
  },
  categoryStyle: {
    ...optionStyle,
  },
  categoryTextStyle: {
    ...optionTextStyle,
    color: '#999',
    fontStyle: 'italic',
    fontSize: 16,
  },
  optionStyle: {
    ...optionStyle,
  },
  optionStyleLastChild: {
    borderBottomWidth: 0,
  },
  optionTextStyle: {
    ...optionTextStyle,
  },
  selectedOptionStyle: {
    ...optionStyle,
  },
  selectedOptionStyleLastChild: {
    borderBottomWidth: 0,
  },
  selectedOptionTextStyle: {
    ...optionTextStyle,
    fontWeight: '700',
    color: selectedTextColor,
  },
  noResults: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  noResultsText: {
    flex: 1,
    textAlign: 'center',
    color: '#ccc',
    fontStyle: 'italic',
    fontSize: 22,
  },
});
