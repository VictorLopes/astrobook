import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  Icon
} from 'react-native-elements';

import COLORS from '@constants/colors'

const styles = StyleSheet.create({
    container: {
        height: 68,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: COLORS.FOOTER_BUTTON_BACKGROUND,
        paddingVertical: 14,
    },
});

export default () => null

// export default ({ label, ?ontainer}>
//       <TouchableOpacity>
//           <Icon
//               type='material-icon'
//               name='menu'
//               color={ COLORS.FOOTER_BUTTON_COLOR }
//               size={40}
//           />
//       </TouchableOpacity>
//     </View>
// );
