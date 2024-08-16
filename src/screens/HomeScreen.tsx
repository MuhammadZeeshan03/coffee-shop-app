import { Animated, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ScreenContainer } from 'react-native-screens'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'
import CoffeeCard from '../components/CoffeeCard'

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1
    } else {
      temp[data[i].name]++
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
}


const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    return data.filter((item: any) => item.name == category)
  }
}

const HomeScreen = ({ navigation }: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeansList = useStore((state: any) => state.BeansList)

  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList))
  const [searchText, setSearchText] = useState<string>('')
  const [categoryIndex, setCategoriesIndex] = useState({
    index: 0,
    category: categories[0]
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList))
  const listRef: any = useRef<FlatList>()
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search != '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      })
    }

    setCategoriesIndex({
      index: 0,
      category: categories[0]
    })
    setSortedCoffee([
      ...CoffeeList.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()))
    ])
  }

  const resetSearchCoffee = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });

    setCategoriesIndex({
      index: 0,
      category: categories[0]
    })
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewFlex}>
        <HeaderBar />

        <Text
          style={styles.screenTitle}>Find the best{`\n`}coffee for you</Text>
        <View
          style={styles.inputContainerComponent}>
          <TouchableOpacity
            onPress={() => {

              searchCoffee(searchText)


            }}>
            <CustomIcon
              style={styles.inputIcon}
              name='search'
              size={FONTSIZE.size_18}
              color={setSearchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
          <TextInput
            placeholder='Find Your Coffee...'
            value={searchText}
            onChangeText={text => {
              setSearchText(text)
              searchCoffee(text)

            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer} />
          {searchText?.length > 0 ? <TouchableOpacity
            onPress={() => {
              resetSearchCoffee();
            }}>
            <CustomIcon
              style={styles.inputIcon}
              name='close'
              size={FONTSIZE.size_16}
              color={COLORS.primaryLightGreyHex}
            />
          </TouchableOpacity> : <></>}
        </View>
        {/* Category Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollViewStyle}
        >
          {categories.map((data, index) => {
            return (
              <View
                style={styles.categoryScrollViewContainer}
                key={
                  index.toString()
                }>
                <TouchableOpacity
                  style={styles.categoryScrollViewItem}
                  onPress={() => {
                    listRef?.current?.scrollToOffset({
                      Animated: true,
                      offset: 0,
                    })
                    setCategoriesIndex({ index, category: categories[index] })
                    setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)])
                  }}
                >
                  <Text style={[styles.categoryTextActive, categoryIndex.index == index ? {} : {}]} >{data}</Text>
                  {categoryIndex.index == index ? <View style={styles.activeCategory} /> : null}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        {/* Coffee FlatList */}
        <FlatList
          ref={listRef}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.categoryTextActive}> No Coffee Found</Text>
            </View>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={
            ({ item }) => {
              return <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {

                  })

                }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  rosted={item.rosted}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item?.prices[2]}
                  buttonPressHandler={() => { }}
                />


              </TouchableOpacity>
            }
          }
        />

        <Text style={styles.coffeeBeans}>Coffee Beans</Text>
        {/* Beans FlatList */}

        <FlatList

          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeansList}
          contentContainerStyle={[styles.flatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={
            ({ item }) => {
              return <TouchableOpacity>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  rosted={item.rosted}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item?.prices[2]}
                  buttonPressHandler={() => { }}
                />


              </TouchableOpacity>
            }
          }
        />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,

  },
  categoryScrollViewItem: {
    alignItems: 'center'
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  categoryTextActive: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  emptyContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6

  },
  coffeeBeans: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});
