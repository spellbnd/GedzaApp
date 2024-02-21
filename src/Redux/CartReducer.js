import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        isModalCartVisible: false,
    },
    reducers: {
        setModalCartVisible: (state, action) => {
            state.isModalCartVisible = action.payload;
        },
        addToCart : (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            }
            else {
                state.cart.push({...action.payload, quantity:1})
            }
        },
        removeFromCart : (state, action) => {
            const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = removeFromCart;
        },
        incrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            itemInCart.quantity++;
        },
        decrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            if (itemInCart.quantity == 1) {
                const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeFromCart;
            }
            else {
                itemInCart.quantity--;
            }
        },
        getTotalAmount: (state) => {
            let total = 0;
            let count = 0;
            state.cart.forEach((item)=>{
                count += 1;
                total += item.quantity * item.price;
            })
            state.total = total;
            state.count = count;
        }
    }
});

export const {setModalCartVisible, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getTotalAmount} = cartSlice.actions;

export default cartSlice.reducer;