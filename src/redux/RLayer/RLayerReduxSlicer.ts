import { createSlice } from '@reduxjs/toolkit';
import { RModel } from '../../renderer/utils/RModel';
import { IPoint } from 'makerjs';

interface initialState {
  models: Map<
    string,
    {
      model: RModel;
      displayName: string;
      origin: IPoint;
    }
  >;
  priority: string[];
  width: number;
  height: number;
}

interface addModelPayload {
  payload: {
    name: string;
    model: RModel;
    origin: IPoint;
    displayName: string;
  };
}
interface removeModelPayload {
  payload: {
    name: string;
  };
}
interface rerenderModelPayload {
  payload: {
    name: string;
    model: RModel;
  };
}
interface renameDisplayNamePayload {
  payload: {
    name: string;
    displayName: string;
  };
}
interface setDimensionsPayload {
  payload: {
    width?: number;
    height?: number;
  };
}
interface setOriginPayload {
  payload: {
    name: string;
    origin: IPoint;
  };
}

export const RLayerSlicer = createSlice({
  name: 'RLayer',
  initialState: {
    models: new Map<
      string,
      {
        model: RModel;
        displayName: string;
        origin: IPoint;
      }
    >(),
    priority: [],
    width: 0,
    height: 0,
  } as initialState,
  reducers: {
    addModel: (state, action: addModelPayload) => {
      if (!state.models.has(action.payload.name)) {
        state.models.set(action.payload.name, {
          model: action.payload.model,
          displayName: action.payload.displayName,
          origin: action.payload.origin,
        });
        state.priority.push(action.payload.name);
      }
    },
    removeModel: (state, action: removeModelPayload) => {
      if (state.models.has(action.payload.name)) {
        state.models.delete(action.payload.name);
        state.priority = state.priority.filter(
          (name) => name !== action.payload.name
        );
      }
      return;
    },
    rerenderModel: (state, action: rerenderModelPayload) => {
      if (
        state.models.has(action.payload.name) &&
        state.models
          .get(action.payload.name)
          ?.model.isEqual(action.payload.model)
      ) {
        state.models.set(action.payload.name, {
          ...Object(state.models.get(action.payload.name)),
          model: action.payload.model,
        });
      }
    },
    renameDisplayName: (state, action: renameDisplayNamePayload) => {
      if (state.models.has(action.payload.name)) {
        state.models.set(action.payload.name, {
          ...Object(state.models.get(action.payload.name)),
          displayName: action.payload.displayName,
        });
      }
    },
    setDimensions: (state, action: setDimensionsPayload) => {
      state.width = action.payload.width || state.width;
      state.height = action.payload.height || state.height;
    },
    setOrigin: (state, action: setOriginPayload) => {
      if (state.models.has(action.payload.name)) {
        state.models.set(action.payload.name, {
          ...Object(state.models.get(action.payload.name)),
          origin: action.payload.origin,
        });
      }
    },
  },
});

export const {
  addModel,
  removeModel,
  rerenderModel,
  renameDisplayName,
  setDimensions,
  setOrigin,
} = RLayerSlicer.actions;
