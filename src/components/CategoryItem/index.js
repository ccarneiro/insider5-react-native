import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
export default CategoryItem = ({ data, favorite }) => {
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate('Category', {
      id: data.id,
      title: data?.attributes?.name,
    });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={handleNavigate}
      onLongPress={favorite}
    >
      <Image
        style={styles.icon}
        source={{
          uri: `${api.defaults.baseURL}${data?.attributes?.icon?.data?.attributes?.url}`,
        }}
      />
      <Text style={styles.name}>{data?.attributes?.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: 8,
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  name: {},
});
