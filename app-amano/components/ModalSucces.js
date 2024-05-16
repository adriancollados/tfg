// SuccessModal.js
import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <MaterialIcons name="check-circle" size={24} color="green" />
          <Text style={styles.modalText}>Añadido al carrito</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'green',
  },
  modalText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'green',
  },
});

export default SuccessModal;
