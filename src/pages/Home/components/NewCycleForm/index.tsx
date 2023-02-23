import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Choose task"),
  minutesAmount: zod.number().min(5).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  return (
    <FormContainer>
      <label htmlFor="task">I'm working on</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Give your project a name"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="Project 1"></option>
        <option value="Project 2"></option>
        <option value="Project 3"></option>
      </datalist>
      <label htmlFor="minutesAmount">for</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  );
}
