import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { Company } from "src/company/entity/company.entity";
import { User } from "src/auth/entity/user.entity";
import { ApplyMethod, Difficulty, InterviewExperience, Offer } from "../helper";

class Questions {
    @prop({ required: true, type: String })
    public question: string;

    @prop({ required: true, type: String })
    public answer: string
}

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
    public experience!: InterviewExperience

    @prop({ required: true, type: () => [Questions], _id: false })
    public questions!: Questions[]
    
    @prop({ required: true, enum: () => ApplyMethod, default: ApplyMethod.SOCIAL })
    public applyMethod!: ApplyMethod

    @prop({ required: true, enum: () => Offer })
    public offer!: Offer

    @prop({ required: true, enum: () => Difficulty })
    public difficulty!: Difficulty
    
    // @prop({ required: true })
    // public offerReceived!: boolean
    
    // @prop({ required: false })
    // public offerAccepted?: boolean

    @prop()
    public feedback?: string

    @prop({ required: true, default: true })
    public isShow!: boolean
}