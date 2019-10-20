import React, { Component } from 'react'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'

import {
  Icon,
  ListItem
} from 'react-native-elements'

import {
  NavigationActions
} from 'react-navigation'

// Components
import MainHeader from '@components/MainHeader'
import AvatarProfile from '@components/AvatarProfile'

import COLORS from '@constants/colors'
import IMAGES from '@constants/images'



class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      items: [
        {
          id: 1,
          title: 'Campos de Golfe',
          icon: 'FIELDS',
          slug: 'fields',
          screen: 'Fields'
        },
        {
          id: 2,
          title: 'Histórico de jogos',
          icon: 'HISTORY',
          slug: 'history',
          screen: 'History'
        },
        {
          id: 3,
          title: 'Timeline',
          icon: 'TIMELINE',
          slug: 'timeline',
          screen: 'Home'
        },
        // {
        //   id: 4,
        //   title: 'Golfe Show Prime',
        //   icon: 'PRIME',
        //   slug: 'prime',
        //   screen: 'Prime'
        // },
         {
           id: 5,
           title: 'Meu Shopping',
           icon: 'SHOPPING',
           slug: 'shopping',
           screen: 'MyShopping'
         },
        {
          id: 6,
          title: 'Agenda',
          icon: 'SCHEDULE',
          slug: 'schedule',
          screen: 'Schedule'
        },
        {
          id: 7,
          title: 'Meus Clubes ',
          icon: 'CLUBS',
          slug: 'clubs',
          screen: 'Clubs'
        },
        {
          id: 9,
          title: 'Meus Torneios ',
          icon: 'CLUBS',
          slug: 'clubs',
          screen: 'MyTournaments'
        },
        {
          id: 8,
          title: 'Sair',
          icon: 'EXIT',
          slug: 'exit'
        }
      ]
    }
  }

  // static navigationOptions = ({ navigation, tintColor }) => ({
  //   tabBarOptions: {
  //     tabBarVisible:false,
  //     // showLabel: false,
  //     // showIcon: true,
  //     // activeTintColor: COLORS.FOOTER_BUTTON_ACTIVE_COLOR,
  //     // inactiveTintColor: COLORS.FOOTER_BUTTON_INACTIVE_COLOR,
  //     // inactiveBackgroundColor: COLORS.FOOTER_BUTTON_ACTIVE_BACKGROUND,
  //     // style: {
  //     //   backgroundColor: COLORS.FOOTER_BUTTON_ACTIVE_BACKGROUND,
  //     //   elevation: 4,
  //     // }
  //   }
  // })

  static getDerivedStateFromProps(props, state) {
    if (props.user) {
      state.user = props.user;
    }

    return state;
  }

  componentDidMount() {
    // Add Event listener to call the Redux-saga
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {});
    this.props.getClubs()
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  _navigateTo = (routeName) => {
    this.props.navigate(routeName)
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.MENU_BACKGROUND
        }}
      >

        <MainHeader
          title='Menu'
          backButton
        />

        <AvatarProfile
          containerStyle={{}}
          name={this.state.user.full_name ? this.state.user.full_name : 'usuário'}
          subtitle={this.state.user.profession ? this.state.user.profession : ''}
          source={this.state.user.photo ? { uri: this.state.user.photo } : false}
          onPress={() => null}
          showRightIcon={true}
          onPress={() => this.props.navigation.navigate('Profile')}
        />

          <ScrollView
            contentContainerStyle={{
            }}
          >

            {
              this.state.items.map(item => {
                return (
                  <View
                    key={item.id}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={IMAGES[item.icon]}
                      />
                    </View>

                    <TouchableOpacity
                      style={{
                        flex: 1,
                        height: 80,
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: item.title != 'Sair' ? COLORS.MENU_SEPARATOR_COLOR : COLORS.MENU_BACKGROUND
                      }}
                      onPress={() => item.id === 8 ? this.props.logout() : this._navigateTo(item.screen)}
                    >
                      <Text
                        style={{
                          color: COLORS.MENU_TEXT_COLOR,
                          fontSize: 15,
                          textAlign: 'left'
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user.data
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch({ type: 'USER_LOGOUT_TRIGGER' })
  },
  navigate(routeName) {
    dispatch(NavigationActions.navigate({ routeName }))
  },
  getClubs() {
    dispatch({
        type: 'USER_GET_CLUBS_TRIGGER',

    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Settings))
