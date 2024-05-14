import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import giftList from "../data/gift.json";
import CrossGiftIcon from "../Icons/CrossGiftIcon";

import {
  setGiftVisible,
  addToCart,
  removeFromCart,
} from "../Redux/CartReducer";

const WIDTH = Dimensions.get("window").width;

function GiftChoose() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isGiftVisible);
  const cart = useSelector((state) => state.cart.cart);
  const giftCart = cart.find((item) => Object.prototype.hasOwnProperty.call(item, "gift"));
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modal_view}>
        <View style={styles.modal_view_inside}>
          <Pressable
            style={{
              position: "absolute",
              right: 10,
              top: 20,
              padding: 10,
              zIndex: 5,
            }}
            onPress={() => dispatch(setGiftVisible(false))}
          >
            <CrossGiftIcon />
          </Pressable>
          <Text style={{ textAlign: "center", fontSize: 24, fontWeight: 700 }}>
            Выберите подарок!
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {giftList.map((giftItem) => (
              <View style={styles.productListElement} key={giftItem.id}>
                <View style={{ width: "50%", flexShrink: 2 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {giftItem.name}
                  </Text>
                  <View style={{ marginBottom: 5 }}>
                    {Object.prototype.hasOwnProperty.call(
                      giftItem,
                      "sostav",
                    ) && (
                      <Text numberOfLines={3} style={{ color: "#AEAEAE" }}>
                        {giftItem.sostav}
                      </Text>
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      style={styles.chooseGiftBtn}
                      onPress={() => {
                        if (giftItem?.id === giftCart?.id) {
                          dispatch(removeFromCart(giftItem));
                        } else {
                          dispatch(addToCart(giftItem));
                        }
                      }}
                    >
                      {giftItem?.id === giftCart?.id && (
                        <Text style={{ color: "#fff" }}>Выбрать другой</Text>
                      )}
                      {giftItem?.id !== giftCart?.id && (
                        <Text style={{ color: "#fff" }}>Выбрать</Text>
                      )}
                    </Pressable>
                  </View>
                </View>
                <View style={styles.img}>
                  <Image
                    width={160}
                    height={120}
                    resizeMode="contain"
                    source={{
                      uri: giftItem.imageLink,
                    }}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default GiftChoose;

const styles = StyleSheet.create({
  modal_view: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.50196)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modal_view_inside: {
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    rowGap: 30,
    width: WIDTH - 20,
    marginTop: 40,
    marginBottom: 40,
  },
  productListElement: {
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    borderBottomColor: "rgba(0,0,0, 0.08)",
    borderBottomWidth: 1,
    columnGap: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  chooseGiftBtn: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 19,
    paddingRight: 19,
    borderColor: "#cf1c1d",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#cf1c1d",
  },
  img: {
    width: "50%",
  },
});
