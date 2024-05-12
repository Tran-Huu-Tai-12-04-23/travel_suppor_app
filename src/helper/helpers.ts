export const config = {
   headerTitleStyle: {
      color: 'white',
   },
   headerTintColor: '#fff',
   headerBackTitleVisible: false,
};

const Helper = {
   formatVND: (money: number, prefix = 'VNĐ') => {
      return new Intl.NumberFormat('vi-VN').format(money || 0) + ' ' + prefix;
   },
};

export default Helper;

export function vndToUsd(amountInVnd: number) {
   const exchangeRate = 0.000043;
   const [integer, decimal] = exchangeRate.toFixed(2).split('.');
   const amountInUsd = amountInVnd * Number(integer) + (amountInVnd * Number(decimal)) / 100;
   return amountInUsd;
}
