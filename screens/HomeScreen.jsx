import { StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import {
  getAdvCourseDetails,
  getCourseDetails,
  getInterCourseDetails,
  getSliderBanners,
} from "../services/GlobalApi";

export default function HomeScreen() {
  const [mainBanners, setMainBanners] = useState([]);
  const [beginnerBanners, setBeginnerBanners] = useState([]);
  const [intermediateBanners, setIntermediateBanners] = useState([]);
  const [advancedBanners, setAdvancedBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await getSliderBanners();
      const res2 = await getCourseDetails();
      const res3 = await getInterCourseDetails();
      const res4 = await getAdvCourseDetails();
      setMainBanners(res1.data);
      setBeginnerBanners(res2.data);
      setIntermediateBanners(res3.data);
      setAdvancedBanners(res4.data);
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <SearchBar />
      <Slider data={mainBanners} header="Featured" />
      <Slider data={beginnerBanners} header="Beginner Courses" />
      <Slider data={intermediateBanners} header="Intermediate Courses" />
      <Slider data={advancedBanners} header="Advanced Courses" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
