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
  ScrollView,

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
    this.props.login({ email, password })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#dedede' }}>
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

          <View
            style={{
              flex: 7,
              justifyContent: 'center',
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

            <InputBasic
              placeholder='Senha'
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              inputBackgroundColor='#FFF'
              inputTextColor={COLORS.PRIMARY_INPUT_TEXT_COLOR}
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
              title='ENTRAR'
              onPress={this.login}
              loading={this.props.loading}
              loadingProps={{ color: '#FFF', size: 'small' }}
              buttonBackgroundColor={COLORS.PURPLE_DARK}
              buttonTextColor='#FFF'
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
                buttonTextColor={COLORS.PURPLE_DARK}
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
                buttonTextColor={COLORS.PURPLE_DARK}
                onPress={() => this.props.navigation.navigate('EntranceForgotPassword')}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end'
              }}>
              <ButtonPrimary
                title='Entrar com o Facebook'
                onPress={this.props.loginWithFacebook}
                buttonBackgroundColor={COLORS.PURPLE_DARK}
                buttonTextColor='#FFF'
                leftIcon={IMAGES.FACEBOOK_ICON}
              />
            </View>
          </View>
        </ScrollView>
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
