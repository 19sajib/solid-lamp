import { Ref, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Company } from "./company.entity";
import { EmploymentStatus } from "./helper";

export enum EmploymentType {
    CURRENT = 'Current',
    FORMER = 'Former'
}

export class Review extends TimeStamps{
    @prop({ required: true, ref: () => Company })
    public company!: Ref<Company>;

    @prop({ required: true })
    private reviewer!: string;

    @prop({ required: true, enum: () => EmploymentStatus })
    public employmentStatus!: EmploymentStatus.FULL_TIME
    
    @prop({ required: true, enum: () => EmploymentType })
    public employmentType!: EmploymentType.CURRENT

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
    public recomended?: boolean

}