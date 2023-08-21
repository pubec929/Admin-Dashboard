"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
const app = (0, import_express.default)();
app.use(import_express.default.json());
app.get("/", (req, res) => {
  return res.json({ message: "Hello, World Wide Web!" });
});
app.get("/endpoints", (req, res) => {
  res.json(endpoints);
});
app.get("/endpoints/:id", (req, res) => {
  const id = +req.params.id;
  const selectedItem = getEndpoint(id);
  if (selectedItem) {
    res.json(selectedItem);
  } else {
    res.status(404).json({ message: `Endpoint mit der ID ${id} wurde nicht gefunden...` });
  }
});
const start = async () => {
  try {
    app.listen(3e3, "localhost", () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
void start();
function getEndpoint(id) {
  for (const element of endpoints) {
    if (element.id === id)
      return element;
  }
  return void 0;
}
let tmp = 1;
const agent = {
  id: "as9f89gh8ad9gh7s8d7g8d7f897gs8a9sj132423",
  setupId: "24hjkh23h5hkj9jh08h7gjoihfoigu9090",
  version: "20230124_1155",
  zuletztGesehen: "24.01.2023, 13:09:02",
  letztesUpdate: "01.01.2000, 01:00:03",
  analystSession: "Inaktiv",
  stopMalware: true,
  response: true
};
const endpoints = [
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "01",
    version: "1.0.1",
    tag: ["hello", "test"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "02",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "03",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "04",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "05",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "06",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "07",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "08",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "09",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "10",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "11",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "12",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "13",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "14",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "15",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "16",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "17",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "18",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "19",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "20",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "21",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "22",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "23",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "24",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "25",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "26",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "27",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  },
  {
    agent: structuredClone(agent),
    id: tmp++,
    name: "Simon",
    status: "online",
    lastUpdate: "28",
    version: "1.0.1",
    tag: ["hello"],
    organisationUnit: "1412",
    kunde: "Google",
    betriebsystem: "Windows XP"
  }
];
//# sourceMappingURL=app.js.map
