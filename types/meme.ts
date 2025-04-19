export interface Meme {
  id: number;
  name: string;
  imgUrl: string;
  likes: number;
}

export type MemeValidation = Partial<{ [P in keyof Meme]: string }>;
