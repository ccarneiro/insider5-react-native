import { View, Text, StyleSheet } from "react-native";

export default CategoryPosts = () => {
  return (
    <View style={styles.container}>
      <Text>Pagina Posts de uma categoria</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#121212',
    alignItems: "center",
    justifyContent: "center",
  },
  // title: {
  //   color: '#fff',
  //   fontSize: 22,
  // }
});
