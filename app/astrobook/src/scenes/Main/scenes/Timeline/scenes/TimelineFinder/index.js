import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Dimensions
} from 'react-native'

import {
    TabView,
    SceneMap,
    TabBar
} from 'react-native-tab-view';

// Constants
import COLORS from '@constants/colors'
import Header from '@components/Header';

import { Icon, Slider } from 'react-native-elements';

import FinderProfiles from './scenes/FinderProfiles';
import FinderCourses from './scenes/FinderCourses';

class TimelineFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'users', title: 'Usuários' },
        { key: 'clubs', title: 'Clubes' },
      ]
    };
  }

  render() {
    return (
        <View
          style={{ flex: 1 }}>
            <Header
              title="Busca"
              backButton
            />

            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    users: FinderProfiles,
                    clubs: FinderCourses,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{
                  width: Dimensions.get('window').width,
                  height: 0
                }}
                renderTabBar={(props) =>
                  <TabBar
                    {...props}
                    indicatorStyle={{
                        backgroundColor: COLORS.PRIMARY_HEADER_TEXT_COLOR,
                    }}
                    style={{
                        backgroundColor: COLORS.GRAY_BACKGROUND,
                        color: COLORS.PRIMARY_HEADER_TEXT_COLOR
                    }}
                    renderLabel={({ route, focused, color }) => (
                        <Text
                          style={{
                            color: COLORS.PRIMARY_HEADER_TEXT_COLOR,
                            margin: 8
                          }}>
                          {route.title}
                        </Text>
                    )}
                  />
                }
            />
        </View>
    )
  }
}

export default withNavigation(TimelineFinder);
