import Image from "next/image";

type Props = {
  url: string | null;
};

export const ProductImage = ({ url }: Props) => {
  return url ? (
    <Image src={url} width={100} height={100} alt={"Failed to load image"} />
  ) : (
    <p>No image uploaded</p>
  );
};
