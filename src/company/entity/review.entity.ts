import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Company } from "./company.entity";
import { EmploymentStatus } from "./helper";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { User } from "src/auth/entity/user.entity";

export enum EmploymentType {
    CURRENT = 'Current',
    FORMER = 'Former'
}

@modelOptions(modelOptionsFactory('reviews', true, false))
export class Review extends TimeStamps{
    @prop({ required: true, ref: () => Company })
    public company!: Ref<Company>;

    @prop({ required: true, ref: () => User })
    private reviewer!: Ref<User>;

    @prop({ required: true, enum: () => EmploymentStatus, default: EmploymentStatus.FULL_TIME })
    public employmentStatus!: EmploymentStatus
    
    @prop({ required: true, enum: () => EmploymentType, default: EmploymentType.CURRENT })
    public employmentType!: EmploymentType

    @prop()
    public position?: string;

    @prop()
    public reviewTitle?: string;

    @prop({ required: true, min: 1, max: 5 })
    public rating!: number;

    @prop()
    public date?: Date;

    @prop()
    public pros?: string;

    @prop()
    public cons?: string;

    @prop()
    public adviceForManagement?: string

    @prop({ type: () => [String] })
    public helpful?: string[]

    @prop()
    public recommended?: boolean

}