import { configureStore } from '@reduxjs/toolkit';
import { RLayerSlicer } from './RLayerReduxSlicer';
import { useDispatch, useSelector } from 'react-redux';
const RLayerStore = configureStore({
  reducer: {
    RLayer: RLayerSlicer.reducer,
  },
});
export type RootState = ReturnType<typeof RLayerStore.getState>;
export type RLayerDispatch = typeof RLayerStore.dispatch;
export const useRLayerSelector = useSelector.withTypes<RootState>();
export const useRLayerDispatch = useDispatch<RLayerDispatch>();
export default RLayerStore;
