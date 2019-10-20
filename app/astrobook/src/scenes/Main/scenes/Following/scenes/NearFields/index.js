import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  StatusBar,
  View,
  ScrollView,
  Text
  
} from 'react-native'


// Components

// Constants
import COLORS from '@constants/colors'
import Header from '@components/Header';

import { Icon, Slider } from 'react-native-elements';
import FieldCard from '../components/FieldCard';



class NearFields extends Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: 1
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.subs = [
        this.props.navigation.addListener('didFocus', () => this.didFocusFunctions()),
      ];
    }, 3000)

    this.didFocusFunctions();
  }

  didFocusFunctions() {
    console.log('[INIT HOME]');
  }

  static getDerivedStateFromProps(props, state) {

    return state;
  }

  render() {

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F2F3F4',
        }}
      >
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#F2F3F4',
            paddingBottom: 20
          }}
        >
          <StatusBar
            backgroundColor={COLORS.PRIMARY}
            barStyle={'light-content'}
          />
          <Header
            title='Campos'
            backButton
            rightComponent={(
              <View style={{ flex: 1, marginRight: -12,marginTop:20 }}>

                <Icon
                  type='material-icon'
                  name='search'
                  color={COLORS.PRIMARY_HEADER_TEXT_COLOR}
                  size={26}
                />
              </View>
            )}
          />
          <View
            style={{
              marginBottom: 16,
              marginHorizontal: 16,
              height: 64,
              backgroundColor: '#fff',
              shadowColor: '#455B63',
              shadowRadius: 3,
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              paddingHorizontal: 16,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                paddingTop: 12,
                color: '#A2A2A2',
                fontSize: 13,
                fontWeight: '400'
              }}
            >
              Defina o raio de busca
          </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: -4
              }}
            >
              <Slider
                minimumValue={1}
                maximumValue={100}
                style={{
                  flex: 9,
                  marginRight: 8
                }}
                onValueChange={(val) => this.setState({ distance: val })}
                step={1}
                value={this.state.distance}
                maximumTrackTintColor='#E8E8E8'
                minimumTrackTintColor={COLORS.PRIMARY}
                thumbTintColor={COLORS.DEEP_GRAY_BACKGROUND}
              />
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.DEEP_GRAY_BACKGROUND,
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: -4
                  }}
                >
                  {`${this.state.distance}km`}
                </Text>
              </View>
            </View>
          </View>
          <FieldCard />
          <FieldCard />

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
  }
}

const mapDispatchToProps = dispatch => ({
  getUserData() {
    dispatch({ type: 'USER_STORAGE_GET_DATA_TRIGGER' })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NearFields));
