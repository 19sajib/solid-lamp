import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { LifeStyleService } from './lifestyle.service';
import { AdminGuard } from 'src/utils/guard/admin.guard';
import { AuthGuard } from 'src/utils/guard/auth.guard';

@ApiTags('Life Style Controller')
@ApiBearerAuth()
@Controller('lifestyle')
export class LifeStyleController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly lifeStyleService: LifeStyleService
  ) {}

  @UseGuards(AdminGuard)
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
    const result: CloudinaryResponse =
      await this.cloudinaryService.uploadFile(file);
    return { url: result.secure_url };
  }

  @UseGuards(AdminGuard)
  @Get('upload/:companyId')
  async getUploadByCompanyId(@Param('companyId') companyId: string) {
    return await this.lifeStyleService.getUploadByCompanyId(companyId)
  }

  @UseGuards(AdminGuard)
  @Patch('upload/:uploadId')
  async reviewUpload(@Param('uploadId') uploadId: string) {
    return await this.lifeStyleService.reviewUpload(uploadId)
  }


  @UseGuards(AuthGuard)
  @Get(':companyId')
  async getLifeStyle(@Param('companyId') companyId: string) {
    return await this.lifeStyleService.getLifeStyle(companyId)
  }


  // ---> User Actions <---

  @UseGuards(AuthGuard)
  @Post(':companyId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  async addLifeStyle(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('companyId') companyId: string,
    @Req() req: any
  ) {

    let reviewerId = req.user;
    let imageLinks = [];
    for(const file of files) {
        const result: CloudinaryResponse =
                await this.cloudinaryService.uploadFile(file);
        imageLinks.push(result.secure_url)
    }
    return await this.lifeStyleService.addLifeStyle(imageLinks, companyId, reviewerId)
  }
}
