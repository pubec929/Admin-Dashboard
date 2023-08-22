import { Injectable, OnInit, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export interface endpoint {
  agent: agent;
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
  id: string;
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
    totalItems: number
  },
  content: endpoint[]
}

@Injectable({
  providedIn: 'root',
})
export class EndpointDataService {
  constructor(private httpClient: HttpClient) {}

  // getEndpoint(id: number) {
  //   for (const element of this.data()!) {
  //     if (element.id === id) return element;
  //   }
  //   return undefined;
  // }

  fetchData(skip=0, take=25) {
    const url = "http://localhost:3000/endpoints"
    return this.httpClient.get<response>(url, {params: {skip: skip, take: take}});
  }
}
