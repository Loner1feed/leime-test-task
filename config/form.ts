import { InputProps } from "@heroui/input";
import { NumberInputProps } from "@heroui/number-input";

import { Meme } from "@/types/meme";
import { AllFieldsToType } from "@/utils/typeUtils";

export const textFieldsConf: AllFieldsToType<Partial<Meme>, InputProps> = {
  name: {
    name: "name",
    label: "Name",
    // minLength: 3,
    // maxLength: 100,
    // isRequired: true,
  },

  imgUrl: {
    name: "imgUrl",
    label: "Image URL",
  },
};

export const numberFieldsConf: AllFieldsToType<
  Partial<Meme>,
  NumberInputProps
> = {
  id: {
    name: "id",
    label: "ID",
    readOnly: true,
  },
  likes: {
    name: "likes",
    label: "Likes",
    maxValue: 99,
  },
};
