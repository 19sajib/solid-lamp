import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "src/auth/entity/user.entity";
import { Company } from "src/company/entity/company.entity";
import { modelOptionsFactory } from "src/utils/mongodb/modelOptionsFactory";

@modelOptions(modelOptionsFactory('benefits', true, true))
export class Benefit {
    @prop({ required: true, ref: () => Company})
    public companyId!: Ref<Company>

    @prop()
    public careerGrowth?: boolean

    @prop()
    public healthcareBenefits?: boolean

    @prop()
    public wellnessBenefits?: boolean

    @prop()
    public paidSickLeave?: boolean

    @prop()
    public birthdaySalary?: boolean

    @prop()
    public occasionalGift?: boolean

    @prop()
    public breakfast?: boolean

    @prop()
    public lunch?: boolean

    @prop()
    public snacks?: boolean

    @prop()
    public paidVacation?: boolean

    @prop()
    public paidLeave?: boolean

    @prop()
    public workFromHome?: boolean

    @prop()
    public flexibleHours?: boolean

    @prop()
    public maternityPaternityLeave?: boolean

    @prop()
    public transportAllowance?: boolean

    @prop()
    public cellPhoneAllowance?: boolean

    @prop()
    public providentFund?: boolean

    @prop()
    public performanceBonus?: boolean

    @prop()
    public professionalTraining?: boolean

    @prop()
    public stockOption?: boolean

    @prop()
    public culturalSocialEvent?: boolean
}

@modelOptions(modelOptionsFactory('benefit-review', true, false))
export class BenefitReview{
    @prop({ ref: () => Benefit })
    public benefit!: Ref<Benefit>

    @prop({ ref: () => Company })
    public companyId!: Ref<Company>

    @prop()
    public description!: string

    @prop({ required: true, default: true })
    private isShow!: boolean

    @prop({ required: true, ref: () => User})
    private reviewer!: Ref<User>
}