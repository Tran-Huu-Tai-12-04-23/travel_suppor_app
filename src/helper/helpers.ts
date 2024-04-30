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
function dayjs(text: Date) {
   throw new Error('Function not implemented.');
}
