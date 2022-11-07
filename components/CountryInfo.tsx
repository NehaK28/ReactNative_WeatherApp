import React, { FormEvent, useCallback, useState, useEffect } from "react";
import { View, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import { SvgUri } from "react-native-svg";

interface InitCountry {
    capital: string[];
    population: number;
    latlng: number[];
    flags: {
        svg: string;
    };
}

type InitiProps = {
    route: {
        params: {
            name: string;
        };
    };
    navigation: any;
};

const CountryInfo: React.FC<InitiProps> = ({ route, navigation }) => {
    const { name } = route.params;
    const [countryInfo, setCountryInfo] = useState<InitCountry>();
    const [capitalName, setCapitalName] = useState("");
    const [countryApiError, setCountryApiError] = useState<Boolean>(false);

    useEffect(() => {
        getCountryData();
    }, []);

    const getCountryData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${name}`
            );
            // console.log('data', response);
            const data = response.data;
            setCountryInfo(data[0]);
            setCapitalName(data[0].capital[0]);
        } catch (error) {
            // console.log('erroe', error);
            setCountryApiError(true);
        }
    }, []);

    const getWeatherInfo = async () => {
        // console.log('calling weather Details')
        navigation.navigate("WeatherInfo", { capitalName });
    };

    const getBackToHome = () => {
        navigation.popToTop();
    };

    // console.log("img", countryInfo.flags.svg)
    console.log(countryInfo && countryInfo.flags.svg);

    return (
        <View style={{ padding: 20 }}>
            {countryInfo ? (
                <View>
                    <SvgUri
                    viewBox="0 0 1000 511"
                        width="200"
                        height="200"
                        
                        uri={countryInfo.flags.svg}
                        
                        
                    />
                    {/* <Image source={{uri: countryInfo.flags.svg}} style={{width:200, height:200}} /> */}

                    <Text style={{ paddingTop: 20 }}>
                        Capital: {countryInfo.capital[0]}
                    </Text>

                    <Text style={{ paddingTop: 20 }}>
                        Population: {countryInfo.population}
                    </Text>

                    <Text style={{ paddingTop: 20 }}>
                        Latitude: {countryInfo.latlng[0]} <Text>o</Text>
                    </Text>

                    <Text style={{ paddingTop: 20 }}>
                        Longitude: {countryInfo.latlng[1]}
                    </Text>

                    <Button
                        mode="contained"
                        onPress={getWeatherInfo}
                        style={{ marginTop: 20, borderRadius:10, width:200 }}
                    >
                        Capital Weather
                    </Button>
                </View>
            ) : (
                <View>
                    {countryApiError ? (
                        <>
                            <Text style={{ paddingTop: 20 }}>
                                Country info not found!
                            </Text>

                            <Button
                                mode="contained"
                                onPress={getBackToHome}
                                style={{ marginTop: 20 }}
                            >
                                Please try again
                            </Button>
                        </>
                    ) : (
                        <Text style={{ paddingTop: 20 }}>Loading...</Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default CountryInfo;
