import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PlacesModule } from './modules/places/places.module';
import { DatabaseService } from './database/database';
import { DatabaseModule } from './database/database.module';
import { PlaceReviewsModule } from './modules/place-reviews/place-reviews.module';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { RolesModule } from './modules/roles/roles.module';
import { GeolocationModule } from './modules/geolocation/geolocation.module';
import { GoogleApiModule } from './modules/google-api/google-api.module';
import { PlacePhotosModule } from './modules/place-photos/place-photos.module';
import { KycQuestionModule } from './modules/kyc-question/kyc-question.module';
import { KycCategoryModule } from './modules/kyc-category/kyc-category.module';
import { KycRespondentModule } from './modules/kyc-respondent/kyc-respondent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PlacesModule,
    DatabaseModule,
    PlaceReviewsModule,
    UsersModule,
    RolesModule,
    GeolocationModule,
    GoogleApiModule,
    PlacePhotosModule,
    KycCategoryModule,
    KycQuestionModule,
    KycRespondentModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService, UsersService],
})
export class AppModule {}
