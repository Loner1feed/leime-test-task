import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";

import { Heart } from "./icons";

import { Meme } from "@/types/meme";

interface MemeCardProps {
  data: Meme;
}

export const MemeCard: React.FC<MemeCardProps> = ({ data }) => {
  return (
    <Link href={data.imgUrl} target="__blank">
      <Card isFooterBlurred className="border-none w-full">
        <CardBody className="p-0 min-h-[300px] max-h-[300px]">
          <Chip
            className="absolute top-2 left-2 z-[11]"
            startContent={<Heart className="mx-1" fill="red" size={16} />}
            variant="faded"
          >
            {data.likes}
          </Chip>
          <Image
            removeWrapper
            className="object-cover h-[300px] w-full"
            src={data.imgUrl}
          />
        </CardBody>
        <CardFooter>
          <p className="text-sm line-clamp-3 h-[3lh]">{data.name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
