import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// https://medium.com/@buchereli/how-to-react-native-date-picker-872c600af41b
export default function DatePicker({ date, onChange, onClose }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onClose}>
      {Platform.OS === 'ios' && (
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
      <DateTimePicker
        value={date}
        display="default"
        onChange={onChange}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // justifyContent: 'flex-end',
    // width: '100%',
    // height: '100%',
  },
  header: {
    width: '100%',
    padding: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'grey',
  }
})