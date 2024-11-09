import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { Portal } from 'react-native-paper';


const FullScreenLoader = ({  }) => {
    return (
      <Portal>
        <Modal
          transparent={true}
          visible={true}
          animationType="none"
        >
          <View style={styles.container}>
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.text}>Loading...</Text>
            </View>
          </View>
        </Modal>
      </Portal>
    );
  };


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    loader: {
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },
    text: {
      marginTop: 10,
      fontSize: 16,
      color: '#000000',
    },
  });
  
  export default FullScreenLoader;