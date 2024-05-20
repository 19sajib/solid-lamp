import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { Review } from "./review.entity";
import { WorkType } from "./helper";
import { Job } from "./job.entity";
import { Salary } from "./salary.entity";
import { Interview } from "./interview.entity";


@modelOptions(modelOptionsFactory('companies', true, false))
export class Company extends TimeStamps {
    @prop({ required: true })
    name!: string

    @prop()
    description?: string

    @prop()
    founded?: string

    @prop()
    headquarters?: string

    @prop({ type: () => [String] })
    locations?: string[]

    @prop()
    employeesCount?: string

    @prop({ type: () => [String] })
    techStack?: string

    @prop({ enum: () => WorkType })
    workType?: WorkType.ONSITE

    @prop()
    hireType?: object

    @prop()
    website?: string

    @prop()
    social?: object

    @prop({ type: () => Salary, default: [] })
    salaries: Ref<Salary>

    @prop({ ref: () => Review, default: [] })
    reviews?: Ref<Review>[];

    @prop({ ref: () => Job, default: [] })
    jobs?: Ref<Job>[];

    @prop({ ref: () => Interview, default: []})
    interviews?: Ref<Interview>
}