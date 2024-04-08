import { Module } from '@nestjs/common';
import { PublicFileService } from './public-file.service';
import { PublicFileController } from './public-file.controller';

@Module({
  controllers: [PublicFileController],
  providers: [PublicFileService],
})
export class PublicFileModule {}
