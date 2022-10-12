import { combineReducers, createStore } from "redux";
import CollapsedReducer from "./reducer/CollapsedReducer";
import SpinningReducer from "./reducer/SpinningReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "lbw",
  storage,
  blacklist: ['SpinningReducer']
};
const reducer = combineReducers({
  CollapsedReducer,
  SpinningReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };
