import CustomModal from "@components/CustomModal";
import React from "react";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type ModalInfo = {
  content: ReactNode;
  title: string;
  nameAcceptButton: string;
  nameCancelButton: string;
  onAccept: () => void;
  onReject?: () => void;
};
const ModalContext = createContext<{
  openModal: (modalInfo: ModalInfo) => void;
  hideModal: () => void;
}>({
  hideModal: () => {},
  openModal: (modalInfo) => {},
});

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo | null>(null);

  const openModal = (modalInfo: ModalInfo) => {
    setVisible(true);
    setModalInfo(modalInfo);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const value = useMemo(
    () => ({
      hideModal,
      openModal,
    }),
    [hideModal, openModal]
  );

  return (
    <ModalContext.Provider value={value as any}>
      {isVisible && (
        <CustomModal
          isModalVisible={isVisible}
          toggleModal={() => {
            setVisible(!isVisible);
          }}
          onReject={() => {
            modalInfo?.onReject && modalInfo?.onReject();
          }}
          onAccept={async () => {
            modalInfo?.onAccept();
          }}
          title={modalInfo?.title}
          nameBtnCancel={modalInfo?.nameCancelButton}
          nameBtnConfirm={modalInfo?.nameAcceptButton}
        >
          {modalInfo?.content}
        </CustomModal>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context == null) {
    throw new Error("useModal must be used within a AuthProvider");
  }

  return context;
};

export default ModalProvider;
