import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "src/auth/entity/user.entity";
import { Company } from "src/company/entity/company.entity";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";

@modelOptions(modelOptionsFactory('lifestyles', true, false))
export class LifeStyle extends TimeStamps{
    @prop({ required: true, ref: () => Company })
    public companyId!: Ref<Company>

    @prop({ required: true, type: () => [String]})
    public imageLinks!: string[]
}

@modelOptions(modelOptionsFactory('lifestyle-uploads', true, false))
export class LifeStyleUpload extends TimeStamps{
    @prop({ required: true, ref: () => Company })
    public companyId!: Ref<Company>

    @prop({ required: true, ref: () => User})
    public reviewerId!: Ref<User>

    @prop({ required: true, type: () => [String]})
    public imageLinks!: string[]

    @prop({ required: false, default: false })
    private isShow: boolean
}