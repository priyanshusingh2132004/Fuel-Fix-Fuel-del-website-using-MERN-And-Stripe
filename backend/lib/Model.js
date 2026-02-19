import db from './db.js';
import crypto from 'crypto';

export const createModel = (collectionName) => {
    return class Model {
        constructor(data) {
            Object.assign(this, data);
        }

        static async find(query = {}) {
            let results = db.get(collectionName).value() || [];
            if (Object.keys(query).length > 0) {
                results = db.get(collectionName).filter(query).value();
            }
            return results;
        }

        static async findOne(query) {
            return db.get(collectionName).find(query).value() || null;
        }

        static async findById(id) {
            return db.get(collectionName).find({ _id: id }).value() || null;
        }

        static async findByIdAndUpdate(id, update) {
            let newValues = update;
            if (update.$set) {
                newValues = update.$set;
            }

            const result = db.get(collectionName)
                .find({ _id: id })
                .assign(newValues)
                .write();

            return result;
        }

        static async findByIdAndDelete(id) {
            const result = db.get(collectionName)
                .remove({ _id: id })
                .write();
            return result[0] || null;
        }

        async save() {
            if (!this._id) {
                this._id = crypto.randomUUID();
            }
            // Mongoose save can update if _id exists, but here we simplify to push (create) 
            // or we could check if it exists.
            // For now, let's check existence to be safe.
            const exists = db.get(collectionName).find({ _id: this._id }).value();
            if (exists) {
                db.get(collectionName).find({ _id: this._id }).assign(this).write();
            } else {
                db.get(collectionName).push(this).write();
            }
            return this;
        }
    }
}
