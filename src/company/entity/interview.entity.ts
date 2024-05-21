import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";
import { Company } from "./company.entity";
import { User } from "src/auth/entity/user.entity";

@modelOptions(modelOptionsFactory('interviews', true, false))
export class Interview extends TimeStamps {
    @prop({ required: true, ref: () => Company })
    public company!: Ref<Company>;

    @prop({ required: true, ref: () => User })
    private reviewer!: Ref<User>;

    @prop({ required: true })
    public position!: string;

    @prop({ required: true })
    public description!: string

    @prop({ required: true })
    public experience?: string
}