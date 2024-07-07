import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { Company } from "src/company/entity/company.entity";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { User } from "src/auth/entity/user.entity";

@modelOptions(modelOptionsFactory('salaries', true, false))
export class Salary {
    @prop({ required: true, ref: () => Company })
    public companyId!: Ref<Company>;

    @prop({ required: true, ref: () => User })
    private reviewer!: Ref<User>;

    @prop({ required: true })
    public position!: string;

    @prop({ required: true })
    public baseSalary!: string;

    @prop()
    public stock?: string;

    @prop()
    public additional?: string;

    @prop()
    public performanceBonus?: boolean;

    @prop()
    public profitSharing?: boolean;

    @prop()
    public experience?: string;

    @prop({ required: true, default: true})
    private isShow!: boolean

}