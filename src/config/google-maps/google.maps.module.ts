import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModuleMaps } from './google-maps.module.config';
import { MapsService } from './google-maps.service';
import { GoogleModuleAsyncOp } from './interfaces';

@Global()
@Module({})
export class GoogleMapsDataCoreModule {
  public static forRootAsync(
    options: GoogleModuleAsyncOp,
  ): DynamicModule {
    return {
      module: GoogleMapsDataCoreModule,
      imports: [...options.imports],
      exports: [MapsService],
      providers: [
        {
          provide: ConfigModuleMaps,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        MapsService,
      ],
    };
  }
}

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class GoogleMapsModule {
  public static forRootAsync(
    options: GoogleModuleAsyncOp,
  ): DynamicModule {
    return {
      module: GoogleMapsModule,
      imports: [GoogleMapsDataCoreModule.forRootAsync(options)],
    };
  }
}
