<template>
<body>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

<div class="container mt-4" >
  <h2 class="mb-4" id="titre">Liste des Projets</h2>

  <table class="table table-striped table-bordered">
    <thead class="table-dark">
      <tr>
        <th>Nom</th>
        <th>Date de Début</th>
        <th>Date de Fin</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project in projects" :key="project.id">
        <td>{{ project.name }}</td>
        <td>{{ project.startDate }}</td>
        <td>{{ project.endDate }}</td>
        <td>
          <button @click="showDetails(project.id)" class="btn btn-info btn-sm me-2">
            <i class="bi bi-eye"></i>
          </button>
          <button @click="editProject(project.id)" class="btn btn-warning btn-sm me-2">
            <i class="bi bi-pencil"></i>
          </button>
          <button @click="deleteProject(project.id)" class="btn btn-danger btn-sm">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Bouton pour afficher/masquer le formulaire d'ajout -->
  <button @click="toggleAddForm" class="btn btn-success mt-4">
    {{ showAddForm ? 'Annuler' : 'Ajouter un Projet' }}
  </button>

  <!-- Affichage conditionnel des composants -->
  <AjouterProjet v-if="showAddForm" @project-added="onProjectAdded" />
  <DetailsProjet v-if="showDetailsComponent" :project-id="selectedProjectId" :onClose="closeDetails" />
  <ModifierProjet v-if="showEditComponent" :project-id="selectedProjectId" @project-updated="onProjectUpdated" />
</div>
</body>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProjectStore } from '../../stores/gestion';
import AjouterProjet from './AjouterProjet.vue';
import DetailsProjet from './DetailsProjet.vue';
import ModifierProjet from './ModifierProjet.vue';

const projectStore = useProjectStore();
const projects = computed(() => projectStore.projects);

const showAddForm = ref(false);
const showDetailsComponent = ref(false);
const showEditComponent = ref(false);
const selectedProjectId = ref(null);

const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value;
  showDetailsComponent.value = false;
  showEditComponent.value = false;
};

const showDetails = (id) => {
  selectedProjectId.value = id;
  showDetailsComponent.value = true;
  showAddForm.value = false;
  showEditComponent.value = false;
};

const editProject = (id) => {
  selectedProjectId.value = id;
  showEditComponent.value = true;
  showAddForm.value = false;
  showDetailsComponent.value = false;
};

const deleteProject = (id) => {
  projectStore.deleteProject(id);
};

const onProjectAdded = (newProject) => {
  projectStore.addProject(newProject);
  toggleAddForm();
};

const onProjectUpdated = (updatedProject) => {
  projectStore.updateProject(updatedProject);
  showEditComponent.value = false;
};
</script>
<style>
  body {
    background: url('https://media.istockphoto.com/id/1317443847/photo/project-manager-working-on-gantt-chart-to-update-the-schedule-tasks-and-milestones-progress.jpg?s=612x612&w=0&k=20&c=FDsi1mRxUw3uHIOTMBNcKcFyxoX6O8ux0ne2bX9q-IU=') no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    padding: 20px;
  }
  .table-container {
    background: rgba(63, 61, 61, 0.8);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    padding: 20px;
  }
  #titre {
  border: 2px solid;
  font-weight: bold;
  color: #e5ff00; 
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); 
  text-align: center; 
  margin-bottom: 20px;}
  h2 {
  border: 2px solid;
  font-weight: bold;
  color: #404137; 
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); 
  text-align: center; 
  margin-bottom: 20px;
}
</style>
