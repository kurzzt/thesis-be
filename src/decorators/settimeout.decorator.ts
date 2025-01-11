import { SetMetadata } from '@nestjs/common';

export const TIME_OUT = 'timeout';
export const SetTimeout = (timeout: number) => SetMetadata(TIME_OUT, timeout);
