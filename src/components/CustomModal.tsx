import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import TextDefault from "./TextDefault";
import Row from "./Row";
import { btnPrimary, whiteColor } from "@constants/Colors";
import ButtonCustom from "./ButtonCustom";

type CustomModalProps = {
  children?: React.ReactNode;
  isModalVisible: boolean;
  toggleModal?: () => void;
  onReject?: () => void;
  onAccept: () => void;
  title?: string;
  content?: string;
  nameBtnCancel?: string;
  nameBtnConfirm?: string;
};
const CustomModal = ({
  children,
  isModalVisible,
  toggleModal,
  onReject,
  onAccept,
  title,
  content,
  nameBtnCancel = "Quay lại",
  nameBtnConfirm = "Xác nhận",
}: CustomModalProps) => {
  return (
    <Modal
      animationIn="bounceIn"
      animationOut={"bounceOut"}
      isVisible={isModalVisible}
      onBackdropPress={() => toggleModal?.()}
    >
      <Row direction="column" style={[styles.container]}>
        {title && (
          <View
            style={{
              marginBottom: 5,
            }}
          >
            <TextDefault
              style={{
                fontWeight: "700",
                fontSize: 16,
                paddingLeft: 10,
                textAlign: "center",
              }}
            >
              {title}
            </TextDefault>
          </View>
        )}
        {content && content}
        {children}
        <Row full center colGap={20} style={{ paddingTop: 20 }}>
          {onReject && (
            <TouchableOpacity onPress={onReject} style={styles.btnCancel}>
              <TextDefault
                style={{
                  color: "red",
                }}
              >
                {nameBtnCancel}
              </TextDefault>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.btnAccept} onPress={onAccept}>
            <TextDefault
              style={{
                color: whiteColor,
              }}
            >
              {nameBtnConfirm}
            </TextDefault>
          </TouchableOpacity>
        </Row>
      </Row>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  btnAccept: {
    width: 100,
    borderRadius: 10,
    backgroundColor: btnPrimary,
    padding: 10,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "800",
  },
  btnCancel: {
    width: 100,
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    color: whiteColor,
    fontWeight: "800",
  },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
});
