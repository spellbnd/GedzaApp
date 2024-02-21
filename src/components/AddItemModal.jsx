import React, {useState} from 'react';
import {Modal, Text, View, StyleSheet, Image, Pressable, Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
console.log(`YES!: ${HEIGHT}`);


const AddItemModal = (props) => {
    const isVisible = useSelector((state) => state.cart.isModalCartVisible);
    return ( isVisible &&
          <View style={styles.modalView} visible={isVisible}>
            <Text style={styles.modalText}>Товар добавлен</Text>
          </View>
  );
};

const styles = StyleSheet.create({
    modalBackground: {
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40,
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        position: 'absolute',
        zIndex: 30,
        left: WIDTH/2 -85,
        right: WIDTH/2 - 85,
        bottom: 65,
        width: 170,
        height: 32,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        fontSize: 14,
        textAlign: 'center',
      },
});

export default AddItemModal;