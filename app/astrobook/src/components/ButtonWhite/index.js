import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

// Constants
import COLORS from '@constants/colors';

const ButtonWhite = ({ buttonStyle, ...props }) => (
    <Button
        {...props}
        activeOpacity={0.9}
        TouchableComponent={TouchableOpacity}
        titleStyle={{
            color: '#888888',
            fontWeight: 'normal',
            fontSize: 14
        }}
        buttonStyle={[{
            elevation: 0,
            backgroundColor: '#fff',
            borderRadius: 27,
            borderColor: 'transparent',
            borderWidth: 0,
            height: 46
        },
            buttonStyle && buttonStyle
        ]}
        disabledStyle={{
            backgroundColor: '#ffffff90'
        }}
        disabledTitleStyle={{
            color: '#88888890',
            fontWeight: 'normal',
            fontSize: 14
        }}
    />
);

export default ButtonWhite;
