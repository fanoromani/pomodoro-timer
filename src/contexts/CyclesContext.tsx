import { createContext, ReactNode, useState, useReducer } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  stopCurrentCycleAction,
} from "../reducers/cycles/actions";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleID: string | null;
  secondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassedFunction: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  stopCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesCoontextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesCoontextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleID: null,
  });

  const [secondsPassed, setSecondsPassed] = useState(0);
  const { cycles, activeCycleID } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

  function setSecondsPassedFunction(seconds: number) {
    setSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setSecondsPassed(0);
  }

  function stopCurrentCycle() {
    dispatch(stopCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleID,
        secondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassedFunction,
        createNewCycle,
        stopCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
