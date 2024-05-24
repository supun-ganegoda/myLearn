import { StyleSheet, ScrollView, BackHandler } from "react-native";
import React, { useEffect, useState, useContext, useCallback } from "react";
import HomeHeader from "../components/HomeHeader";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import {
  getAdvCourseDetails,
  getCourseDetails,
  getInterCourseDetails,
  getSliderBanners,
} from "../services/GlobalApi";
import LoadingScreen from "../components/LoadingScreen";
import { AuthContext } from "../services/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [mainBanners, setMainBanners] = useState([]);
  const [beginnerBanners, setBeginnerBanners] = useState([]);
  const [intermediateBanners, setIntermediateBanners] = useState([]);
  const [advancedBanners, setAdvancedBanners] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp(); // send to background
        return true; // disable the default back action
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res1 = await getSliderBanners();
      const res2 = await getCourseDetails();
      const res3 = await getInterCourseDetails();
      const res4 = await getAdvCourseDetails();
      setMainBanners(res1.data);
      setBeginnerBanners(res2.data);
      setIntermediateBanners(res3.data);
      setAdvancedBanners(res4.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader userName={userData.user?.username} />
      <SearchBar />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Slider data={mainBanners} header="Featured" />
      )}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Slider data={beginnerBanners} header="Beginner Courses" />
      )}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Slider data={intermediateBanners} header="Intermediate Courses" />
      )}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Slider data={advancedBanners} header="Advanced Courses" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
