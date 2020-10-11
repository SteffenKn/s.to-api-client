import {ClientRequest, IncomingMessage} from 'http';
import https, {RequestOptions} from 'https';

import {QueryParam} from './types/query-param';

export class HttpClient {
  private basicOptions: RequestOptions;

  constructor(baseUrl: string, apiPath?: string, port?: number) {
    this.basicOptions = {
      hostname: baseUrl,
      port: port ? port : 443,
      path: apiPath ? apiPath : '',
    };
  }

  public get<TResponse>(route: string, queryParams?: Array<QueryParam>): Promise<TResponse> {
    const path: string = this.buildPath(route, queryParams);

    const requestOptions: RequestOptions = this.getOptions(path, 'GET');

    return this.sendRequest<TResponse>(requestOptions);
  }

  public post<TData, TResponse>(route: string, data?: TData, queryParams?: Array<QueryParam>): Promise<TResponse> {
    const path: string = this.buildPath(route, queryParams);
    const dataAsString: string = JSON.stringify(data);

    const requestOptions: RequestOptions = this.getOptions(path, 'POST');

    return this.sendRequest<TResponse>(requestOptions, dataAsString);
  }

  public delete<TData, TResponse>(route: string, data?: TData, queryParams?: Array<QueryParam>): Promise<TResponse> {
    const path: string = this.buildPath(route, queryParams);
    const dataAsString: string | undefined = data ? JSON.stringify(data) : undefined;

    const requestOptions: RequestOptions = this.getOptions(path, 'DELETE');

    return this.sendRequest<TResponse>(requestOptions, dataAsString);
  }

  private sendRequest<TResult>(options: RequestOptions, data?: string): Promise<TResult> {
    return new Promise((resolve: Function, reject: Function): void => {
      const request: ClientRequest = https.request(options, (response: IncomingMessage): void => {
        let result: string = '';

        response.on('data', (partOfResult: string): void =>  {
          result += partOfResult;
        });

        response.on('end', (): void => {
          try {
            resolve(JSON.parse(result));
          } catch {
            resolve(result);
          }
        });
      });

      request.on('error', (error: Error): void => {
        return reject(error);
      });

      if (data) {
        request.write(data);
      }
      request.end();
    });
  }

  private buildPath(route: string, queryParams: Array<QueryParam>): string {
    let path: string = route;

    for (let index: number = 0; index < queryParams.length; index++) {
      if (queryParams[index].value === undefined) {
        continue;
      }

      if (index === 0) {
        path += `?`;
      } else {
        path += '&';
      }

      path += `${queryParams[index].key}=${queryParams[index].value}`;
    }

    return path;
  }

  private getOptions(path: string, method: string): RequestOptions {
    const options: RequestOptions = Object.assign(
      {},
      this.basicOptions,
      {
        method: method,
      },
    );

    options.path += path;

    return options;
  }
}
