import { Request, Response } from 'express';
import express = require('express');
const cors = require('cors')

const app = express();
console.log("test")

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response): Response => {
  return res.json({ message: 'Hello, World Wide Web!' });
});

function getId(id: number) {
  for (let element of data) {
    if (element.endpoint.id === id) return element;
  }
  return undefined;
}

// returns all endpoints
function getAllEndpoints() {
  let endpoints = []
  for (let element of data) {
    endpoints.push({...element.endpoint});
  }
  return endpoints;
}

app.put("/agents/:id/stopMalware/response", (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const stopMalware = req.body.body.stopMalware;
  const response = req.body.body.response;

  let endpointId;
  for (let element of data) {
    if (element.agent.id === id) {
      element.agent.stopMalware = stopMalware;
      element.agent.response = response;
      endpointId = element.endpoint.id;
      break
    }
  }
  if (!endpointId) {
    res.status(404).json({message: "Invalid id"})
  } else {
    const agent = getId(endpointId).agent 
    res.json({stopMalware: agent.stopMalware, response: agent.response});
  }
})



app.put("/endpoints/:id/tags", (req: Request, res: Response): void => {
  const id = parseInt(req.params.id)
  const updatedTags = req.body.body;
  // implement data validation
  // let currentEndpoint = getId(id)
  // if (!currentEndpoint) {
  //   res.status(404).json({message: "Invalid id"})
  // } 
  // currentEndpoint.endpoint.tag = updatedTags;
  let updatedEndpoint: endpoint; 
  for (let element of data) {
    if (element.endpoint.id === id) {
      element.endpoint.tag = updatedTags;
      updatedEndpoint = element.endpoint
      break
    }
  }
  if (!updatedEndpoint) {
    res.status(404).json({message: "Invalid id"})
  } else {
    res.json(updatedEndpoint.tag);
  }
})


app.get("/endpoints", (req: Request, res: Response): void => {
  const skip = ('skip' in req.query) ? parseInt(req.query.skip.toString()) : 0;
  const take = ("take" in req.query) ? parseInt(req.query.take.toString()) : 25;

  const endpoints = getAllEndpoints();  
  if (skip > endpoints.length) {
    res.status(404).json({ message: `Skip Wert ${skip} ist größer als die Länge des EndpointArrays`})
  } else {
    const queryResponse = {
      metadata: {
        skip: skip,
        take: take,
        totalItems: endpoints.length
      },
      content: endpoints.slice(skip, take + skip)
    }
    res.json(queryResponse);
  }
})

// returns one endpoint specifiec to id
app.get('/endpoints/:id', (req: Request, res: Response): void => {
  const id = parseInt(req.params.id)
  const selectedItem = getId(id) 
  if (selectedItem) {
    // const delay = new Date(new Date().getTime() + 2 * 1000);
    // while(delay > new Date()){}
    res.json(selectedItem);
  } else {
    res.status(404).json({ message: `Endpoint mit der ID ${id} wurde nicht gefunden...`})
  } 
});

// delete endpoint and agent of data array
app.delete('/endpoints/:id', (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const lengthBefore = data.length
  data = data.filter((val) => {
    return val.endpoint.id !== id;
  })
  if (lengthBefore === data.length) {
    res.status(404).json({ message: "Invalid id"})
  } else {
    res.status(200).json({ message: ""});
  }
})

// delete agent of data object 
app.delete("/agents/:id", (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  for (let element of data) {
    if (!("agent" in element)) continue;
    if (element.agent.id === id) {
      delete element.agent;
      res.status(200).json({ message: ""});
      return;
    }
  }
  res.status(404).json({ message: "Invalid id"})
})

const start = async (): Promise<void> => {
  try {
    app.listen(3000, 'localhost', () => {
      console.log('Server started on port 3000🤖');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();

interface data {
  endpoint: endpoint;
  agent: agent;
}

interface endpoint {
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



let tmp = 1;
let agentTmp = 100

const agent: agent = {
  id: agentTmp++,
  setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
  version: '20230124_1155',
  zuletztGesehen: '24.01.2023, 13:09:02',
  letztesUpdate: '01.01.2000, 01:00:03',
  analystSession: 'Inaktiv',
  stopMalware: true,
  response: true,
};

let data: data[] = [
  {
    endpoint: {
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '01',
      version: '1.0.1',
      tag: ['hello', 'test'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
    },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  
  {   endpoint: {
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '02',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
      agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint: {
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '03',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '04',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '05',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '06',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '07',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '08',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '09',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '10',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '11',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '12',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '13',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '14',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '15',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '16',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '17',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '18',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '19',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '20',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '21',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '22',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '23',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '24',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '25',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '26',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '27',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
      },
    agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  },
  {    
   endpoint:{
      id: tmp++,
      name: 'Simon',
      status: 'online',
      lastUpdate: '28',
      version: '1.0.1',
      tag: ['hello'],
      organisationUnit: '1412',
      kunde: 'Google',
      betriebsystem: 'Windows XP',
    },
 agent: {
      id: agentTmp++,
      setupId: '24hjkh23h5hkj9jh08h7gjoihfoigu9090',
      version: '20230124_1155',
      zuletztGesehen: '24.01.2023, 13:09:02',
      letztesUpdate: '01.01.2000, 01:00:03',
      analystSession: 'Inaktiv',
      stopMalware: true,
      response: true,
}
  }
]
