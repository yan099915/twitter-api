import React from "react";
import { useForm } from "react-hook-form";

const Navbar = ()=> {

  const { register, handleSubmit } = useForm();
  const onSubmit = data  => console.log(data);
   
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} />
        <select {...register("gender")}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
        <input type="submit" />
        </form>
    </div>
  );
}

export default Navbar;