import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import api from '../../services/api';

const { width: WIDTH } = Dimensions.get('window');

export default FavoritePost = ({ data }) => {
  const navigate = useNavigation();

  function handleNavigate() {
    navigate.navigate('Detail', { id: data?.id });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <ImageBackground
        source={{
          uri: `${api.defaults.baseURL}${data?.attributes?.cover?.data?.attributes?.url}`,
        }}
        style={styles.cover}
        resizeMode={'cover'}
        blurRadius={3}
        imageStyle={{ borderRadius: 6, opacity: 0.4 }}
      >
        <Text style={styles.title} numberOfLines={1}>
          {data?.attributes?.title}
        </Text>
      </ImageBackground>
      <Text>FAVORITADO</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
  cover: {
    borderRadius: 4,
    width: WIDTH - 60,
    height: 100,
    justifyContent: 'flex-end',
    backgroundColor: '#232630',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    textShadowColor: '#121212',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 8,
  },
});
