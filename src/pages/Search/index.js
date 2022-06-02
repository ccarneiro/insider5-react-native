import { View, Text, StyleSheet } from "react-native";

export default Search = () => {
  return (
    <View style={styles.container}>
      <Text>Pagina SEARCH</Text>
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
