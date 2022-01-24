import { ServiceClient } from "@grpc/grpc-js/build/src/make-client";
import { InternalError } from "../../application/error/errors";

export class CacheUtil {
    static async set(stub: ServiceClient, key: string | number, value: string | number): Promise<string | number> {
        let keyType: string, valueType: string;;
        if (typeof key === 'string') {
            keyType = 'string_t';
        } else {
            keyType = 'int_t';
        }
        if (typeof value === 'string') {
            valueType = 'string_t';
        } else {
            valueType = 'int_t';
        }
        return new Promise(async (resolve, reject) => {
            stub.set({ key: { [keyType]: key }, value: { [valueType]: value } }, function (err: Error, res: string) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(key);
            })
        })
    }

    static async get(stub: ServiceClient, key: string | number): Promise<string | number> {
        let keyType: string;
        if (typeof key === 'string') {
            keyType = 'string_t';
        } else {
            keyType = 'int_t';
        }
        return new Promise(async (resolve, reject) => {
            stub.get({ key: { [keyType]: key } }, function (err: Error, res: { value: { string_t?: string, int_t?: number, type: 'string_t' | 'int_t' } }) {
                if (err) {
                    reject(new InternalError('undefined value'));
                    return;
                }
                const type = res.value.type;
                const value = res.value[type];
                if (!value) {
                    reject(new InternalError('undefined value'));
                    return
                }
                resolve(value);
            })
        })
    }
}