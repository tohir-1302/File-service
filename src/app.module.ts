import { Module } from '@nestjs/common';
import { PublicFileModule } from './public-file/public-file.module';
import { PrivateFileModule } from './private-file/private-file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PublicFileModule, 
    PrivateFileModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
