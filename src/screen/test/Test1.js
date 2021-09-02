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
import {Button} from 'react-native-paper';
import Carousel from 'react-native-anchor-carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';
import {DimensionsHeight, DimensionsWidth} from '../../utils/dimension';

export default function Test1(props) {
  const [background, setBackground] = useState({
    uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
    name: 'Avengers: End Game',
    stat: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
    desc: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
  });

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

  const [list, setList] = useState([
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJKLiEyyz1Q9RC8EBYl3ijr3nuGeyO2ETmwy6Kdq0AQtD0elWD',
      key: '1',
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/en/7/7a/1917poster.jpg',
      key: '2',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg',
      key: '3',
    },
    {
      image:
        'https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/large/spies-in-disguise-et00072276-10-03-2018-03-41-39.jpg',
      key: '4',
    },
    {
      image:
        'https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_.jpg',
      key: '5',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView>
      <View style={styles.carouselContentContainer}>
        <View style={{...StyleSheet.absoluteFill}}>
          <ImageBackground
            source={{uri: background.uri}}
            style={styles.imageBg}
            blurRadius={20}>
            <Searchbar
              style={styles.searchBox}
              placeholder="search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Text style={styles.titleText}>New Docs</Text>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContentContainer: {
    flex: 1,
    backgroundColor: colors.black,
    height: DimensionsHeight,
    paddingHorizontal: 14,
  },
  imageBg: {
    flex: 1,
    width: DimensionsWidth,
    height: DimensionsHeight,
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
});
