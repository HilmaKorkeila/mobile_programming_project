import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DatabaseProvider } from './db/DatabaseProvider';
import ProjectsScreen from './screens/ProjectsScreen';
import DashboardScreen from './screens/DashboardScreen';
import BudgetScreen from './screens/BudgetScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // DatabaseProvider migrates local database before rendering anything else
    <DatabaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Projects"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Projects" component={ProjectsScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Budget" component={BudgetScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </DatabaseProvider>
  );
}
