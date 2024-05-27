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
  // effects_UNSTABLE: [persistAtom],
});
const user_info = atom({
  key: "user_info", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});


export  {ModalOpen, ConfirmOpen,AlertOpen, user_role, user_info}