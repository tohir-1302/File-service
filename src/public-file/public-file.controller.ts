import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, NotFoundException, Res } from '@nestjs/common';
import { PublicFileService } from './public-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('public-file')
export class PublicFileController {
  constructor(private readonly publicFileService: PublicFileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('category') category: string
  ): Promise<{ filePath: string }> {
    const filePath = await this.publicFileService.uploadFile(file, category);
    return { filePath };
  }

  @Get('download/*')
  async getFileWithPath(@Param('0') filePath: string, @Res() res: Response) {
    const file = await this.publicFileService.getFilePath(filePath)
    const stream = fs.createReadStream(file);
    stream.pipe(res);
  }
}
