import { images } from "@/constants";
import { spaces } from "@/constants/space.const";
import { RootState } from "@/store";
import { horizontalScale, verticalScale } from "@/utils";
import { getDate } from "@/utils/time";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    Modal,
} from "react-native";
import { useSelector } from "react-redux";

interface ReviewSummaryScreenProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
    data: any;
}

const ReviewSummaryScreen = ({
    visible,
    setVisible,
    data,
}: ReviewSummaryScreenProps) => {
    const [count, setCount] = useState(1);
    const Colors = useSelector((state: RootState) => state.theme.palette);

    // Function to handle increment
    const handleIncrement = () => {
        if (count < data.supplyTotal - data.purchasedAmount) {
            setCount(count + 1);
        }
    };

    // Function to handle decrement
    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    const [color, setColor] = useState<string>("rgba(0, 0, 0, 0.5)");
    useEffect(() => {
        if (visible) {
            setColor("rgba(0, 0, 0, 0.5)");
        }
    }, []);
    const toggleVisible = () => {
        setVisible(false);
        setColor("rgba(139, 69, 19, 0)");
    };
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
            style={{ justifyContent: "flex-end", height: "100%" }}
            onRequestClose={toggleVisible}
        >
            <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{ height: "50%", backgroundColor: color }}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Thông tin giao dịch</Text>

                {/* Apartment Information */}
                <View style={styles.card}>
                    <Image source={images.RECARD_DEFAULLT} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.apartmentName}>
                            {data.tokenName}
                        </Text>
                        <Text style={styles.location}>{data.address}</Text>
                        <Text style={styles.price}>
                            {parseInt(
                                data.valuationPerToken,
                                10
                            ).toLocaleString()}{" "}
                            coin/Token
                        </Text>
                    </View>
                </View>

                {/* Booking Details */}
                <View style={styles.details}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.detailText}>Số lượng: </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                borderWidth: 0.5,
                                borderRadius: 10,
                                borderColor: Colors.BG_FORM
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleDecrement}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <View style={[styles.counter,{borderColor: Colors.BG_FORM,}]}>
                                <Text style={styles.counterText}>{count}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleIncrement}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.detailText}>
                        Tổng:{" "}
                        {`${(
                            parseInt(data.valuationPerToken, 10) * count
                        ).toLocaleString()} đ`}
                    </Text>
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        { backgroundColor: Colors.BG_BT_MAIN },
                    ]}
                    onPress={() => setVisible(false)}
                >
                    <Text style={[styles.continueButtonText]}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "80%",
        backgroundColor: "#fff",
        paddingHorizontal: spaces.globalPadding
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    infoContainer: {
        padding: 10,
        justifyContent: "center",
    },
    apartmentName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    location: {
        color: "#888",
    },
    price: {
        color: "#3498db",
        fontWeight: "bold",
        marginTop: 5,
    },
    details: {
        marginVertical: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: verticalScale(5),
        marginTop: verticalScale(10)
    },
    payment: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    paymentText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    changeText: {
        color: "#3498db",
        fontWeight: "bold",
    },
    continueButton: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    continueButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        alignItems: "center",
        width: horizontalScale(30),
        justifyContent: "center",
        paddingHorizontal: horizontalScale(5),
    },
    buttonText: {
        fontSize: 20,
        color: "#888",
    },
    counter: {
        height: verticalScale(40),
        justifyContent: "center",
        alignItems: "center",
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        width: horizontalScale(50),
        paddingVertical: verticalScale(5),
    },
    counterText: {
        fontSize: 16,
        color: "red",
    },
});

export default ReviewSummaryScreen;
