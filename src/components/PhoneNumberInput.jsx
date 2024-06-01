import * as React from 'react';
import MaskInput from 'react-native-mask-input';

function PhoneNumberInput() {
  const [phone, setPhone] = React.useState('');

  return (
    <MaskInput
      value={phone}
      onChangeText={(masked, unmasked) => {
        setPhone(masked); // you can use the unmasked value as well

        // assuming you typed "9" all the way:
        console.log(masked); // (99) 99999-9999
        console.log(unmasked); // 99999999999
      }}
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
      style={{
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#dedede',
        marginVertical: 10,
        paddingHorizontal: 8,
        fontSize: 18,
        color: '#000',
        height: 40,
      }}
      placeholderFillCharacter="0"
    />
  );
}

export default PhoneNumberInput;
