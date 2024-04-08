import { Module } from '@nestjs/common';
import { PrivateFileService } from './private-file.service';
import { PrivateFileController } from './private-file.controller';
import { MinioService } from 'src/common/services/minio/minio.service';

@Module({
  controllers: [PrivateFileController],
  providers: [PrivateFileService, MinioService],
})
export class PrivateFileModule {}
