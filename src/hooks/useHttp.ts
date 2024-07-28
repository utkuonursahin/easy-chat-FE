import {GenericResponse} from "@/dto/GenericResponse";

enum UseHttpMethods {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}
type UseHttpParams = {
    method?: UseHttpMethods;
    headers?: any;
    body?: any;
    cache?: RequestCache;
    credentials?: RequestCredentials;
}

class HttpClient {
    private static instance: HttpClient;
    private constructor() {}
    static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    }

    private method: UseHttpMethods = UseHttpMethods.GET;
    private headers: any = {};
    private body: any = {};
    private cache: RequestCache = 'no-cache';
    private credentials: RequestCredentials = 'include';

    async fetch<T>(url: string, params: UseHttpParams): Promise<GenericResponse<T>> {
        const response = await fetch(url, params);
        return response.json();
    }

    setMethod(method: UseHttpMethods): HttpClient {
        this.method = method;
        return this;
    }

    setHeaders(headers: any): HttpClient {
        this.headers = headers;
        return this;
    }

    setBody(body: any): HttpClient {
        this.body = body;
        return this;
    }

    setCache(cache: RequestCache): HttpClient {
        this.cache = cache;
        return this;
    }

    setCredentials(credentials: RequestCredentials): HttpClient {
        this.credentials = credentials;
        return this;
    }

    async get<T>(url: string): Promise<GenericResponse<T>> {
        return await this.fetch(url, {
            method: UseHttpMethods.GET,
            headers: this.headers,
            cache: this.cache,
            credentials: this.credentials
        });
    }

    async post<T>(url: string): Promise<GenericResponse<T>> {
        return await this.fetch(url, {
            method: UseHttpMethods.POST,
            headers: this.headers,
            body: this.body,
            cache: this.cache,
            credentials: this.credentials
        });
    }

    async patch<T>(url: string): Promise<GenericResponse<T>> {
        return await this.fetch(url, {
            method: UseHttpMethods.PATCH,
            headers: this.headers,
            body: this.body,
            cache: this.cache,
            credentials: this.credentials
        });
    }

    async del(url: string): Promise<GenericResponse<boolean>> {
        return await this.fetch(url, {
            method: UseHttpMethods.DELETE,
            headers: this.headers,
            cache: this.cache,
            credentials: this.credentials
        });
    }
}

export const useHttp = function(): HttpClient {
    return HttpClient.getInstance();
}