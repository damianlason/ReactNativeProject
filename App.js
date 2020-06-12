import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import { API_KEY } from "./API/WeatherAPIKey";
import { AIR_API_KEY } from "./API/AirAPIKey";

import Weather from "./components/Weather";

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null,
    value: "",
    cityName: "Kraków",
    airQuality: 0,
    airQualityDescription: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
        });
      });

    fetch(
      `https://api.waqi.info/feed/${this.state.cityName}/?token=${AIR_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((response) => {
        this.setState({
          airQuality: response.data.aqi,
          isLoading: false,
        });
      });

    if (this.state.airQuality <= 50) {
      this.setState({
        airQualityDescription: "Good air quality",
      });
    } else if (this.state.airQuality > 50 && this.state.airQuality <= 200) {
      this.setState({
        airQualityDescription: "Average air quality",
      });
    } else {
      this.setState({
        airQualityDescription: "Very bad air quality",
      });
    }
  }

  submit() {
    this.setState({ cityName: this.state.value });
    this.fetchData();
  }

  render() {
    const {
      isLoading,
      weatherCondition,
      temperature,
      cityName,
      airQualityDescription,
    } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <>
            <View style={{ marginTop: 10 }}>
              <TextInput
                textAlign={"center"}
                placeholder="Enter the city"
                onChangeText={(text) => this.setState({ value: text })}
                style={{
                  borderWidth: 2,
                  borderColor: "skyblue",
                  margin: 20,
                  height: 60,
                  fontSize: 50,
                }}
              />

              <Button
                title="Search"
                onPress={() => {
                  if (this.state.value != "") {
                    this.submit();
                  }
                }}
                style={{
                  fontSize: 50,
                }}
              />
            </View>
            <Weather
              cityName={cityName}
              weather={weatherCondition}
              temperature={temperature}
              airQualityDescription={airQualityDescription}
            />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDE4",
  },
  loadingText: {
    fontSize: 30,
  },
});
