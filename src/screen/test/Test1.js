import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Button, Caption} from 'react-native-paper';
import Carousel from 'react-native-anchor-carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utils/colors';
import {DimensionsHeight, DimensionsWidth} from '../../utils/dimension';

export default function Test1(props) {
  const [background, setBackground] = useState({
    uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
    name: 'Avengers: End Game',
    stat: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
    desc: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
  });

  const carouselRef = useRef();

  const [gallery, setgallery] = useState([
    {
      image:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
      title: 'Avengers: End Game',
      released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
      key: '1',
      desc: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
    },
    {
      image:
        'https://www.spotlightstheatre.co.uk/wordpress/wp-content/uploads/2019/11/f_frozen2_header_mobile_18432_d258f93f.jpeg',
      title: 'Frozen II',
      released: '2019 ‧ Animation/Musical ‧ 1h 43m',
      key: '2',
      desc: 'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
    },
    {
      image:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSxo7Naxu0tjuSEZ9_faYL--aWjx8V5TKr4q2YeenYKXXik-T5P',
      title: 'Alita: Battle Angel',
      released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
      key: '3',
      desc: 'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
    },
    {
      image:
        'https://www.gstatic.com/tv/thumb/v22vodart/15879807/p15879807_v_v8_aa.jpg',
      title: 'The Irish Man',
      released: '2019 ‧ Crime/Drama ‧ 3h 30m',
      key: '4',
      desc: 'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa.',
    },
    {
      image:
        'https://i.pinimg.com/originals/99/03/9a/99039a6afb682e42c9a12556071b38c9.jpg',
      title: 'John Wick Chapter 3',
      released: '2019 ‧ Action/Thriller ‧ 2h 10m',
      key: '5',
      desc: 'John Wick is declared excommunicado and a hefty bounty is set on him after he murders an international crime lord. He sets out to seek help to save himself from ruthless hitmen and bounty hunters.',
    },
  ]);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.imageWrapper}>
        <TouchableOpacity
          onPress={() => {
            carouselRef.current.scrollToIndex(index);
            setBackground({
              uri: item.image,
              name: item.title,
              stat: item.released,
              desc: item.desc,
            });
          }}>
          <Image
            source={{uri: item.image}}
            style={styles.carouselImage}
            resizeMode="stretch"
          />
          <Text style={styles.carouselText}>{item.title}</Text>
          <MaterialIcons
            name="library-add"
            size={30}
            color="white"
            style={styles.carouselIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* <View style={styles.carouselContentContainer}>
          <View style={{...StyleSheet.absoluteFill}}> */}
        <ImageBackground
          source={{uri: background.uri}}
          style={styles.imageBg}
          blurRadius={15}>
          <Text style={styles.titleText}>New Docs</Text>
          <View style={styles.carouselContainerView}>
            <Carousel
              style={styles.carousel}
              data={gallery}
              renderItem={renderItem}
              // here the itemWidth is already given
              itemWidth={200}
              containerWidth={DimensionsWidth - 20}
              separatorWidth={10}
              ref={carouselRef}
              inActiveScale={0.95}
              inActiveOpacity={0.6}
            />
          </View>
          <Text style={styles.titleText}>Recent Viewed</Text>
          <View style={styles.carouselContainerView}>
            <Carousel
              style={styles.carousel}
              data={gallery}
              renderItem={renderItem}
              // here the itemWidth is already given
              itemWidth={200}
              containerWidth={DimensionsWidth - 20}
              separatorWidth={10}
              ref={carouselRef}
              inActiveScale={0.95}
              inActiveOpacity={0.6}
            />
          </View>
          <Text style={styles.titleText}>All Docs</Text>
          <View style={styles.carouselContainerView}>
            <Carousel
              style={styles.carousel}
              data={gallery}
              renderItem={renderItem}
              // here the itemWidth is already given
              itemWidth={200}
              containerWidth={DimensionsWidth - 20}
              separatorWidth={10}
              ref={carouselRef}
              inActiveScale={0.95}
              inActiveOpacity={0.6}
            />
          </View>
          <Text style={styles.titleText}>Shared</Text>
          <View style={styles.carouselContainerView}>
            <Carousel
              style={styles.carousel}
              data={gallery}
              renderItem={renderItem}
              // here the itemWidth is already given
              itemWidth={200}
              containerWidth={DimensionsWidth - 20}
              separatorWidth={10}
              ref={carouselRef}
              inActiveScale={0.95}
              inActiveOpacity={0.6}
            />
          </View>
          <Text>jier</Text>
          {/* info part */}
          {/* <View style={styles.movieInfoContainer}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.movieName}>{background.name}</Text>
                <Text style={styles.movieStat}>{background.stat}</Text>
              </View>
              <TouchableOpacity style={styles.playIconContainer}>
                <FontAwesome5
                  name="play"
                  size={22}
                  color="#02ad94"
                  style={{marginLeft: 4}}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 14, marginTop: 14}}>
              <Text style={{color: 'white', opacity: 0.8, lineHeight: 20}}>
                {background.desc}
              </Text>
            </View> */}
        </ImageBackground>
        {/* </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  carouselContentContainer: {
    flex: 1,
    backgroundColor: colors.black,
    height: DimensionsHeight,
    paddingHorizontal: 14,
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: null,
    opacity: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  searchBox: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  titleText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  carouselContainerView: {
    width: '100%',
    height: DimensionsHeight / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    overflow: 'visible',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  carouselText: {
    padding: 14,
    color: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 2,
    fontWeight: 'bold',
  },
  carouselIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  movieInfoContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    width: DimensionsWidth - 14,
  },
  movieName: {
    paddingLeft: 14,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6,
  },
  movieStat: {
    paddingLeft: 14,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    opacity: 0.8,
  },
  playIconContainer: {
    backgroundColor: '#212121',
    padding: 18,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderWidth: 4,
    borderColor: 'rgba(2, 173, 148, 0.2)',
    marginBottom: 14,
  },
});
