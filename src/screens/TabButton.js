import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from '@rneui/themed'
export default function TabButton({ color, icon, iconfamily, label, labelStyle, size }) {
  return (
    <View >
      <Icon
        name={icon}
        type={iconfamily}
        color={color}
        style={{opacity:0.6}}
        size={size ? size : 48}
      />
      <Text style={[{ textAlign: 'center', marginVertical: 10, fontSize: 18 }, labelStyle]}>{label}</Text>
    </View>
  )
}