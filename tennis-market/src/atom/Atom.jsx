import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// modalcode
const AlertOpen = atom({
  key: "AlertOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const AlertOpen1 = atom({
  key: "AlertOpen1", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export  {AlertOpen, AlertOpen1}