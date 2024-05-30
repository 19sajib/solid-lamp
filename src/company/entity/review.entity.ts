import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Company } from "./company.entity";
import { EmploymentStatus, EmploymentType } from "./helper";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { User } from "src/auth/entity/user.entity";


@modelOptions(modelOptionsFactory('reviews', true, false))
export class Review extends TimeStamps{
    @prop({ required: true, ref: () => Company })
    public companyId!: Ref<Company>;

    @prop({ required: true, ref: () => User })
    private reviewer!: Ref<User>;

    @prop({ required: true, enum: () => EmploymentStatus, default: EmploymentStatus.FULL_TIME })
    public employmentStatus!: EmploymentStatus
    
    @prop({ required: true, enum: () => EmploymentType, default: EmploymentType.CURRENT })
    public employmentType!: EmploymentType

    @prop({ required: true })
    public position!: string;

    @prop({ required: true })
    public reviewTitle!: string;

    @prop({ required: true, min: 1, max: 5 })
    public rating!: number;

    @prop({ required: true })
    public pros!: string;

    @prop({ required: true })
    public cons!: string;

    @prop()
    public adviceForManagement?: string

    @prop({ type: () => [String] })
    public helpful?: string[]

    @prop()
    public recommended?: boolean

}