import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Trending({post}) {
  return (
    <FlatList
      data={post}
      key={(item) => item.$id}
      renderItem={({ item }) => {
        <Text className="text-3xl text-white">{item.$id}</Text>
      }}
      horizontal
      />
  )
}

