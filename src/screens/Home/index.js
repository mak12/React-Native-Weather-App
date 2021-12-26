import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator, FlatList, ScrollView, Image, Dimensions, useColorScheme } from 'react-native';
import { AppButton, AppText, CityDropDown, Dimension } from '../../ui-kit';
import { API_KEY, jsCoreDateCreator, ScreenKeys } from '../../utilities';
import { PrintLog } from '../../utilities';
import {
    LineChart
} from "react-native-chart-kit";
import { styles } from './styles'
import Card from '../../ui-kit/Card';
import colors from '../../themes/colors';

const Home = ({ navigation, route }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [weekData, setWeekData] = useState(null);
    const [hourData, setHourData] = useState(null);
    const [chartParentWidth, setChartParentWidth] = useState(0);
    const [citiesData, setCitiesData] = useState([
        { label: 'Rawalpindi', value: 'Rawalpindi', cityID: 1, lat: 33.5651, lng: 73.0169 },
        { label: 'Islamabad', value: 'Islamabad', cityID: 2, lat: 33.6844, lng: 73.0479 },
        { label: 'Karachi', value: 'Karachi', cityID: 3, lat: 24.8607, lng: 67.0011 }

    ]);
    useEffect(() => {
        setValue('Rawalpindi')  //defaul val for city
        fetchWeatherData('Rawalpindi');
    }, [])

    const processData = (data) => {
        const allData = [];
        Object.entries(data.list).forEach(([key, value]) => {
            const dateTime = jsCoreDateCreator(value.dt_txt);   // becasue of JAVAscript core new Date wasnt working for android devices https://github.com/facebook/react-native/issues/15819#issuecomment-369976505
            const day = dateTime.getDate();
            const time = dateTime.getHours();
            const month = dateTime.toLocaleString('default', { month: 'short' });
            console.log("date time ", day, time, month)
            // recreate objects of the array adding time anda day + month and 
            // keeping timestamp and the rest of the info
            const item = {
                day: day + " " + month,
                time: time,
                ...value
            };
            allData.push(item);
            return allData;
        });
        const groupBy = (groupedArray, groupedByDay) => {
            return groupedArray.reduce((acc, obj) => {
                const key = obj[groupedByDay];
                !acc[key] ? (acc[key] = []) : acc[key].push(obj);
                return acc;
            }, {});
        };

        const weatherData = groupBy(allData, 'day');
        setHourData(Object.values(weatherData)[0])
        const weekData = Object.values(weatherData).slice(1)
        const graphData = {
            labels: [],
            vals: []
        }
        for (const i of weekData) {
            const { day, main } = i[0];
            graphData.labels.push(day)
            graphData.vals.push(Math.round(main.temp_max))
        }
        setWeekData(graphData)
        setLoaded(true);
    }
    const fetchWeatherData = async (cityName) => {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&exclude=minutely&appid=${API_KEY}&units=metric`

        try {
            const response = await fetch(API);
            if (response.status == 200) {
                const data = await response.json();
                PrintLog(data);
                processData(data);
                console.log("weather data ", data)
                // setWeatherData(data);
            } else {
                PrintLog(response)
                setWeatherData(null);
                setLoaded(true);

            }

        } catch (error) {
            setLoaded(true);

            PrintLog(error);
        }
    }


    if (!loaded) {
        return (
            <View style={[styles.container, {
                alignItems: 'center',
                justifyContent: 'center',
            }]}>
                <ActivityIndicator color='gray' size={36} />
            </View>

        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{
                    paddingHorizontal: 20
                }}>
                    <AppText style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: Dimension(27)
                    }}>Weather App</AppText>
                    <View
                        onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}

                        style={{

                            marginTop: Dimension(20)
                        }}>
                        <CityDropDown
                            open={open}
                            setOpen={setOpen}
                            value={value}
                            setValue={setValue}
                            items={citiesData}
                            setItems={setCitiesData}
                            onChangeValue={(value) => {
                                fetchWeatherData(value)
                            }}
                        />

                        {hourData.length ? <FlatList
                            style={{ marginTop: Dimension(15) }}
                            horizontal
                            data={hourData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                const weather = item.weather[0];
                                var dt = jsCoreDateCreator(item.dt_txt);
                                return <Card style={{
                                    marginEnd: 10
                                }}>
                                    <View style={styles.hour}>
                                        <AppText>{dt.toLocaleString('en-US', { hour: 'numeric', hour12: true })}</AppText>
                                        <AppText >{Math.round(item.main.temp)}°C</AppText>
                                        <AppText >Feels like {Math.round(item.main.feels_like)}°C </AppText>

                                        <Image
                                            style={styles.smallIcon}
                                            source={{
                                                uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                                            }}
                                        />
                                        <AppText>{weather.description ? weather.description : '-'}</AppText>
                                    </View>
                                </Card>
                            }}
                        />
                            :
                            <AppText style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginVertical: Dimension(15),
                                fontSize: Dimension(27)
                            }}>No hourly data found</AppText>
                        }
                        {weekData && <LineChart
                            data={{
                                labels: weekData.labels,
                                datasets: [
                                    {
                                        data: weekData.vals
                                    }
                                ]
                            }}
                            width={chartParentWidth} // from react-native
                            height={220}
                            yAxisSuffix="°C"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#1aa3ff",
                                backgroundGradientFrom: colors.blue,
                                backgroundGradientTo: colors.lightBlue,
                                decimalPlaces: 1, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginTop: Dimension(15),
                                borderRadius: 16,
                                marginEnd: 20
                            }}
                        />}

                        <AppButton
                            text="View City on Map"
                            onPress={() => {
                                const cityData = citiesData.filter(item => item.value == value)
                                navigation.navigate(ScreenKeys.MapView, {
                                    cityData: cityData[0]
                                })
                            }}
                            style={{ marginVertical: Dimension(5) }}
                        />

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export { Home };