import CustomBottomSheet from '@components/CustomBottomSheet';
import { btnPrimary } from '@constants/Colors';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import bottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import React, { useEffect, useRef } from 'react';
import { FC, ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';

type BottomSheetInfoType = {
   content: ReactNode | null;
   title: string;
   snapPoints: any;
};
const BottomSheetContext = createContext<{
   openBottomSheet: (BottomSheetInfo: BottomSheetInfoType) => void;
   hideBottomSheet: () => void;
}>({
   hideBottomSheet: () => {},
   openBottomSheet: (bottomSheet: BottomSheetInfoType) => {},
});

const BottomSheetProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const bottomSheetRef = useRef<BottomSheet>(null);
   const [bottomSheetInfo, setBottomSheetInfo] = useState<BottomSheetInfoType | null>({
      content: null,
      title: '',
      snapPoints: null,
   });
   const handleClosePress = () => bottomSheetRef?.current?.close();
   const handleOpenBottomSheet = () => bottomSheetRef?.current?.expand();

   const openBottomSheet = (infoBottomSheet: BottomSheetInfoType) => {
      setBottomSheetInfo((prev) => {
         return {
            ...prev,
            title: infoBottomSheet.title ?? prev?.title,
            content: infoBottomSheet.content ?? prev?.content,
            snapPoints: infoBottomSheet.snapPoints ?? prev?.snapPoints,
         };
      });
   };

   const hideBottomSheet = () => {
      bottomSheetRef?.current?.close();
      setBottomSheetInfo({ content: null, title: '', snapPoints: null });
   };

   const value = useMemo(
      () => ({
         hideBottomSheet,
         openBottomSheet,
      }),
      [hideBottomSheet, openBottomSheet],
   );

   useEffect(() => {
      if (bottomSheetInfo?.snapPoints) {
         bottomSheetRef?.current?.expand();
      }
   }, [bottomSheetInfo]);

   return (
      <BottomSheetContext.Provider value={value as any}>
         {children}
         <CustomBottomSheet
            onClose={handleClosePress}
            onOpen={handleOpenBottomSheet}
            snapPoints={bottomSheetInfo?.snapPoints ?? [100]}
            ref={bottomSheetRef}
            title={bottomSheetInfo?.title ?? ''}
         >
            {bottomSheetInfo?.content}
         </CustomBottomSheet>
      </BottomSheetContext.Provider>
   );
};

export const useBottomSheet = () => {
   const context = useContext(BottomSheetContext);

   if (context == null) {
      throw new Error('useBottomSheet must be used within a AuthProvider');
   }

   return context;
};

export default BottomSheetProvider;
