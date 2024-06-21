import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// modalcode
const ModalOpen = atom({
  key: "ModalOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const ConfirmOpen = atom({
  key: "ConfirmOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const AlertOpen = atom({
  key: "AlertOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});


// -- auth --
const user_role = atom({
  key: "user_role", // unique ID (with respect to other atoms/selectors)
  default: "BUYER", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const user_info = atom({
  key: "user_info", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});


const TOTAL_SHIPPING_FEE = atom({
  key: "TOTAL_SHIPPING_FEE", // unique ID (with respect to other atoms/selectors)
  default: 0,// default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const TOTAL_PRICE = atom({
  key: "TOTAL_ORDER", // unique ID (with respect to other atoms/selectors)
  default: 0,// default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const OREDER_DATA = atom({
  key: "OREDER_DATA", // unique ID (with respect to other atoms/selectors)
  default: {},// default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const OREDER_PRODUCT_ARRAY = atom({
  key: "OREDER_PRODUCT_ARRAY", // unique ID (with respect to other atoms/selectors)
  default:[],// default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const ORDER_DETAIL = atom({
  key: "ORDER_DETAIL", // unique ID (with respect to other atoms/selectors)
  default:{},// default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export  {ModalOpen, ConfirmOpen,AlertOpen, user_role, user_info, TOTAL_PRICE, TOTAL_SHIPPING_FEE, OREDER_DATA, OREDER_PRODUCT_ARRAY, ORDER_DETAIL}