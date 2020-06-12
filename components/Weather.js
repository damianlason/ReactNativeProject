import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { weatherConditions } from "./WeatherConditions";

const Weather = ({ cityName, weather, temperature, airQualityDescription }) => {
  if (weather != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color },
        ]}
      >
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={80}
            name={weatherConditions[weather].icon}
            color={"#fff"}
          />
          <Text style={styles.tempText}>{temperature}˚C</Text>
        </View>
        <Text style={styles.cityName}>{cityName}</Text>

        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.title}>{airQualityDescription}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Oh no, something went wrong</Text>
      </View>
    );
  }
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
  },
  tempText: {
    fontSize: 85,
    color: "#fff",
    textAlign: "center",
  },

  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
  cityName: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 50,
    color: "#fff",
  },
});

export default Weather;
