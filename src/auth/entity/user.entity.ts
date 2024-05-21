import { modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";

export enum UserType {
    ADMIN = 'Admin',
    SUPER_ADMIN = 'Super Admin',
    USER = 'User'
}

@modelOptions(modelOptionsFactory('users', true, false))
export class User extends TimeStamps{
    @prop({ required: true })
    public fullName!: string;

    @prop({ required: true })
    public email!: string

    @prop({ required: true, type: String })
    private password!: string

    @prop()
    public jobTitle?: string

    @prop()
    public location?: string

    @prop()
    public industry?: string

    @prop()
    public avatar?: string

    @prop({ type: () => [String] })
    public skill?: string[]

    @prop({ required: true, enum: () => UserType, default: UserType.USER })
    public userRole?: UserType

}