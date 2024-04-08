import { Injectable } from '@nestjs/common';
import { MinioService } from 'src/common/services/minio/minio.service';

@Injectable()
export class PrivateFileService {
  constructor(
    private readonly minioService: MinioService,
  ) { }

  async uploadFile(file: Express.Multer.File, category: string): Promise<string> {
    await this.minioService.createBucketIfNotExists()
    const fileName = await this.minioService.uploadFile(file, category)
    return fileName
  }

  async downloadFileWithFilePath(filePath: string) {
    return await this.minioService.downloadFile(filePath)
  }
}
