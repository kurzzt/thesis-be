import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database';
import { GetDashboardDto } from './dto/get-dasboard.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly db: DatabaseService) {}

  async countAll(options: GetDashboardDto){
    const response = {
      total_province: 0,
      total_regency: 0,
      total_district: 0,
      total_village: 0,
      total_place: 0,
      total_place_photo: 0,
      total_place_review: 0,
    }

    const [
      count_province, 
      count_regency,
      count_district,
      count_village,
      count_place,
      count_place_photo,
      count_place_review,
    ] = await this.db.$transaction([
      this.db.client.province.count(),
      this.db.client.regency.count(),
      this.db.client.district.count(),
      this.db.client.village.count(),
      this.db.client.place.count(),
      this.db.client.placePhoto.count(),
      this.db.client.placeReview.count(),
    ]);

    response.total_province = count_province
    response.total_regency = count_regency
    response.total_district = count_district
    response.total_village = count_village

    response.total_place = count_place
    response.total_place_photo = count_place_photo
    response.total_place_review = count_place_review

    return response
  }

}
