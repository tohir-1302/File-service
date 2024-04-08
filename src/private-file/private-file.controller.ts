import { Controller, Post, Body, UseInterceptors, NotFoundException, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { PrivateFileService } from './private-file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('private-file')
export class PrivateFileController {
  constructor(private readonly privateFileService: PrivateFileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('category') category: string
  ): Promise<{ filePath: string }> {
    try {
      const filePath = await this.privateFileService.uploadFile(file, category);
      return { filePath }
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  @Get('download/*')
  async downloadFile(@Param('0') filePath: string, @Res() res: Response,){
    try {
      const objectStream = await this.privateFileService.downloadFileWithFilePath(filePath)
      objectStream.pipe(res);
    } catch (error) {
      throw new NotFoundException(error)
    }
  } 
}
