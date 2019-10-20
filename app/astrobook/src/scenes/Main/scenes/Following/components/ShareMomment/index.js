import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Icon as IconE, Input } from 'react-native-elements'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FitImage from 'react-native-fit-image';


export default class ShareMomment extends Component {
  render() {
    return (
      <View style={{
        paddingVertical: 24,
        marginHorizontal: 16,
      }}>
        <View style={{
          flexDirection: 'row',
          borderLeftColor: 'rgba(56, 58, 60, 1)',
          borderLeftWidth: 5,
          alignItems: 'center'

        }}>
          <View style={{
            shadowColor: '#455B63',
            shadowRadius: 4,
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
            width: 40,
            height: 40,
            borderRadius: 20,
            marginHorizontal: 8,
            marginBottom: 8,
            backgroundColor: 'white'
          }}>
            <FitImage
              source={{ uri: (this.props.user.photo) ? this.props.user.photo : 'http://agendamentosfpc.2rm.eb.mil.br/img/sem-imagem-avatar.png' }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderColor: '#fff',
                borderWidth: 2
              }}
              borderRadius={20}
            />
          </View>




          <Input
            {...this.props}
            autoCapitalize='none'
            inputStyle={{
              color: '#383A3C',
              fontWeight: '500',
              fontSize: 16,
              paddingTop: 10,
              paddingBottom: 10
            }}
            inputContainerStyle={{
              justifyContent: 'center',
              flex: 1,
              borderColor: 'rgba(255,255,255,0)',
              maxHeight: 100,
            }}
            onFocus={()=> this.props.navigate()}
            containerStyle={[{
              shadowColor: '#455B63',
              shadowRadius: 3,
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              flex: 1,
              backgroundColor: '#fff',
              paddingLeft: 20,
              marginVertical: 6,
              marginTop: 0,
              width: 282,
            }, this.props.containerStyle]}
            autoCorrect={true}
            multiline={true}
            maxLength={255}
            placeholder='Compartilhe seu momento'
            placeholderTextColor='rgba(162, 162, 162, 1)'
            underlineColorAndroid='rgba(0,0,0,0)'
          />


        </View>

       
      </View>
    )
  }
}
