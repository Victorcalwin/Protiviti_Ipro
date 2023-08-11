import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackHandler } from 'react-native';
import Sidebar from './src/screens/Sidebar';
import Myprofile from './src/screens/Myprofile';
import MyAudit from './src/screens/MyAudit';
import Filter from './src/screens/Filter';
import EditProfile from './src/screens/EditProfile';
import Myshedule from './src/screens/Myshedule';
import Setting from './src/screens/Setting';
import Homepage from './src/screens/Homepage';
import Login from './src/screens/Login';
import Otppage from './src/screens/Otppage';
// import ReviewAndSubmit from './src/screens/ReviewAndSubmit';
import Notification from './src/screens/Notification';
import Notificationview from './src/screens/Notificationview'
import Department from './src/screens/Depertment';
import Checklist1 from './src/screens/Checklist1';
import Checklist2 from './src/screens/Checklist2';
import Checklist3 from './src/screens/Checklist3'
import AuditDetails from './src/screens/AuditDetails';
import AuditQuestion from './src/screens/AuditQuestion';
import AuditorObservation from './src/screens/AuditorObservation';
import AuditorReview from './src/screens/AuditorReview';
import AuditInProgress from './src/screens/AuditInProgress';
import AuditUnderReview from './src/screens/AuditUnderReview';
import AuditCompleted from './src/screens/AuditCompleted';
import AuditCancelled from './src/screens/AuditCancelled';
import LogoPro from './src/screens/LogoPro';
import MyAuditFilter from './src/screens/MyAuditFilter'
import MyAuditFilterData from './src/screens/MyAuditFilterData'
import MysheduleFilterData from './src/screens/MyscheduleFilterData';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import NetworkStatus from './src/screens/NetworkStatus';





const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigationRef = useRef(null);
  useEffect(() => {
    const backAction = () => {
      const currentRoute = navigationRef.current?.getCurrentRoute()?.name;
      console.log(currentRoute, "currentRoute")
      if (!isLoggedIn && currentRoute === 'homepage') {
        return true; // Block the back button
      }
      return false; // Allow the default back button behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isLoggedIn]);

  return (
    <>
      <NetworkStatus />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="logopro" component={LogoPro} options={{ headerShown: false }} />
          <Stack.Screen name="checklist1" component={Checklist1} options={{ headerShown: false }} />
          <Stack.Screen name="checklist2" component={Checklist2} options={{ headerShown: false }} />
          <Stack.Screen name="checklist3" component={Checklist3} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="otp" component={Otppage} options={{ headerShown: false }} />
          <Stack.Screen name="homepage" component={Homepage} options={{ headerShown: false }} />
          <Stack.Screen name="department" component={Department} options={{ headerShown: false }} />
          <Stack.Screen name="auditdetails" component={AuditDetails} options={{ headerShown: false }} />
          <Stack.Screen name="auditquestion" component={AuditQuestion} options={{ headerShown: false }} />
          <Stack.Screen name="auditobservation" component={AuditorObservation} options={{ headerShown: false }} />
          <Stack.Screen name="auditorreview" component={AuditorReview} options={{ headerShown: false }} />
          <Stack.Screen name="notification" component={Notification} options={{ headerShown: false }} />
          <Stack.Screen name="notificationview" component={Notificationview} options={{ headerShown: false }} />
          <Stack.Screen name="sidebar" component={Sidebar} options={{ headerShown: false }} />
          <Stack.Screen name="myprofile" component={Myprofile} options={{ headerShown: false }} />
          <Stack.Screen name="editprofile" component={EditProfile} options={{ headerShown: false }} />
          <Stack.Screen name="myaudit" component={MyAudit} options={{ headerShown: false }} />
          <Stack.Screen name="auditinprogress" component={AuditInProgress} options={{ headerShown: false }} />
          <Stack.Screen name="auditunderreview" component={AuditUnderReview} options={{ headerShown: false }} />
          <Stack.Screen name="auditcompleted" component={AuditCompleted} options={{ headerShown: false }} />
          <Stack.Screen name="auditcancelled" component={AuditCancelled} options={{ headerShown: false }} />
          <Stack.Screen name="filter" component={Filter} options={{ headerShown: false }} />
          <Stack.Screen name="myauditfilter" component={MyAuditFilter} options={{ headerShown: false }} />
          <Stack.Screen name="myauditfilterdata" component={MyAuditFilterData} options={{ headerShown: false }} />
          <Stack.Screen name="myshedule" component={Myshedule} options={{ headerShown: false }} />
          <Stack.Screen name="myshedulefilterdata" component={MysheduleFilterData} options={{ headerShown: false }} />
          <Stack.Screen name="setting" component={Setting} options={{ headerShown: false }} />



        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
