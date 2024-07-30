import { ModelType } from "@typegoose/typegoose/lib/types";
import { Paginate } from "./paginate.interface";

export async function pagination<T>(model: ModelType<T>, pageNumber: number, filterQuery?: any, project?: any): Promise<Paginate<T[]>> {

    project = project ? project : {}
    filterQuery = filterQuery ? filterQuery : {}

    const [docs, total] = await Promise.all([
        model.find(filterQuery, project)
             .sort({ createdAt: -1})
             .limit(10)
             .skip(pageNumber === 1 ? 0 : (pageNumber - 1) * 10)
             .exec(),
        model.countDocuments(filterQuery).exec()
    ])
    const totalPages = total > 0 ? Math.ceil(total / 10) || 1 : 0
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null
    
    return {
        items: docs.map(doc => doc.toJSON() as T),
        total,
        totalPages,
        nextPage,
        pageNumber
    }
}

export async function paginationAggregate<T>(model: ModelType<T>, pageNumber: number, stageArr: any, filterQuery?: any): Promise<Paginate<T[]>> {

    filterQuery = filterQuery ? filterQuery : {}

    const [docs, total] = await Promise.all([
        model.aggregate(stageArr).exec(),
        model.countDocuments(filterQuery).exec()
    ])
    const totalPages = total > 0 ? Math.ceil(total / 10) || 1 : 0
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null
    
    return {
        items: docs,
        total,
        totalPages,
        nextPage,
        pageNumber
    }
}

export async function paginationWithPopulate<T>(
    model: ModelType<T>,
    pageNumber: number,
    filterQuery?: any,
    project?: any
  ): Promise<Paginate<T[]>> {
    project = project ? project : {};
    filterQuery = filterQuery ? filterQuery : {};
  
    const [docs, total] = await Promise.all([
      model
        .find(filterQuery, project)
        .sort({ createdAt: -1 })
        .limit(10)
        .skip(pageNumber === 1 ? 0 : (pageNumber - 1) * 10)
        .populate({
          path: 'companyId',
          select: 'name id logo',
        })
        .exec(),
      model.countDocuments(filterQuery).exec(),
    ]);
    const totalPages = total > 0 ? Math.ceil(total / 10) || 1 : 0;
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;
  
    return {
      items: docs.map((doc) => doc.toJSON() as T),
      total,
      totalPages,
      nextPage,
      pageNumber,
    };
  }