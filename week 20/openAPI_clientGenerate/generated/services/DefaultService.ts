/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @param id
     * @returns any Retrieve the user
     * @throws ApiError
     */
    public static getUsers(
        id: string,
    ): CancelablePromise<{
        id: string;
        name: string;
        age: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns any Retrieve the user
     * @throws ApiError
     */
    public static postUsers(
        id: string,
    ): CancelablePromise<{
        id: string;
        name: string;
        age: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }
}
