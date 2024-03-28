import zod from "zod";

const employees = zod.object({
  employee: zod.number(),
  username: zod.string(),
  password: zod.string(),
  age: zod.number(),
  phone: zod.string(),
  email: zod.string(),
  token: zod.string()


});

const validateUser = (obj: any) => employees.safeParse(obj);
const validatePartialUser = (obj: any) => employees.partial().safeParse(obj);




export { validateUser, validatePartialUser };