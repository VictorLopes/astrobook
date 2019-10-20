import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';

import COLORS from '@constants/colors'

export default InputBasic = ({ rightButton, inputRef, ...props }) => {
    // Right button (icon)
    if (rightButton != undefined && rightButton != null) {
        props.rightIconContainerStyle = { marginRight: 24 };
        props.rightIcon = (
            <TouchableOpacity
                onPress={rightButton.onPress}
                activeOpacity={0.8}>
                <Text style={{ fontSize: 13, color: props.textColor }}>
                    {rightButton.title}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <Input
            {...props}
            ref={inputRef}
            containerStyle={[
                {
                    // borderColor: '#00000010',
                    backgroundColor: props.inputBackgroundColor,
                    paddingHorizontal: 16,
                    width: '100%'
                },
                props.containerStyle
            ]}
            inputContainerStyle={[
                {
                    height: 48,
                    borderBottomWidth: 0,
                    borderRadius: 12,
                },
                props.inputContainerStyle
            ]}
            inputStyle={[
                {
                    color: props.textColor,
                    fontSize: 14,
                    height: 48,
                    padding: 0,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    textAlign: 'center'
                },
                props.inputStyle
            ]}
            placeholderTextColor={props.placeholderTextColor || props.textColor}
        />
    )
}
