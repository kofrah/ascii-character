"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  form: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("form")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("form", {
          required: "入力してください！",
          maxLength: {
            value: 4,
            message: "4文字以内で入力してください",
          },
        })}
      />
      {/* errors will return when field validation fails  */}
      {errors.form && <span>{errors.form.message}</span>}

      <input type="submit" value="変換" />
    </form>
  );
}
