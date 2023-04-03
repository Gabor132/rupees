import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { ROLE } from "src/users/constants";
import { Roles } from "src/users/roles.decorator";
import { RoleGuard } from "src/users/roles.guard";

import { LoggedInGuard } from "../auth/logged-in.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from "@nestjs/common/pipes";
import { FileInterceptor } from "@nestjs/platform-express";

type RequestWithUser = Request & { user: User };

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(LoggedInGuard, RoleGuard)
  @Roles(ROLE.SELLER)
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: RequestWithUser
  ) {
    return this.productsService.create(createProductDto, request.user);
  }

  @Get()
  @UseGuards(LoggedInGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  @UseGuards(LoggedInGuard)
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Delete(":id")
  @UseGuards(LoggedInGuard)
  remove(@Param("id") id: string, @Req() request: RequestWithUser) {
    return this.productsService.remove(id, request.user);
  }

  @Post("image/upload")
  @Roles(ROLE.SELLER)
  @UseInterceptors(FileInterceptor("file", { dest: "./images" }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      })
    )
    file
  ) {
    return file;
  }
}
