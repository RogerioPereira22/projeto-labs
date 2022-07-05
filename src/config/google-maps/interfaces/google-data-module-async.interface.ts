import { ModuleMetadata, Type } from '@nestjs/common';
import {  ConfigModuleMaps } from '../google-maps.module.config';

export interface  GoogleModuleAsyncFac {
  creatGoogleDataModule():
    | Promise< ConfigModuleMaps>
    |  ConfigModuleMaps;
}

export interface  GoogleModuleAsyncOp
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type< ConfigModuleMaps>;
  useClass?: Type< ConfigModuleMaps>;
  useFactory?: (
    ...args: any[]
  ) => Promise< ConfigModuleMaps> |  ConfigModuleMaps;
}
