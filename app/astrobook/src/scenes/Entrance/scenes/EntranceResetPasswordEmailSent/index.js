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

class Entrance extends Component {
    constructor(props) {
      super(props);

      this.state = {}
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

            <Text
                style={{
                    fontSize: 22,
                    color: COLORS.PRIMARY_TEXT,
                    textAlign: 'center'
                }}
            >
                Um e-mail foi enviado para:
            </Text>

            <Text
                style={{
                    fontSize: 22,
                    color: COLORS.PRIMARY_TEXT,
                    textAlign: 'center'
                }}
            >
                { ` ${this.props.navigation.getParam('email')}` }
            </Text>

            <Text
                style={{
                    fontSize: 15,
                    color: COLORS.PRIMARY_TEXT,
                    textAlign: 'center',
                    fontWeight:'300',
                    marginTop: 10
                }}
            >
                { `Caso não tenha recebido, verifique também a caixa de spam.` }
            </Text>

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
                title='Voltar para o Login'
                onPress={() => this.props.navigation.navigate('Entrance')}
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
  resetPasswordLoader: state.user.resetPasswordLoader
})

const mapDispatchToProps = dispatch => ({
  resetPassword(email) {
    dispatch({
        type: 'USER_RESET_PASSWORD_TRIGGER',
        email
    });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Entrance))
