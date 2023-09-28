import { SetMetadata } from '@nestjs/common';
import { DECORATOR_KEY } from 'src/common/constants';

export const IsPublic = () => SetMetadata(DECORATOR_KEY.IS_PUBLIC, true);
