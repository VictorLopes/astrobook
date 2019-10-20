import React, { Component } from 'react'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import {
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Platform,
  ImageBackground,
  Dimensions
} from 'react-native';

import Toast from 'react-native-root-toast'

// Components
import ButtonPrimary from '@components/ButtonPrimary';
import ButtonLink from '@components/ButtonLink';
import InputBasic from '@components/InputBasic';

// Constants
import IMAGES from '@constants/images';
import COLORS from '@constants/colors';

class ForgotPassword extends Component {
  state = {
    resetPasswordLoader: false,
    email: '',
  }

  resetPassword = () => {
    const { email } = this.state;

    if (!email)
      return Toast.show('Digite seu e-mail')

    this.props.resetPassword(email);
    Keyboard.dismiss()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={IMAGES.SPLASH_BACKGROUND}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            backgroundColor: '#000',
            opacity: 0.95,
            position: 'absolute',
          }}
        />

        <KeyboardAvoidingView
          enabled={Platform.OS == 'ios'}
          style={{
            flex: 1,
          }}
          behavior="padding"
        >

          <View
            style={{
              flex: 3,
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Image
              source={IMAGES.LOGO}
            />
          </View>

          <View
            style={{
              flex: 7,
              justifyContent: 'center',
              paddingHorizontal: 34
            }}
          >
            <InputBasic
              placeholder='e-mail'
              keyboardType='email-address'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              inputBackgroundColor={COLORS.GRAY_INPUT_COLOR}
              inputTextColor={COLORS.PRIMARY_BUTTON_TEXT_COLOR}
              textColor={COLORS.PRIMARY_TEXT}
            />

            <ButtonPrimary
              loading={this.props.resetPasswordLoader}
              title='enviar'
              onPress={() => this.resetPassword()}
              loadingProps={{ color: COLORS.GRAY_INPUT_COLOR, size: 'small' }}
              buttonBackgroundColor={COLORS.PRIMARY_BUTTON_BACKGROUND_COLOR}
              buttonTextColor={COLORS.SECONDARY_BUTTON_TEXT_COLOR}
            />

          </View>

          <View
            style={{
              flex: 2,
              flexDirection: 'column',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end'
              }}>
              <ButtonPrimary
                title='cancelar'
                onPress={() => this.props.navigation.goBack()}
                buttonBackgroundColor={COLORS.BLACK_BUTTON_COLOR}
                buttonTextColor={COLORS.PRIMARY_BUTTON_TEXT_COLOR}
              />
            </View>
          </View>

        </KeyboardAvoidingView>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  resetPasswordLoader: state.user.resetPasswordLoader,
})

const mapDispatchToProps = dispatch => ({
  resetPassword(email) {
    dispatch({
      type: 'USER_RESET_PASSWORD_TRIGGER',
      email
    });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ForgotPassword))
