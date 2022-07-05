import { Injectable } from '@nestjs/common';
import {ConfigModuleMaps } from './google-maps.module.config';
import { Client } from '@googlemaps/google-maps-services-js';
import { local } from './interfaces/info-local.interface';

@Injectable()
export class MapsService extends Client {
  constructor(private config:ConfigModuleMaps) {
    super();
  }

  //Api google retorna 20 resultados
  async getHotels(latitude: number, longitude: number): Promise<local[]> {
    const { data } = await this.placesNearby({
      params: {
        type: 'hotels',
        radius: 1500,
        location: [latitude, longitude],
        key: this.config.apiKey,
      },
    });

    const hotelsInfo = data.results.map(
      (hotel) =>
        ({
          name: hotel.name,
          rating: hotel.rating,
          localId: hotel.place_id,
          location: [
            hotel.geometry?.location.lat,
            hotel.geometry?.location.lng,
          ],
        } as local),
    );

    return hotelsInfo;
  }
}
