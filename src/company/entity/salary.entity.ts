import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { Company } from "./company.entity";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";

@modelOptions(modelOptionsFactory('salaries', false, true))
export class Salary {
    @prop({ required: true, ref: () => Company })
    public company!: Ref<Company>;

    @prop({ required: true })
    public position!: string;

    @prop({ required: true })
    public salaryRange!: string

    @prop({ required: true, default: 'Unknown' })
    public experience!: string

}