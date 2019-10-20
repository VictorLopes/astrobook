import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'

import { ListItem, Icon } from 'react-native-elements'

export default class MyClubs extends Component {
  state={
    clubs:[]
  }
  static getDerivedStateFromProps(props, state) {
    if (props.clubs) {
      state.clubs = props.clubs
    }
    return state;
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        shadowColor: '#455B63',
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        paddingHorizontal: 24,
        marginBottom: 16,
        maxHeight: 420
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingTop: 28,
          paddingBottom: 12,
        }}>
          <Text style={{
            flex: 1,
            color: 'rgba(56, 58, 60, 1)',
            fontSize: 18,
            fontWeight: '300'
          }}>
            Clubes
          </Text>
        </View>
        {
          (this.state.clubs.length === 0) ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 32
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: 'rgba(56, 58, 60, 1)',
                  fontWeight: '300',
                  paddingLeft: 8
                }}
              >
                O usuário nao possui clubs vinculados
              </Text>
            </View>
          ) : (
              <FlatList
                data={this.state.clubs}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={(
                  <React.Fragment>

                  </React.Fragment>
                )}
                renderItem={({ item }) => (
                  <ListItem
                    title={(
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 14,
                          color: 'rgba(56, 58, 60, 1)',
                          fontWeight: '500',
                          marginBottom: 2
                        }}
                      >
                        {item.name}
                      </Text>
                    )}
                    rightElement={() => (
                      <View style={{
                        alignSelf: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 4
                      }} >
                        <Icon
                          type='material-icon'
                          name='star'
                          color='rgba(255, 204, 0, 1)'
                          size={18}
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 12,
                            color: 'rgba(56, 58, 60, 1)',
                            fontWeight: '500',
                            paddingLeft: 8
                          }}
                        >
                          {item.rating}
                        </Text>
                      </View>
                    )}
                    subtitle={(
                      <Text
                        numberOfLines={1}
                        style={{
                          color: 'rgba(162, 162, 162, 1)',
                          fontSize: 11,
                        }}
                      >
                        {`${item.location} - ${item.distance}`}
                      </Text>
                    )}
                    leftAvatar={{
                      source: item.icon,
                      rounded: true,
                      containerStyle: {
                        width: 40,
                        height: 40,
                      },
                      avatarStyle: {
                        borderRadius: 20
                      }
                    }}
                    containerStyle={{ paddingLeft: 0, paddingRight: 4 }}
                    bottomDivider={true}
                    topDivider={false}
                    keyExtractor={item => item.id}
                  />
                )}
                onEndReachedThreshold={1}
              >
              </FlatList>
            )
        }
      </View>
    )
  }
}
