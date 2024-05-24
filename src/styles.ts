import { borderColor, btnPrimary, labelColor } from "@constants/Colors";
import { StyleSheet } from "react-native";

export const styleGlobal = StyleSheet.create({
  point: {
    padding: 8,
    borderRadius: 100,
    elevation: 10,
    backgroundColor: btnPrimary,
    shadowColor: "#00ff20",
    shadowOffset: { width: 20, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 110,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  textHeader: {
    fontSize: 32,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  center: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  shadow: {
    elevation: 5,
    shadowColor: borderColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 110,
  },
  shadowForce: {
    elevation: 5,
    shadowColor: borderColor,
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 1,
    shadowRadius: 1000000,
  },
  icon: { width: 30, height: 30 },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: borderColor,
    borderStyle: "solid",
  },
  border: { borderWidth: 1, borderColor: borderColor, borderStyle: "solid" },
  borderTop: {
    borderTopWidth: 1,
    borderColor: borderColor,
    borderStyle: "solid",
  },
  text: {
    color: "#1F2937",
    fontSize: 13,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    color: labelColor,
    fontSize: 13,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "100%",
  },
});
