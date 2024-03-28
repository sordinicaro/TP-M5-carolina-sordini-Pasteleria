import zod from "zod";

const employees = zod.object({
    id: zod.number(),
    cacke: zod.string(),
    ingredients: zod.array(zod.string()),
    size: zod.string(),


});

const validatePartialCacke = (obj: any) => employees.partial().safeParse(obj);




export { validatePartialCacke };