import { API_URL } from "@constants";
import { ProductImage } from "./ProductImage";

type Props = {
  url: string | null;
};

export const UploadedProductImage = ({ url }: Props) => {
  const getURL = (): string | null => {
    if (url) return API_URL + "/" + url;
    return null;
  };

  return <ProductImage url={getURL()} />;
};
