import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import { Dimension } from './dimension';
import colors from '../themes/colors';

const CityDropDown = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
    const { open, setOpen, value, setValue, items, setItems, onChangeValue } = props;
    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            searchable={true}
            placeholder="Search city with name here"
            showTickIcon={true}
            onChangeValue={onChangeValue}
            onSelectItem={(item) => {   //prop isnt here yet will be availabe in next release https://github.com/hossein-zare/react-native-dropdown-picker/issues/474
                // console.log(item);
            }}
        />
    );
};

CityDropDown.defaultProps = {
    allowFontScaling: false,
    index: '0'
};

const styles = StyleSheet.create({
    text: {
        fontSize: Dimension(12)
    },
});

export { CityDropDown };
