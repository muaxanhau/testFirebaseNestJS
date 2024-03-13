import { SetMetadata } from '@nestjs/common';

export const NoAuthGuard = () => SetMetadata('noAuthGuard', true);
