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
      total_regency_per_province: undefined,
      total_district_per_regency: undefined,
      total_village_per_district: undefined,
      total_most_reviewed_place: undefined,
      total_photo_per_place: undefined,
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

    const result_regency_per_province = await this.db.regency.aggregateRaw({
      pipeline: [
        { $lookup: {
          from: 'Province',
          localField: 'parentId',
          foreignField: 'kodeBps',
          as: 'parent',
        }},
        { $unwind: "$parent"
        },
        { $project: {
          kodeBps: "$parent.kodeBps",
          province: "$parent.name",
        }},
        { $group: { 
          _id: "$province",
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          parent: "$_id",
          total: "$count",
        }},
      ]
    })

    const result_district_per_regency = await this.db.district.aggregateRaw({
      pipeline: [
        { $lookup: {
          from: 'Regency',
          localField: 'parentId',
          foreignField: 'kodeBps',
          as: 'parent',
        }},
        { $unwind: "$parent"
        },
        { $project: {
          kodeBps: "$parent.kodeBps",
          regency: "$parent.name",
        }},
        { $group: { 
          _id: "$regency",
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          parent: "$_id",
          total: "$count",
        }},
      ]
    })

    const result_village_per_district = await this.db.district.aggregateRaw({
      pipeline: [
        { $lookup: {
          from: 'Regency',
          localField: 'parentId',
          foreignField: 'kodeBps',
          as: 'parent',
        }},
        { $unwind: "$parent"
        },
        { $project: {
          kodeBps: "$parent.kodeBps",
          regency: "$parent.name",
        }},
        { $group: { 
          _id: "$regency",
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          parent: "$_id",
          total: "$count",
        }},
      ]
    })

    const result_most_reviewed_place = await this.db.placeReview.aggregateRaw({
      pipeline: [
        { $lookup: {
          from: 'Place',
          localField: 'placeId',
          foreignField: 'placeAPI',
          as: 'place',
        }},
        { $unwind: "$place"
        },
        { $project: {
          placeApi: "$place.placeAPI",
          placeName: "$place.displayName",
        }},
        { $group: { 
          _id: "$placeName",
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          parent: "$_id",
          total: "$count",
        }},
      ]
    })

    const result_photo_per_place = await this.db.placePhoto.aggregateRaw({
      pipeline: [
        { $lookup: {
          from: 'Place',
          localField: 'placeId',
          foreignField: 'placeAPI',
          as: 'place',
        }},
        { $unwind: "$place"
        },
        { $project: {
          placeApi: "$place.placeAPI",
          placeName: "$place.displayName",
        }},
        { $group: { 
          _id: "$placeName",
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          parent: "$_id",
          total: "$count",
        }},
      ]
    })

    response.total_province = count_province
    response.total_regency = count_regency
    response.total_district = count_district
    response.total_village = count_village

    response.total_place = count_place
    response.total_place_photo = count_place_photo
    response.total_place_review = count_place_review

    response.total_regency_per_province = result_regency_per_province
    response.total_district_per_regency = result_district_per_regency
    response.total_village_per_district = result_village_per_district
    response.total_most_reviewed_place = result_most_reviewed_place
    response.total_photo_per_place = result_photo_per_place

    return response
  }

}
