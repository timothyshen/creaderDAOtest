import wallet from "./wallet.module";
import cover from "./cover.module";
import chapter from "./chapter.module";
import accessToken from "./accessToken.module";
import Vuex from "vuex";

export default new Vuex.Store({
  modules: {
    wallet,
    cover,
    chapter,
    accessToken,
  },
});
