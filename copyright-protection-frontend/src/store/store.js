import wallet from './wallet.module';
import cover from './cover.module';
import Vuex from 'vuex';


export default new Vuex.Store({
    modules: {
        wallet,
        cover,
    }
});
