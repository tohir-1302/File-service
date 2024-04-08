import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path'
import { FilePathGeneratorHelper } from 'src/common/helpers/file.path.generator.helper';

@Injectable()
export class PublicFileService {
  private endPoint = './uploads/public'

  private async ensureDirectoriesExist(directory: string): Promise<void> {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true, mode: 0o775 })
    }
  }

  private async makeDirectories(category: string): Promise<string> {
    const directory = await FilePathGeneratorHelper.makeFilePath(category);
    this.ensureDirectoriesExist(`${this.endPoint}${directory}`)
    return directory
  }

  async uploadFile(file: Express.Multer.File, category: string): Promise<string> {
    const uniqueFilename = uuidv4() + '-' + Date.now() + extname(file.originalname)
    const directory = await this.makeDirectories(category)
    const filePath = `${directory}/${uniqueFilename}`
    await fs.promises.writeFile(`${this.endPoint}/${filePath}`, file.buffer)
    return filePath
  }

  async getFilePath(filePath: string): Promise<string> {
    const file = path.resolve(this.endPoint, filePath);
    if (!fs.existsSync(file)) {
      throw new NotFoundException('File not found');
    }
    return file
  }
}
