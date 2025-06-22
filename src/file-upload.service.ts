import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      filename: file.originalname,
    };
  }
}
