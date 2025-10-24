import { View, Text } from 'react-native'
import React from 'react'
import PDSHome from './Home'
import { Provider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <Provider>
      <SafeAreaProvider >
      <PDSHome />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App