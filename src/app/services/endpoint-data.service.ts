import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface data {
  endpoint: endpoint;
  agent: agent;
}

export interface endpoint {
  id: number;
  name: string;
  status: string;
  lastUpdate: string;
  version: string;
  tag: string[];
  organisationUnit: string;
  kunde: string;
  betriebsystem: string;
}

interface agent {
  id: number;
  setupId: string;
  version: string;
  zuletztGesehen: string;
  letztesUpdate: string;
  analystSession: string;
  stopMalware: boolean;
  response: boolean;
}

interface response {
  metadata: {
    skip: number,
    take: number,
    search: string,
    totalItems: number
  },
  content: endpoint[]
}

@Injectable({
  providedIn: 'root',
})
export class EndpointDataService {
  constructor(private httpClient: HttpClient) {}

  refetch = signal(false);
  selectedId = signal(0);

  fetchId(id: number) {
    const url = `http://localhost:3000/endpoints/${id}`
    return this.httpClient.get<data>(url, {});
  }

  fetchData(skip=0, take=25, search="") {
    const url = "http://localhost:3000/endpoints"
    return this.httpClient.get<response>(url, {params: {skip, take, search}});
  }

  updateTags(id: number, tags: string[]) {
    const url = `http://localhost:3000/endpoints/${id}/tags`
    return this.httpClient.put<string[]>(url, {body:tags});
  }

  updateAgentConfig(id: number, stopMalware: boolean, response: boolean) {
    const url = `http://localhost:3000/agents/${id}/stopMalware/response`
    return this.httpClient.put<any>(url, {body: {stopMalware, response}});
  }

  deleteEndpoint(id: number) {
    const url = `http://localhost:3000/endpoints/${id}`
    return this.httpClient.delete<any>(url, {})
  }

  deleteAgent(id: number) {
    const url = `http://localhost:3000/agents/${id}`
    return this.httpClient.delete<any>(url, {})
  }
}
