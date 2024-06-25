import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { Company } from "src/company/entity/company.entity";
import { User } from "src/auth/entity/user.entity";
import { ApplyMethod, InterviewExperience } from "../helper";

@modelOptions(modelOptionsFactory('interviews', true, false))
export class Interview extends TimeStamps {
    @prop({ required: true, ref: () => Company })
    public companyId!: Ref<Company>;

    @prop({ required: true, ref: () => User })
    private reviewer!: Ref<User>;

    @prop({ required: true })
    public position!: string;

    @prop({ required: true })
    public description!: string

    @prop({ enum: () => InterviewExperience, default: InterviewExperience.NEUTRAL })
    public experience?: InterviewExperience

    @prop()
    public feedback?: string

    @prop({ required: true, enum: () => ApplyMethod, default: ApplyMethod.SOCIAL })
    public applyMethod!: ApplyMethod

    @prop({ required: true })
    public offerReceive!: boolean
}