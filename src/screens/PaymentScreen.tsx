import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from '../components/GradientBGIcon'

const paymentList = [{
  name: 'Wallet',
  icon: 'icon',
  isIcon: true,
},
{
  name: 'Google Pay',
  icon: require('../assets/app_images/gpay.png'),
  isIcon: false,
},
{
  name: 'Apple Pay',
  icon: require('../assets/app_images/applepay.png'),
  isIcon: false,
},
{
  name: 'Amazon Pay',
  icon: require('../assets/app_images/amazonpay.png'),
  isIcon: false,
},
{
  name: 'Wallet',
  icon: 'icon',
  isIcon: true,
},
]

const PaymentScreen = () => {
  const [paymentMode, setPaymentMode] = useState('Credit Card')
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <GradientBGIcon
              size={FONTSIZE.size_16}
              name='left'
              color={COLORS.primaryLightGreyHex}
            />

          </TouchableOpacity>
          <Text style={styles.headerText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>
      </ScrollView>
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: SPACING.space_24,


  },
  headerText: {

  },

  EmptyView: {
  },
})