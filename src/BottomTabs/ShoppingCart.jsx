import React from 'react';
import {View, Text, StyleSheet, Pressable, Image, ScrollView} from 'react-native';
import IncreaseCount from '../Icons/IncreaseCount';
import DecreaseCount from '../Icons/DecreaseCount';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {incrementQuantity, decrementQuantity} from '../Redux/CartReducer';
import GiftIcon from '../Icons/GiftIcon';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { setCartFocus } from '../Redux/FocusReducer';
import { NativeModules, SafeAreaView, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;

const ShoppingCartScreen = ({navigation}) => {
    const isFocused = useIsFocused();
    const cart = useSelector((state) => state.cart.cart);
    const fullcart = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(setCartFocus(isFocused));
    }, [isFocused])
    const dispatch = useDispatch();
    const IncreaseQuantity = (item) => {
        dispatch(incrementQuantity(item))
    };
    const DecreaseQuantity = (item) => {
        dispatch(decrementQuantity(item))
    };
    return (
        <SafeAreaView style={{
            paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
        }}>
            {
                cart.length == 0 && <View style={styles.empty_cart}>
                    <Text style={{fontWeight: 700, fontSize: 27.2, marginBottom: 8}}>Корзина пустая</Text>
                    <Pressable style={styles.emptyCart_btn} onPress={() => navigation.jumpTo('Меню')}>
                        <Text style={{color: '#cf1c1d', fontSize: 16}}>Вернуться к покупкам</Text>
                    </Pressable>
                </View>
            }
              {
                cart.length != 0 && <View>
                    <ScrollView style={styles.container}>
                <View style={styles.cart_table}>
                    <View style={styles.title_row}>
                        <Pressable onPress={() => navigation.jumpTo('Меню')}>
                        <Image
                        source={require('../../assets/Button.png')}
                        style={{width: 24, height: 24}}/>
                        </Pressable>
                        <Text style={{fontWeight: 700, fontSize: 24, flex: 0.7,}}>Корзина</Text>
                    </View>
                <View>
                    {
                        cart.map(cartitem =>
                            <View style={styles.cartItem} key={cartitem.id}>
                            <Image
                            source={{uri: cartitem.imageLink}}
                            style={styles.cartPhoto}/>
                            <View style={styles.cart_desc}>
                                <View style={styles.product_name}>
                                    <Text style={{fontSize: 18, fontWeight: 700}}>{cartitem.name}</Text>
                                </View>
                                <View style={styles.cartProduct}>
                                    <View style={styles.icon_items}>
                                        <Pressable style={{height: 25, width: 25, backgroundColor:'#EEEEEE', borderRadius: 12.5, padding: 7}} onPress={() => DecreaseQuantity(cartitem)}>
                                        <DecreaseCount/>
                                        </Pressable>
                                        <Text>{cartitem.quantity}</Text>
                                        <Pressable style={{height: 25, width: 25, backgroundColor:'#EEEEEE', borderRadius: 12.5, padding: 7}} onPress={() => IncreaseQuantity(cartitem)}>
                                        <IncreaseCount/>
                                        </Pressable>
                                    </View>
                                    <Text style={styles.price}>{cartitem.price}{'\u20BD'}</Text>
                                </View>
                            </View>
                        </View>
                            )
                    }
                </View>
            </View>
                <View style={styles.cart_total}>
                    <View style={styles.cart_total}>
                        <View style={styles.total_amount}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', lineHeight: 27}}>В корзине: {fullcart.count} товара на {fullcart.total}{'\u20BD'}</Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold', lineHeight: 27}}>Итого: {fullcart.total}{'\u20BD'}</Text>
                        </View>
                    </View>
                    <View style={styles.presentLine}>
                        <View style={styles.gift_line}>
                            <GiftIcon/>
                        </View>
                        {
                            fullcart.total < 2000 && <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 21}}>Добавьте товаров еще на <Text style={{color: '#CF191C'}}>{2000 - fullcart.total}{'\u20BD'}</Text> - и получите подарок!</Text>
                        }
                        {
                            fullcart.total >= 2000 && <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 21}}>Выберите подарок</Text>
                        }
                    </View>
                </View>
        </ScrollView> 
                </View>
            }  
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingRight: 15,
        paddingLeft: 15,
        height: '100%',
        backgroundColor: '#fff',
    },
    title_row: {
        fontWeight: '700',
        margin: 10,
        fontSize: 25,
    },
    btn: {
        borderColor: 'red',
        borderRadius: 15,
        borderWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        lineHeight: 32,
    },
    btn_text: {
        color: 'red',
        fontSize: 16,
    },
    cart_table: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 0,
    },
    title_row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    cartItem: {
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    cart_desc: {
        flex: 1,
        width: '100%'
    },
    cartPhoto: {
        width: 170,
        height: 74,
        resizeMode: 'contain',
    },
    product_name: {
        paddingTop: 10,
        paddingRight: 10,
    },
    cartProduct: {
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon_items: {
        alignItems: 'center',
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between'
    },
    price: {
        marginLeft: 10,
    },
    cart_total: {
        marginTop: 20,
        width: '100%',
    },
    total_amount: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    presentLine: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        rowGap: 12,
        marginBottom: 10,
    },
    gift_line: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    empty_cart: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCart_btn: {
        borderWidth: 1,
        borderColor: '#cf1c1d',
        borderRadius: 15,
        paddingRight: 16,
        paddingLeft: 16,
        lineHeight: 32,
        height: 32,
    }
});

export default ShoppingCartScreen;

