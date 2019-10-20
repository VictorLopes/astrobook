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
  Dimensions,
  ScrollView
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
      <View style={{ flex: 1, backgroundColor: '#dedede' }}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='transparent'
          translucent={true}
        />
        <ScrollView
          contentContainerStyle={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 3,
              justifyContent: 'flex-end',
              alignItems: 'center',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,

              elevation: 11,
            }}
          >
            <Image
              style={{
                width: 200,
                height: 130,

              }}
              resizeMode='center'
              source={IMAGES.LOGO}
            />
          </View>
          <Text
            style={{
              fontSize: 22,
              color: '#343434',
              textAlign: 'center',
              paddingVertical: 20,
              marginHorizontal: 20
            }}
          >
            {`Digite seu e-mail para recuperar sua senha!`}
          </Text>

          <View
            style={{
              flex: 6,
              justifyContent: 'flex-start',
              paddingHorizontal: 34
            }}
          >
            <InputBasic
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              inputBackgroundColor='#FFF'
              inputTextColor={COLORS.PRIMARY_BUTTON_TEXT_COLOR}
              textColor='#343434'
              inputContainerStyle={{ height: undefined }}
              placeholderTextColor='rgba(0,0,0,0.5)'
            />

            <View
              style={{
                marginVertical: 12
              }}
            />

            <ButtonPrimary
              title='Recuperar'
              onPress={this.resetPassword}
              loading={this.props.loading}
              loadingProps={{ color: COLORS.GRAY_INPUT_COLOR, size: 'small' }}
              buttonBackgroundColor={COLORS.PURPLE_DARK}
              buttonTextColor='#FFF'
            />

          </View>


          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end'
            }}>
            <ButtonPrimary
              title='Cancelar'
              onPress={() => this.props.navigation.goBack()}
              buttonBackgroundColor={COLORS.PURPLE_DARK}
              buttonTextColor='#FFF'

            />
          </View>

        </ScrollView>
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
