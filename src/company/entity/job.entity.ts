import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { Company } from "./company.entity";
import { EmploymentStatus, WorkType } from "./helper";

@modelOptions(modelOptionsFactory('jobs', true, false))
export class Job {
    @prop({ required: true, ref: () => Company })
    public company!: Ref<Company>;

    @prop({ required: true })
    public position!: string;

    @prop()
    public description!: string;

    @prop({ required: true, enum: () => EmploymentStatus })
    public employmentStatus!: EmploymentStatus.FULL_TIME

    @prop({ enum: () => WorkType })
    public workType?: WorkType.ONSITE

    @prop()
    public location?: string;

    @prop()
    public applyLink?: string;

    @prop()
    public applyLastDate?: Date;


}