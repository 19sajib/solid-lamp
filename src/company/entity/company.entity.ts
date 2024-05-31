import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { Review } from "./review.entity";
import { WorkType } from "./helper";
import { Job } from "./job.entity";
import { Salary } from "./salary.entity";
import { Interview } from "./interview.entity";
import { User } from "src/auth/entity/user.entity";

class HireType {
    @prop({ default: false })
    public hireFresher?: boolean;
  
    @prop({ default: false })
    public hireIntern?: boolean;
  
    @prop({ default: false })
    public hireContractor?: boolean;
  
    @prop({ default: false })
    public hireFullTime?: boolean;

    @prop({ default: false })
    public hirePartTime?: boolean;
  }

class Social {
    @prop({ match: /^https?:\/\/(www\.)?linkedin\.com\/.*$/ })
    public linkedin?: string;
  
    @prop({ match: /^https?:\/\/(www\.)?twitter\.com\/.*$/ })
    public twitter?: string;
  
    @prop({ match: /^https?:\/\/(www\.)?facebook\.com\/.*$/ })
    public facebook?: string;
  
    @prop({ match: /^https?:\/\/(www\.)?instagram\.com\/.*$/ })
    public instagram?: string;
  }

@modelOptions(modelOptionsFactory('companies', true, false))
export class Company extends TimeStamps {
    @prop({ required: true })
    name!: string

    @prop()
    description?: string

    @prop()
    founded?: string

    @prop()
    headquarter?: string

    @prop({ type: () => [String] })
    locations?: string[]

    @prop()
    numOfEmployees?: string

    @prop({ type: () => [String] })
    techStack?: string[]

    @prop({ enum: () => WorkType })
    workType?: WorkType.ONSITE

    @prop({ _id: false })
    hireType?: HireType

    @prop()
    website?: string

    @prop({ _id: false })
    social?: Social

    @prop({ type: () => [Salary], ref: 'salaries', default: [] })
    salaries?: Ref<Salary>[]

    @prop({ type: () => [Review], ref: 'reviews', default: [] })
    reviews?: Ref<Review>[];

    @prop({ type: () => [Job], ref: 'jobs', default: [] })
    jobs?: Ref<Job>[];

    @prop({ type: () => [Interview], ref: 'interviews', default: []})
    interviews?: Ref<Interview>[]

    @prop({ required: true, ref: () => User })
    private addedBy!: Ref<User>;
}