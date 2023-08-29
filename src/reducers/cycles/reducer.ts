import { produce } from "immer";
import { ActionTypes } from "./actions";

interface CyclesState {
  cycles: Cycle[];
  activeCycleID: string | null;
}
export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleID = action.payload.newCycle.id;
      });
    case ActionTypes.STOP_CURRENT_CYCLE:
      const currentStopCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID;
      });
      if (currentStopCycleIndex < 0) return state;
      return produce(state, (draft) => {
        draft.activeCycleID = null;
        draft.cycles[currentStopCycleIndex].stopDate = new Date();
      });
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      const currentFinishedCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID;
      });
      if (currentFinishedCycleIndex < 0) return state;
      return produce(state, (draft) => {
        draft.activeCycleID = null;
        draft.cycles[currentFinishedCycleIndex].finishDate = new Date();
      });
    default:
      return state;
  }
}
