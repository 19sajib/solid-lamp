import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { Company } from "./company.entity";
import { EmploymentStatus, WorkType } from "./helper";
import { User } from "src/auth/entity/user.entity";

@modelOptions(modelOptionsFactory('jobs', true, false))
export class Job {
    @prop({ required: true, ref: () => Company })
    public company!: Ref<Company>;

    @prop({ required: true })
    public position!: string;

    @prop()
    public description!: string;

    @prop({ required: true, enum: () => EmploymentStatus, default: EmploymentStatus.FULL_TIME })
    public employmentStatus!: EmploymentStatus

    @prop({ required: true, enum: () => WorkType, default: WorkType.ONSITE })
    public workType!: WorkType

    @prop()
    public location?: string;

    @prop()
    public applyLink?: string;

    @prop()
    public applyLastDate?: Date;

    @prop({ required: true, ref: () => User })
    private addedBy?: Ref<User>;

}