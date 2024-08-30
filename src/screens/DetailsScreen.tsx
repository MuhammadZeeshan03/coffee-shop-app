import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { COLORS } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

const DetailsScreen = ({ navigation, route }: any) => {

  const itemOfIndex = useStore((state: any) => route.params.type == 'Coffee' ? state.CoffeeList : state.BeansList)[route.params.index];

  const backHandler = () => {
    navigation.pop();
  }
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);

  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);

  const toggleFavourite = (favourite: boolean, type: string, id: string) => {
    console.log('Is favorite', type, id, favourite);
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          id={itemOfIndex.id}
          favourite={itemOfIndex.favourite}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingrident}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.averageRating}
          ratings_count={itemOfIndex.ratingCount}
          roasted={itemOfIndex.roasted}
          BackHandler={backHandler}
          ToggleFavourite={toggleFavourite}
        />

      </ScrollView>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, backgroundColor: COLORS.primaryBlackHex,
  },

  scrollViewFlex: {
    flexGrow: 1,
  }
})