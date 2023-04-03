import {
  Button,
  Box,
  FormControl,
  Stack,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import { AxiosError } from "axios";
import { Product } from "database";
import * as React from "react";

import { BuyResult, ImageUploadResult } from "@types";
import { apiClient } from "@api";
import { NumberFormatCustom, ShowErrors } from "@components";
import { ProductImage } from "./ProductImage";

type Props = {
  onAdd: () => {};
};

export const AddProductForm = ({ onAdd }: Props) => {
  const [newProduct, setNewProduct] = React.useState<Partial<Product>>();

  const [error, setError] = React.useState<AxiosError>();

  const [uploadedFile, setUploadedFile] = React.useState<Blob | null>(null);
  const [url, setUrl] = React.useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.value) {
      const image = event.target.files[0];
      setUploadedFile(image);
      setUrl(URL.createObjectURL(image));
    }
  };

  const handleSubmit = async () => {
    try {
      if (uploadedFile) {
        const body = new FormData();
        body.append("file", uploadedFile);
        await apiClient
          .post<ImageUploadResult>("/products/image/upload", body, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            return apiClient.post<BuyResult>("/products", {
              ...newProduct,
              productImage: response.data.filename,
            });
          });
      } else {
        await apiClient.post<BuyResult>("/products", newProduct);
      }
      onAdd();
    } catch (e) {
      setError(e as AxiosError);
    }
  };

  return (
    <Box sx={{ width: "300px" }}>
      <Typography mb={5} textAlign="center" variant="h4">
        add product
      </Typography>

      <Stack gap={4}>
        <TextField
          label="cost"
          value={newProduct?.cost ? newProduct?.cost / 100 : undefined}
          onChange={(e) => {
            setNewProduct((current) => ({
              ...current,
              cost: parseFloat(e.target.value) * 100,
            }));
          }}
          InputProps={{
            inputComponent: NumberFormatCustom as any,
          }}
          variant="outlined"
        />
        <FormControl>
          <TextField
            label="amount available"
            value={newProduct?.amountAvailable}
            onChange={(event) => {
              setNewProduct((current) => ({
                ...current,
                amountAvailable: parseInt(event.target.value),
              }));
            }}
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="product name"
            onChange={(event) => {
              setNewProduct((current) => ({
                ...current,
                productName: event.target.value,
              }));
            }}
            type="text"
          />
        </FormControl>

        <FormControl>
          <ProductImage url={url} />
          <Input type="file" onChange={handleChange} />
        </FormControl>

        <Button onClick={handleSubmit} variant="outlined">
          submit
        </Button>
      </Stack>
      <ShowErrors error={error as AxiosError} />
    </Box>
  );
};
