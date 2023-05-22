export const options = {
  openapi: "Enable",
  language: "en-US",
  disableLogs: false,
  autoHeaders: true,
  autoQuery: true,
  autoBody: true
};

export const doc = {
  info: {
    title: "Task Management",
    description: "Description"
  },
  host: "localhost:3000",
  schemes: ["http"]
};

export const outputFile = "src/swagger_output.json";
export const endpointsFiles = ["./routes/user", "./routes/token", "./routes/task"];
