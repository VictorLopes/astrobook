import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'

import { ListItem, Icon } from 'react-native-elements'
import AvatarProfile from '@components/AvatarProfile'
import { withNavigation } from 'react-navigation';


class NextFields extends Component {
  render() {
    if (this.props.clubs.length <= 0)
      return null;
    
    return (
      <View style={{
        flex: 1,
        marginBottom:20,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        shadowColor: '#455B63',
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        maxHeight: 320
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 12,
          paddingLeft: 72,

        }}>
          <Text style={{
            flex: 1,
            color: 'rgba(162, 162, 162, 1)',
            fontSize: 13,
            fontWeight: '400'
          }}>
            Campos próximos
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate({ routeName: 'NearFields' })}
            style={{
              height: 38,
              width: 38,
              right: 0,
              top: 0,
              // borderRadius: 25,
              backgroundColor: 'rgba(56, 58, 60, 1)',
            }}
          >
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}>
              <Icon
                type='material-icon'
                name='tune'
                color='#fff'
                size={18}
              />
            </View>
          </TouchableOpacity>

        </View>

        <FlatList
          data={this.props.clubs}
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
              containerStyle={{ paddingLeft: 0, paddingRight: 4, marginHorizontal: 24 }}
              bottomDivider={true}
              topDivider={false}
              keyExtractor={item => item.id}
            />
          )}
          onEndReachedThreshold={1}
        >
        </FlatList>
      </View>
    )
  }
}

export default withNavigation(NextFields)
