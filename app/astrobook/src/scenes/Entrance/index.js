import React, { Component } from 'react'
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
  SafeAreaView,
  
} from 'react-native';

import Toast from 'react-native-root-toast'

// Components
import ButtonPrimary from '@components/ButtonPrimary';
import ButtonLink from '@components/ButtonLink';
import InputBasic from '@components/InputBasic';

// Constants
import IMAGES from '@constants/images';
import COLORS from '@constants/colors';

class Entrance extends Component {
  state = {
    email: '',
    password: ''
  }

  login = () => {
    const { email, password } = this.state;

    if (!email)
      return Toast.show('Digite seu e-mail')

    if (!password)
      return Toast.show('Digite sua senha')

    Keyboard.dismiss()
    this.props.login({ email, password });
  }

  render() {
    return (
      <SafeAreaView  style={{ flex: 1, backgroundColor:COLORS.DEEP_GRAY_BACKGROUND }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent={true}
        />
        <ImageBackground
          source={IMAGES.SPLASH_BACKGROUND}
          style={{
            width: Dimensions.get('screen').width,
            height: '100%',
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
              autoCapitalize='none'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              inputBackgroundColor={COLORS.GRAY_INPUT_COLOR}
              inputTextColor={COLORS.PRIMARY_BUTTON_TEXT_COLOR}
              textColor={COLORS.PRIMARY_TEXT}
              inputContainerStyle={{ height: undefined }}
            />

            <InputBasic
              placeholder='senha'
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              inputBackgroundColor={COLORS.BLACK_INPUT_COLOR}
              inputTextColor={COLORS.PRIMARY_INPUT_TEXT_COLOR}
              textColor={COLORS.PRIMARY_TEXT}
              inputContainerStyle={{ height: undefined }}
            />

            <ButtonPrimary
              title='entrar'
              onPress={this.login}
              loading={this.props.loading}
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
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 34

              }}>
              <ButtonLink
                containerStyle={{
                  flex: 1,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
                title='Criar conta'
                buttonTextColor={COLORS.WHITE_BUTTON_TEXT_COLOR}
                onPress={() => this.props.navigation.navigate('CreateAccount')}
              />
              <ButtonLink
                containerStyle={{
                  flex: 1,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 4
                }}
                title='Esqueci a senha'
                buttonTextColor={COLORS.WHITE_BUTTON_TEXT_COLOR}
                onPress={() => this.props.navigation.navigate('EntranceForgotPassword')}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end'
              }}>
              <ButtonPrimary
                title='entrar com o facebook'
                onPress={this.props.loginWithFacebook}
                buttonBackgroundColor={COLORS.BLACK_BUTTON_COLOR}
                buttonTextColor={COLORS.PRIMARY_BUTTON_TEXT_COLOR}
                leftIcon={IMAGES.FACEBOOK_ICON}
              />
            </View>
          </View>

        </KeyboardAvoidingView>

      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading
})

const mapDispatchToProps = dispatch => ({
  login(payload) {
    dispatch({ type: 'USER_LOGIN_TRIGGER', payload });
  },
  loginWithFacebook() {
    dispatch({ type: 'USER_LOGIN_FACEBOOK_TRIGGER' });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Entrance)
