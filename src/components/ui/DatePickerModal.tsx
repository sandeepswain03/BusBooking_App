import { View, Platform, Modal, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  selectedDate: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onConfirm,
  selectedDate,
}: DatePickerModalProps) => {
  const [tempdate, setTempDate] = useState(selectedDate);

  if (Platform.OS === 'android') {
    return (
      <DateTimePicker
        value={tempdate}
        mode="date"
        display="default"
        onChange={(event, date) => {
          if (date) {
            setTempDate(date);
            onConfirm(date);
            onClose();
          }
        }}
      />
    );
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View
        className="flex-1 justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View className="bg-white p-4 rounded-3xl mx-2">
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={tempdate}
              mode="date"
              display="spinner"
              onChange={(event, date) => date && setTempDate(date)}
            />
          )}

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="p-3 bg-gray-300 rounded-lg flex-1 mx-2"
            >
              <Text className="text-center text-black font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onConfirm(tempdate);
                onClose();
              }}
              className="p-3 bg-blue-500 rounded-lg flex-1 mx-2"
            >
              <Text className="text-center text-white font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;
