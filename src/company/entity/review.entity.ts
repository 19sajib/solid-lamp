import { Ref, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Company } from "./company.entity";

export enum EmployeeType {
    CURRENT = 'Current',
    FORMER = 'Former'
}

export enum EmployeeStatus {
    PART_TIME = 'Part-time',
    FULL_TIME = 'Full-time',
    CONTRACT = 'Contract',
    INTERNSHIP = 'Internship',
    FREELANCE = 'Freelance'
}

export class Review extends TimeStamps{
    @prop({ required: true, ref: () => Company })
    public company!: Ref<Company>;

    @prop({ required: true })
    private reviewer!: string;

    @prop({ required: true, enum: () => EmployeeStatus })
    public employeeStatus!: EmployeeStatus.FULL_TIME
    
    @prop({ required: true, enum: () => EmployeeType })
    public employeeType!: EmployeeType.CURRENT

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