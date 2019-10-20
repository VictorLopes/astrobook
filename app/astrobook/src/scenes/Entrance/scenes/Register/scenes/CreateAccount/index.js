import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
,

} from 'react-native';
import Toast from 'react-native-root-toast'

import { Icon } from 'react-native-elements'

// Components
import MainHeader from '@components/MainHeader';
import ButtonPrimary from '@components/ButtonPrimary';
import ButtonLink from '@components/ButtonLink';
import InputBasic from '@components/InputBasic';

// Constants
import IMAGES from '@constants/images';
import COLORS from '@constants/colors';
import OutlineInput from '@components/OutlineInput'


class CreateAccount extends Component {
  state = {
    showPassword: false,
    name: '',
    email: '',
    surname: '',
    password: '',
  }

  register = () => {
    const { email, name, surname, password } = this.state

    Keyboard.dismiss()

    if (!name)
      return Toast.show('Preencha o seu nome')
    if (!surname)
      return Toast.show('Preencha o seu sobrenome')
    if (!email)
      return Toast.show('Preencha o seu e-mail')
    if (!password)
      return Toast.show('Preencha o seu senha')

    let payload = {
      name: name,
      surname: surname,
      nickname: '',
      email: email,
      password,
      birthDate: '',
      gender: '',
      phone: '',
    };

    this.props.createAccount(payload)
  }

  render() {
    return (
      <View  style={{
        flex: 1,

      }}>
        <StatusBar
          barStyle='default'
          backgroundColor='transparent'
          translucent={true}
        />
        <Image
          source={IMAGES.SPLASH_BACKGROUND}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            backgroundColor: '#000',
            opacity: 0.95,
            position: 'absolute',
          }}
        />
        <MainHeader
          title='Criar conta'
          backButton={{
            onPress: () => this.props.navigation.navigate('Entrance')
          }}
          statusBar={{
            translucent: true,
            barStyle: 'default',
            backgroundColor: COLORS.PRIMARY_HEADER_BACKGROUND,
            hidden: false
          }}
        />

        <KeyboardAvoidingView
          enabled={Platform.OS == 'ios'}
          style={{ flex: 1 }}
          behavior='padding'
        >

          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
            }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 16,

            }}>

              <Image
                source={IMAGES.LOGO}
              />
            </View>

            <View style={styles.container}>

              <View style={styles.innerContainer}>
                <OutlineInput
                  placeholder='Nome '
                  maxLength={50}
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                  keyboardType='default'
                  containerStyle={{
                    borderColor: '#fff',
                  }}
                  placeholderTextColor='rgba(255,255,255,0.8)'
                  fontColor='#fff'
                />
                <OutlineInput
                  placeholder='Sobrenome '
                  maxLength={50}
                  onChangeText={surname => this.setState({ surname })}
                  value={this.state.surname}
                  keyboardType='default'
                  containerStyle={{
                    borderColor: '#fff',
                  }}
                  placeholderTextColor='rgba(255,255,255,0.8)'
                  fontColor='#fff'
                />
                <OutlineInput
                  placeholder='E-mail'
                  maxLength={50}
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  containerStyle={{
                    borderColor: '#fff',
                  }}
                  placeholderTextColor='rgba(255,255,255,0.8)'
                  fontColor='#fff'

                />
                <OutlineInput
                  placeholder='Senha'
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  keyboardType='default'
                  containerStyle={{
                    borderColor: '#fff',
                  }}
                  placeholderTextColor='rgba(255,255,255,0.8)'
                  fontColor='#fff'
                />

              </View>

            </View>

          </ScrollView>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-end',

            }}>

            <ButtonPrimary
              title='salvar'
              onPress={this.register}
              buttonBackgroundColor={COLORS.PRIMARY_BUTTON_BACKGROUND_COLOR}
              buttonTextColor={COLORS.SECONDARY_BUTTON_TEXT_COLOR}
              loading={this.props.loading}
              loadingProps={{ color: COLORS.SECONDARY_BUTTON_TEXT_COLOR, size: 'small' }}
            />

          </View>

        </KeyboardAvoidingView>

      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.user.loading
});

const mapDispatchToProps = (dispatch) => ({
  createAccount(payload) {
    dispatch({
      type: 'USER_CREATE_ACCOUNT_TRIGGER',
      payload
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  }
});
