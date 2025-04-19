import { Meme, MemeValidation } from "@/types/meme";

export const formValidation = (parsedData: Meme) => {
  let errors: MemeValidation = {};

  if (!parsedData?.imgUrl) errors.imgUrl = "Image URL is required";

  if (!parsedData?.name || parsedData.name.length < 3)
    errors.name = "Name must be at least 3 characters long";

  if (
    !parsedData.imgUrl ||
    !parsedData.imgUrl.match(/(https?:\/\/.*\.(?:jpeg|jpg))/)
  )
    errors.imgUrl = "Image URL should be valid (JPG, JPEG)";

  return errors;
};
