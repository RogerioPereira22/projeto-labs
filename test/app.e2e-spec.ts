import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppConfigModule, AppConfigService } from '../src/config';
import { rootMongooseTestModule } from '../src/root-mongo-test.module';
import { GoogleMapsModule } from 'src/config/google-maps'; 
import { HotelModule } from 'src/hotel/module/hotel.module';
import { ReservaModule } from 'src/reserva/module/reserva.module'; 
import { UsersModule } from 'src/users/module/users.module'

describe('API(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppConfigModule,
        rootMongooseTestModule(),
        GoogleMapsModule.forRootAsync({
          imports: [AppConfigModule],
          inject: [AppConfigService],
          useFactory: async (config: AppConfigService) =>
            config.googleMapsOptions,
        }),
        HotelModule,
        ReservaModule,
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/hotels should throw 400', () => {
    return request(app.getHttpServer()).get('/hotels').expect(400);
  });

  it('GET /hotels?latitude=48.130323&longitude=11.576362 should return hotels', () => {
    return request(app.getHttpServer())
      .get('/hotels?latitude=48.130323&longitude=11.576362')
      .expect(200);
  });

  it('POST /hotels?latitude=48.130323&longitude=11.576362 should add and return hotels', () => {
    return request(app.getHttpServer())
      .post('/hotels?latitude=48.130323&longitude=11.576362')
      .expect(201)
      .then((response) => {
        expect(response.body.length).toBe(20);
      });
  });

  it('POST /hotels?latitude=48.130323&longitude=11.576362 should add and return hotels', () => {
    return request(app.getHttpServer())
      .post('/hotels?latitude=48.130323&longitude=11.576362')
      .expect(201)
      .then((response) => {
        expect(response.body.length).toBe(20);
      });
  });

  it('POST /hotels?latitude=48.130323&longitude=11.576362 should add and return hotels', () => {
    return request(app.getHttpServer())
      .post('/hotels?latitude=48.130323&longitude=11.576362')
      .expect(201)
      .then((response) => {
        expect(response.body.length).toBe(20);
      });
  });

  it('POST /hotel/:hotelId/reserva deve ser capaz de reservas no máximo 10 por noite', async () => {
    const hotelsRes = await request(app.getHttpServer())
      .post('/hotels?latitude=49.130323&longitude=10.576362')
      .expect(201);

    const hotel = await hotelsRes.body[0];

    await Promise.all(
      [...Array(10)].map(() =>
        request(app.getHttpServer())
          .post(`/hotel/${hotel.id}/reserva`)
          .send({
            name: 'rogerio',
            email: 'rogerio@example.com',
            phoneNumber: '+559876543210',
            checkIn: '2022-07-01',
            checkOut: '2022-07-05',
            amount: 100,
          })
          .expect(201)
          .then((response) => {
            console.log('reservado');
            expect(response.body.hotel).toEqual(hotel.id);
          }),
      ),
    );

    await request(app.getHttpServer())
      .post(`/hotel/${hotel.id}/reserva`)
      .send({
        name: 'rogerio',
        email: 'rogerio@example.com',
        phoneNumber: '+499876543210',
        checkIn: '2022-07-01',
        checkOut: '2022-07-05',
        amount: 100,
      })
      .expect(404);
  });
});
