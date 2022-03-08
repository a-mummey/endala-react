import {
  useRecoilValueLoadable,
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { keplrDerviedState, keplrErrorMsgViewed } from "../state";
import KeplrConnectError from "./errors/KeplrConnectError";
import KeplrMintError from "./errors/KeplrMintError";

function KeplrErrorModal() {
  const kState = useRecoilValueLoadable(keplrDerviedState);
  const isKeplrError = kState.valueMaybe() === "error";
  const isMintError = kState.valueMaybe() === "mint_error";
  const resetKeplrState = useResetRecoilState(keplrDerviedState);
  const viewedKeplrMessage = useRecoilValue(keplrErrorMsgViewed);
  const setViewedKeplrMessage = useSetRecoilState(keplrErrorMsgViewed);

  const CloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    resetKeplrState();
    setViewedKeplrMessage(true);
  };
  if (isMintError) {
    return <KeplrMintError closeFunc={CloseModal}></KeplrMintError>;
  } else if (isKeplrError && !viewedKeplrMessage) {
    return <KeplrConnectError closeFunc={CloseModal}></KeplrConnectError>;
  } else {
    return <></>;
  }
}

export default KeplrErrorModal;
