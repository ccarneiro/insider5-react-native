import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryPosts from './pages/CategoryPosts';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Search from './pages/Search';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detalhes',
          ...screenOptions,
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryPosts}
        options={{
          title: 'Categorias',
          ...screenOptions,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Procurando algo?',
          ...screenOptions,
        }}
      />
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerTintColor: '#fff',
  headerStyle: { backgroundColor: '#232630' },
};

export default Routes;
