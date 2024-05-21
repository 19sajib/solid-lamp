import { IModelOptions } from "@typegoose/typegoose/lib/types";

export const modelOptionsFactory = (
    collection: string,
    timestamps: boolean,
    deleteTimestamps= false
) : IModelOptions => {
    return {
        schemaOptions: {
            collection,
            toJSON: {
                virtuals: true,
                transform: (_, ret) => {
                    ret.id = ret._id;
					delete ret._id;
					delete ret.__v;
					delete ret.password;
					deleteTimestamps ? delete ret?.createdAt : null;
					deleteTimestamps ? delete ret?.updatedAt : null;
					return ret;
                }
            },
            toObject: {
				virtuals: true,
				transform: (_, ret) => {
					ret.id = ret._id;
					delete ret._id;
					delete ret.__v;
					delete ret.password;
					deleteTimestamps ? delete ret?.createdAt : null;
					deleteTimestamps ? delete ret?.updatedAt : null;
					return ret;
				},
			},
			timestamps,
        }
    }
}