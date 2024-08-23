import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('Life Style Controller')
@Controller('lifestyle')
export class LifestyleController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}


    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary',
            },
          },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const result: CloudinaryResponse = await this.cloudinaryService.uploadFile(file)
        return { url: result.secure_url }
    }
}
