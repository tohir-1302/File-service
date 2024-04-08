import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Minio from 'minio'
import { v4 as uuidv4 } from 'uuid'
import { FilePathGeneratorHelper } from 'src/common/helpers/file.path.generator.helper'
import { extname } from 'path'
// import { GetUrlDto } from 'src/uploader/dto/getUrl.dto'

@Injectable()
export class MinioService {
  private minioClient: Minio.Client
  private bucketName: string

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
        endPoint: this.configService.get('MINIO_ENDPOINT'),
        port: Number(this.configService.get('MINIO_PORT')),
        useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
        accessKey: this.configService.get('MINIO_ACCESS_KEY'),
        secretKey: this.configService.get('MINIO_SECRET_KEY')
      })
      this.bucketName = this.configService.get('MINIO_BUCKET_NAME')
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName)
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'eu-west-1', function (err) {
        if (err) { return console.log('Error creating bucket. ', err) }
        console.log('Bucket created successfully in "us-east-1".');
      })
    }
  }

  async uploadFile(file: Express.Multer.File, category: string): Promise<string> {
    const path = await FilePathGeneratorHelper.makeFilePath(category)
    const fileName = `${path}/${uuidv4()}-${Date.now()}${extname(file.originalname)}`
    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size
    )
    return fileName
  }

  async deleteFile(fileName: string) {
    await this.minioClient.removeObject(this.bucketName, fileName)
  }

  async downloadFile(filePath: string):Promise<any> {
    try {
      const objectStream = await this.minioClient.getObject(this.bucketName, filePath);
      return objectStream
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }
}
