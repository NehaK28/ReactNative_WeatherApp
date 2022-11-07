import React, { FormEvent, useCallback, useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { Button, Text } from 'react-native-paper';
import { SvgUri } from 'react-native-svg';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

interface InitCountryWeatherInfo {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    precip: number;
}


type InitiProps = {
    route: {
        params: {
            capitalName: string;
        }
    }
    navigation: any;
};


const WeatherInfo: React.FC<InitiProps> = ({ route, navigation }) => {
    const { capitalName } = route.params;
    const [weatherInfo, setWeatherInfo] = useState<InitCountryWeatherInfo>();
    const [weatherApiError, setWeatherApiError] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);

    const getWeatherInfo = useCallback(async () => {
        setLoading(true);
        console.log('In weather Details component')
        try {
            const response = await axios.get(
                `http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query=${capitalName}`
            );
            const data = response.data;
            console.log("data", data);
            setWeatherInfo(data.current);
            setLoading(false);
        } catch (error) {
            setWeatherApiError(true);
        }
    }, [capitalName]);

    useEffect(() => {
        getWeatherInfo();
    }, []);

    const icon = weatherInfo?.weather_icons.length ? weatherInfo?.weather_icons.toString() : '';

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {weatherInfo ? (
                <View>
                    {weatherInfo.weather_icons.length ? (
                        weatherInfo?.weather_icons.map(Item => (
                            <Image
                                source={{ uri: Item }}
                                style={{ height: 200, width: 200 }}
                            />
                        ))
                    ) : null}


                    <Text style={{paddingTop: 20}}>Temperature: {weatherInfo.temperature} <Text>o</Text> </Text>
                    <Text style={{paddingTop: 20}}>Wind Speed: {weatherInfo.wind_speed}</Text>
                    <Text style={{paddingTop: 20}}>
                        Precip: {weatherInfo.precip}
                    </Text>

                </View>
            ) : (
                <View>
                    {weatherApiError ? (
                        <>
                            <Text style={{paddingTop: 20}}>
                                Weather info not found. Please try again!
                            </Text>
                        </>
                    ) : (
                        <Text style={{paddingTop: 20}}>
                            {loading ? 'Loading...' : ''}
                        </Text>
                    )}
                </View>
            )}

        </View>
    )


}

export default WeatherInfo;

