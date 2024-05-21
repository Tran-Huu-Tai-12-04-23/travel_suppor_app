export const config = {
  headerTitleStyle: {
    color: "white",
  },
  headerTintColor: "#fff",
  headerBackTitleVisible: false,
};

const Helper = {
  formatVND: (money: number, prefix = "VNĐ") => {
    return new Intl.NumberFormat("vi-VN").format(money || 0) + " " + prefix;
  },
};

export default Helper;

export function vndToUsd(amountInVnd: number) {
  const exchangeRate = 23000;
  const amountInDollar = amountInVnd / exchangeRate;
  return amountInDollar.toFixed(2);
}
