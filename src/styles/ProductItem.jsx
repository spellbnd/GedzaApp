import { StyleSheet } from 'react-native';

export const ProductStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 70,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
  },
  header__logo: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
  },
  product_item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 0,
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  product_name: {
    fontWeight: '700',
    fontSize: 18,
  },
  product_desc: {
    flexDirection: 'column',
    width: '50%',
  },
  sostav: {
    fontSize: 14,
    color: '#aeaeae',
    marginBottom: 5,
    overflow: 'hidden',
    lineHeight: 21,
  },
  img: {
    width: '50%',
    marginLeft: 'auto',
    maxWidth: 180,
    position: 'relative',
  },
  img_inside: {
    width: '100%',
    height: 120,
  },
  product_addButton: {
    backgroundColor: '#aa0000',
    height: 32,
    width: 100,
    marginRight: 10,
    fontSize: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginTop: 5,
  },
  product_addButton_text: {
    color: 'white',
  },
  oldprice: {
    textDecorationLine: 'line-through',
    width: 100,
    textAlign: 'center',
  },
});
