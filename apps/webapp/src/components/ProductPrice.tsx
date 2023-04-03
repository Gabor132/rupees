import { CurrencyRupee } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NumberFormatCustom } from "./NumberFormatCustom";
import { apiClient } from "@api";
import { Product } from "database";

type Props = {
  product: Product;
  isOwner: boolean;
};

export const ProductPrice = ({ product, isOwner }: Props) => {
  const [newCost, setNewCost] = useState<number>(product.cost);

  const updateProductPrice = () => {
    const newProduct = {
      ...product,
      cost: newCost,
    };
    apiClient.put("/products", newProduct);
  };

  const isEditable = () => {
    return isOwner;
  };

  return isEditable() ? (
    <React.Fragment>
      <TextField
        label="cost"
        value={newCost / 100}
        onChange={(e) => {
          setNewCost(parseFloat(e.target.value) * 100);
        }}
        InputProps={{
          inputComponent: NumberFormatCustom as any,
        }}
        variant="outlined"
      />
      <Button onClick={updateProductPrice}>Update</Button>
    </React.Fragment>
  ) : (
    <Typography fontSize={25} fontWeight="700" color="secondary" display="flex">
      <CurrencyRupee fontSize="large" />
      {newCost / 100}
    </Typography>
  );
};
