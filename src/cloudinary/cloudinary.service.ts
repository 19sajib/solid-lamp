import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: [
              { quality: "auto:low" } // Adjust the width, height, and quality as needed
          ]
      },
        (error, result) => {
          if (error) return reject(error);
          resolve(result)
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

}
