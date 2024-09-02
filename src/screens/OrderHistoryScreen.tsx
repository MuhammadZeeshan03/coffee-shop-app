import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import OrderHistoryCard from '../components/OrderHistoryCard'
import PopUpAnimation from '../components/PopUpAnimation'

const OrderHistoryScreen = ({ navigation, route }: any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList)
  const tabBarHeight = useBottomTabBarHeight()
  const [showAnimation, setShowAnimation] = useState(false)

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push('Details', { type, index, id });
  }

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? <PopUpAnimation
        style={styles.lottieAnimation}
        source={require('../lottie/download.json')}
      /> : <></>}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Order History" />

            {OrderHistoryList.map((data: any) => (
              <OrderHistoryCard
                cartList={data.CartList}
                cartListPrice={data.CartListPrice}
                navigationHandler={navigationHandler}
                orderDate={data.OrderDate}

              />
            ))}

          </View>

          {OrderHistoryList.length > 0
            ?
            <TouchableOpacity
              style={styles.downloadButton} onPress={buttonPressHandler}  >
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity> : <></>}

        </View>
      </ScrollView >
    </View >
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  lottieAnimation: {
    height: 250,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
  },
  downloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: SPACING.space_20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: SPACING.space_18,
    color: COLORS.primaryWhiteHex,
  },
})
