import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
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
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

  function setSecondsPassedFunction(seconds: number) {
    setSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, finishDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleID(newCycle.id);
    setSecondsPassed(0);
  }

  function stopCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, stopDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleID(null);
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
