import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Platform,
} from "react-native";
import {
    AppButton,
    Dimension,
} from "../../ui-kit";
import Geolocation from "@react-native-community/geolocation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { PrintLog } from "../../utilities";
let refMapView;

const MapScreen = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();

    const { cityData } = route.params;
    const [latlng, setLatlng] = useState({
        latitude: cityData.lat,
        longitude: cityData.lng,
    });

    refMapView = useRef();
    const animateCameraToPosition = (lat, lng, setLatlng, zoomLevel = 1) => {
        var curLoc = {
            latitude: lat,
            longitude: lng,
        };

        if (refMapView && refMapView.current.animateCamera) {
            refMapView.current.animateCamera({
                center: curLoc,
                zoom: zoomLevel,
                pitch: 0,
                heading: 0,
                altitude: 0,
            });
        }
        setLatlng(curLoc);
    };
    const moveAnimateCurLoc = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const location = JSON.stringify(position);
                var curLoc = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                animateCameraToPosition(
                    curLoc.latitude,
                    curLoc.longitude,
                    setLatlng,
                    18
                );
            },
            (error) => {
                PrintLog(error);
                if (Platform.OS == "ios") {
                    //   showOpenSettingsDialog();
                } else {
                    PrintLog("error ", error);

                    // logic to again ask for permissions

                }
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    };
    return (<View
        style={{ flex: 1 }}
    >

        <MapView
            style={{
                flex: 1,
            }}
            provider={PROVIDER_GOOGLE}
            mapType={"standard"}
            ref={refMapView}
            initialRegion={{
                latitude: latlng.latitude,
                longitude: latlng.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker
                key={1}
                coordinate={latlng}
            />
        </MapView>
        <View style={{
            position: 'absolute',
            top: insets.top,
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: Dimension(10)

        }}
        >
            <AppButton
                text="Go Back"
                onPress={() => {
                    navigation.goBack()
                }}
                style={{ marginVertical: Dimension(5) }}
            />
            <AppButton
                text="Where Am I ?"
                onPress={() => {
                    moveAnimateCurLoc()
                }}
                style={{ marginVertical: Dimension(5) }}
            />

        </View>
    </View>
    )
}
export { MapScreen };
