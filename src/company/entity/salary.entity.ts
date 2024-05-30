import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { Company } from "./company.entity";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { User } from "src/auth/entity/user.entity";

@modelOptions(modelOptionsFactory('salaries', false, true))
export class Salary {
    @prop({ required: true, ref: () => Company })
    public company!: Ref<Company>;

    @prop({ required: true, ref: () => User })
    private reviewer!: Ref<User>;

    @prop({ required: true })
    public position!: string;

    @prop({ required: true })
    public salary!: string

    @prop()
    public experience?: string

}