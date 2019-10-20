import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'

// Constants
import COLORS from '@constants/colors';

const ButtonPrimary = ({ buttonStyle, leftIcon, ...props }) => {

  if (leftIcon != undefined && leftIcon != null) {
    props.icon = (
      <Icon
        type='material-community'
        name='facebook'
        color={props.buttonTextColor}
        containerStyle={{
          marginRight: 10
        }}
      />
    )
  }

  return (
    <Button
      {...props}
      activeOpacity={0.9}
      TouchableComponent={TouchableOpacity}
      titleStyle={{
        color: props.buttonTextColor,
        fontWeight: 'normal',
        fontSize: 14
      }}
      loading={props.loading}
      disabled={props.disabled || props.loading}
      loadingProps={{ color: '#FFF', size: 'large' }}
      disabledStyle={{
        backgroundColor: props.buttonBackgroundColor,
        opacity: 0.7
      }}
      buttonStyle={[
        {
          elevation: 0,
          backgroundColor: props.buttonBackgroundColor,
          borderRadius: 0,
          borderColor: 'transparent',
          borderWidth: 0,
          height: 50
        },
        buttonStyle && buttonStyle
      ]}
    />
  )

}

export default ButtonPrimary;
