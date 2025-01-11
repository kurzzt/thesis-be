import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetNearbyPlaceDto } from './dto/get-google-api.dto';
import { GooNearbyFieldMask } from 'src/types/google-api/google-nearby-fieldmask';
import { GooDetailFieldMask } from 'src/types/google-api/google-detail-fieldmask';
import {
  GooglePlace,
  GooglePlaceNearbyResponse,
  Photo,
  Review,
} from 'src/types/google-api/google-place-response';
import { CreatePlaceDto } from '../places/dto/create-place.dto';
import { plainToClass } from 'class-transformer';
import { Provider } from '@prisma/client';
import { CreatePlaceReviewDto } from '../place-reviews/dto/create-place-reviews.dto';
import { CreatePlacePhotoDto } from '../place-photos/dto/create-place-photo.dto';
import { stringify } from 'qs';

@Injectable()
export class GoogleApiService {
  constructor() {}

  private readonly GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  private readonly BASE_URL = 'https://places.googleapis.com/v1/';

  async nearbySearch(body: GetNearbyPlaceDto, fieldMask: GooNearbyFieldMask[]) {
    try {
      const { latitude, longitude, radius, ...d } = body;
      const requestBody = {
        locationRestriction: {
          circle: { center: { latitude, longitude }, radius },
        },
        ...d,
      };

      const headers = {
        'X-Goog-FieldMask': fieldMask.join(','),
        'X-Goog-Api-Key': this.GOOGLE_API_KEY,
      };

      const { data } = await axios.post<GooglePlaceNearbyResponse>(
        this.BASE_URL + 'places:searchNearby',
        { ...requestBody },
        { headers },
      );
      const { places } = data;
      return places;
    } catch (error) {
      if (error.response) {
        console.error(
          `Request failed with status code ${error.response.status}`,
        );
        console.error(error.response.data);
      } else if (error.request) {
        console.error('Request made but no response received');
        console.error(error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw new HttpException(
        'Google API request failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async placeDetail(id: string, fieldMask: GooDetailFieldMask[]) {
    try {
      const headers = {
        'X-Goog-FieldMask': fieldMask.join(','),
        'X-Goog-Api-Key': this.GOOGLE_API_KEY,
      };

      const { data } = await axios.get<GooglePlace>(
        this.BASE_URL + 'places/' + id,
        {
          headers,
        },
      );
      return data;
    } catch (error) {
      if (error.response) {
        console.error(
          `Request failed with status code ${error.response.status}`,
        );
        console.error(error.response.data);
      } else if (error.request) {
        console.error('Request made but no response received');
        console.error(error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw new HttpException(
        'Google API request failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPlacePhotoDetail(
    placeId: string,
    photoAPI: string,
    maxWidthPx: number = 400,
    maxHeightPx: number = 400,
  ): Promise<string> {
    const params = {
      key: this.GOOGLE_API_KEY,
      maxWidthPx,
      maxHeightPx,
    };
    const qsparams = stringify(params, { encode: false });

    try {
      const res = await axios.get(
        this.BASE_URL +
          'places/' +
          placeId +
          '/photos/' +
          photoAPI +
          '/media?' +
          qsparams,
      );

      return res.request._redirectable._options.href;
    } catch (error) {
      if (error.response) {
        console.error(
          `Request failed with status code ${error.response.status}`,
        );
        console.error(error.response.data);
      } else if (error.request) {
        console.error('Request made but no response received');
        console.error(error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw new HttpException(
        'Google API request failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async mapGooResponseToPlaceDto(initial: GooglePlace): Promise<{
    reviews: CreatePlaceReviewDto[];
    photos: CreatePlacePhotoDto[];
    place: CreatePlaceDto;
  }> {
    const place = this.mapGooPlaceToPlaceDto(initial);
    const reviews: CreatePlaceReviewDto[] = [];
    const photos: CreatePlacePhotoDto[] = [];

    if (initial.reviews && initial.reviews.length > 0) {
      for (const d in initial.reviews) {
        const mappedReview = this.mapGooReviewToReviewDto(
          initial.reviews[d],
          Provider.GOOGLE,
        );
        reviews.push(mappedReview);
      }
    }

    if (initial.photos && initial.photos.length > 0) {
      for (const d in initial.photos) {
        const mappedPhoto = this.mapGooPhotoToPhotoDto(
          initial.photos[d],
          Provider.GOOGLE,
        );

        const { photoApi, placeId, widthPx, heightPx } = mappedPhoto;
        const imageUrl = await this.getPlacePhotoDetail(
          placeId,
          photoApi,
          widthPx,
          heightPx,
        );
        mappedPhoto['imageUrl'] = imageUrl;

        photos.push(mappedPhoto);
      }
    }

    return { reviews, photos, place };
  }

  mapGooPlaceToPlaceDto(initial: GooglePlace): CreatePlaceDto {
    const changedInitialData = {
      ...initial,
      placeAPI: initial.id,
      displayName: initial.displayName?.text || '',
      editorialSummary: initial.editorialSummary?.text || '',
    };

    const place = plainToClass(CreatePlaceDto, changedInitialData, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
      exposeUnsetFields: false,
    });

    return place;
  }

  mapGooReviewToReviewDto(
    initial: Review,
    provider: Provider,
  ): CreatePlaceReviewDto {
    const extractedPlaceId = initial.name.match(/places\/([^/]+)\/reviews\//);
    const extractedReviewApi = initial.name.match(/\/reviews\/([^/]+)$/);

    const changedInitialData = {
      ...initial,
      text: initial.text.text,
      reviewApi:
        extractedReviewApi && extractedReviewApi[1]
          ? extractedReviewApi[1]
          : '',
      createdAt: initial.publishTime,
      provider,
      placeId:
        extractedPlaceId && extractedPlaceId[1] ? extractedPlaceId[1] : '',
    };

    const review = plainToClass(CreatePlaceReviewDto, changedInitialData, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
      exposeUnsetFields: false,
    });

    return review;
  }

  mapGooPhotoToPhotoDto(
    initial: Photo,
    provider: Provider,
  ): CreatePlacePhotoDto {
    const extractedPhotoApi = initial.name.match(/\/photos\/([^/]+)/);
    const extractedPlaceId = initial.name.match(/places\/([^/]+)\/photos/);

    const changedInitialData = {
      ...initial,
      photoApi:
        extractedPhotoApi && extractedPhotoApi[1] ? extractedPhotoApi[1] : '',
      provider: provider,
      placeId:
        extractedPlaceId && extractedPlaceId[1] ? extractedPlaceId[1] : '',
    };

    const photo = plainToClass(CreatePlacePhotoDto, changedInitialData, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
      exposeUnsetFields: false,
    });

    return photo;
  }
}
