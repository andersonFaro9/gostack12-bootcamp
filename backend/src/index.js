const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const { uuid, isUuid } = require("uuidv4");

//Jamais usar em produção
//array guardar em memória porque não se está usando um banco de dados aqui

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

app.use(logRequests);

validateProject = (request, response, next) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid project ID" });
  }
  return next();
};

app.get("/projects", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put("/projects/:id", validateProject, (request, response) => {
  const { id } = request.params;

  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;
  return response.json(projects);
});

app.delete("/projects/:id", validateProject, (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => console.log("🤓👍 Back-end started"));
